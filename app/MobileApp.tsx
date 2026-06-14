"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import {
  doc, getDoc, setDoc, updateDoc,
  collection, query, where, onSnapshot,
  addDoc, serverTimestamp, Timestamp,
} from "firebase/firestore";
import { auth, db } from "../lib/firebase";

const WA   = "56981588218";
const PAGO = {
  nombre:       "Patricio Escalona",
  rut:          "12.463.503-9",
  banco:        "Santander",
  tipoCuenta:   "Cuenta Corriente",
  numCuenta:    "6551955",
};
const CANCHAS = [
  { id: 1, nombre: "Cancha 1", tipo: "Arcilla roja" },
  { id: 2, nombre: "Cancha 2", tipo: "Arcilla roja" },
  { id: 3, nombre: "Cancha 3", tipo: "Arcilla verde" },
  { id: 4, nombre: "Cancha 4", tipo: "Arcilla verde" },
];

const jugadores = [
  ["Carlos Muñoz",   72, 15, 14, 1, 93.3],
  ["Rodrigo Vega",   65, 14, 12, 2, 85.7],
  ["Andrés Torres",  58, 13, 11, 2, 84.6],
  ["Felipe Rivas",   52, 12, 10, 2, 83.3],
  ["Matías Cortés",  48, 11,  9, 2, 81.8],
  ["Sebastián Núñez",43, 10,  8, 2, 80.0],
  ["Pablo Herrera",  38, 12,  7, 5, 58.3],
  ["Diego Soto",     35, 10,  6, 4, 60.0],
];

const torneos = [
  { n: "Torneo Apertura Chicureo 🏆", f: "15 julio 2026 · 16:00 y 18:00",   p: "$25.000", c: "8 cupos",  monto: 25000 },
  { n: "Copa PlayTenis Verano",        f: "20 agosto 2026 · Desde las 10:00", p: "$20.000", c: "12 cupos", monto: 20000 },
  { n: "Escalerilla Jul–Sep 2026 🎾",  f: "Partidos durante el trimestre",    p: "$30.000", c: "5 cupos",  monto: 30000 },
];

const avatarColors = ["#e74c3c","#e67e22","#f39c12","#2ecc71","#1abc9c","#3498db","#9b59b6","#e91e63"];
function initials(n: string) { return n.split(" ").slice(0,2).map((x:string)=>x[0]).join("").toUpperCase(); }
function avatarColor(n: string) { let h=0; for (const c of n) h=(h*31+c.charCodeAt(0))%avatarColors.length; return avatarColors[h]; }

type ModalData = { tipo: string; idx?: number } | null;

/* ─── LOGIN / REGISTER ─── */
function AuthScreen({ onAuth }: { onAuth: () => void }) {
  const [mode, setMode]       = useState<'login'|'register'>('login');
  const [email, setEmail]     = useState('');
  const [password, setPass]   = useState('');
  const [nombre, setNombre]   = useState('');
  const [rut, setRut]         = useState('');
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setError(''); setLoading(true);
    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', cred.user.uid), {
          nombre, rut, email, telefono: '', nacimiento: '',
          estilo: '', golpe: '', superficie: '', socio: false,
          createdAt: serverTimestamp(),
        });
      }
      onAuth();
    } catch (e: unknown) {
      const msg = (e as { code?: string })?.code || '';
      if (msg === 'auth/user-not-found' || msg === 'auth/wrong-password' || msg === 'auth/invalid-credential')
        setError('Email o contraseña incorrectos.');
      else if (msg === 'auth/email-already-in-use')
        setError('Este email ya está registrado. Inicia sesión.');
      else if (msg === 'auth/weak-password')
        setError('Contraseña muy corta (mínimo 6 caracteres).');
      else
        setError('Error al conectar. Verifica tu conexión.');
    }
    setLoading(false);
  }

  return (
    <div className="auth-screen">
      <div className="auth-box">
        <Image src="/logo.jpeg" alt="PlayTenis" width={72} height={72} style={{ borderRadius:'50%', marginBottom:12 }} />
        <h2 className="auth-title">PlayTenis Academia</h2>
        <p className="auth-sub">Tenis · Colina 🇨🇱</p>
        <div className="auth-tabs">
          <button className={mode==='login'?'on':''} onClick={()=>{setMode('login');setError('');}}>Iniciar sesión</button>
          <button className={mode==='register'?'on':''} onClick={()=>{setMode('register');setError('');}}>Registrarse</button>
        </div>
        {mode==='register' && (<>
          <div className="field"><label>Nombre completo</label><input placeholder="Juan Pérez" value={nombre} onChange={e=>setNombre(e.target.value)} /></div>
          <div className="field"><label>RUT</label><input placeholder="12.345.678-9" value={rut} onChange={e=>setRut(e.target.value)} /></div>
        </>)}
        <div className="field"><label>Email</label><input type="email" placeholder="tu@email.com" value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div className="field"><label>Contraseña</label><input type="password" placeholder="Mínimo 6 caracteres" value={password} onChange={e=>setPass(e.target.value)} /></div>
        {error && <div className="auth-error">{error}</div>}
        <button className="btn" style={{opacity:loading?.6:1}} onClick={handleSubmit} disabled={loading}>
          {loading ? 'Cargando...' : mode==='login' ? 'Entrar' : 'Crear cuenta'}
        </button>
      </div>
    </div>
  );
}

/* ─── MAIN APP ─── */
export default function MobileApp() {
  const [user, setUser]     = useState<User|null|'loading'>('loading');
  const [screen, setScreen] = useState("inicio");
  const [modal, setModal]   = useState<ModalData>(null);
  const [toast, setToast]   = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  // Booking flow
  const [canchaStep,    setCanchaStep]    = useState<'calendar'|'slots'|'form'|'pago'>('calendar');
  const [calMonth,      setCalMonth]      = useState(()=>{ const d=new Date(); d.setDate(1); return d; });
  const [selectedDate,  setSelectedDate]  = useState<Date|null>(null);
  const [selectedHora,  setSelectedHora]  = useState<string|null>(null);
  const [selectedCancha,setSelectedCancha]= useState<number>(1);
  const [duracion,      setDuracion]      = useState<1|2>(1);
  const [resNombre,     setResNombre]     = useState('');
  const [resTel,        setResTel]        = useState('');

  // Real-time reservations for current date
  const [reservasDelDia, setReservasDelDia] = useState<Record<string,string>>({});

  // User profile (Firestore)
  const [perfil, setPerfil] = useState({ nombre:'', rut:'', telefono:'', nacimiento:'', estilo:'', golpe:'', superficie:'', socio:false, ok:false });
  const [editPerfil, setEditPerfil] = useState(false);

  // Match history
  const [partidos,   setPartidos]  = useState<Array<{rival:string,fecha:string,resultado:string,ganado:boolean}>>([]);
  const [pendientes, setPendientes]= useState<Array<{rival:string,fecha:string,resultado:string,id:number}>>([
    { rival:'Carlos Muñoz', fecha:'10 jun 2026', resultado:'6-3, 7-5', id:1 },
  ]);
  // User's own reservations (Firestore real-time)
  const [misReservas, setMisReservas] = useState<Array<{id:string,canchaId:number,fecha:string,hora:string,duracion:number,monto:number,estado:string}>>([]);

  // Admin
  const [isAdmin,        setIsAdmin]        = useState(false);
  const [adminLogged,    setAdminLogged]    = useState(false);
  const [adminPinInput,  setAdminPinInput]  = useState('');
  const [inscripciones,  setInscripciones]  = useState<Array<{id:number,nombre:string,torneo:string,tel:string,estado:'pendiente'|'aprobado'|'rechazado'}>>([
    { id:1, nombre:'Pedro González',  torneo:'Torneo Apertura Chicureo 🏆',  tel:'+569 8765 4321', estado:'pendiente' },
    { id:2, nombre:'Luis Flores',     torneo:'Copa PlayTenis Verano',         tel:'+569 9876 5432', estado:'pendiente' },
    { id:3, nombre:'Mario Saavedra',  torneo:'Escalerilla Jul–Sep 2026 🎾',  tel:'+569 7654 3210', estado:'pendiente' },
  ]);
  const [extraJugadores,    setExtraJugadores]    = useState<(string|number)[][]>([]);
  const [nuevoNombreRk,     setNuevoNombreRk]     = useState('');
  const [nuevoPuntosRk,     setNuevoPuntosRk]     = useState('');
  const [ganadorTorneoIdx,  setGanadorTorneoIdx]  = useState(0);
  const [ganadorNombreInput,setGanadorNombreInput]= useState('');
  const [showAddPlayer,     setShowAddPlayer]     = useState(false);
  const [showAddWinner,     setShowAddWinner]     = useState(false);

  /* ── Auth listener ── */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const snap = await getDoc(doc(db, 'users', u.uid));
        if (snap.exists()) {
          setPerfil({ ...snap.data() as typeof perfil, ok: true });
          setIsAdmin((snap.data() as { role?: string }).role === 'admin');
        }
      } else {
        setIsAdmin(false);
      }
    });
    return unsub;
  }, []);

  /* ── User's own reservations (for Mi Perfil) ── */
  useEffect(() => {
    if (!user || user === 'loading') return;
    const q = query(collection(db, 'reservas'),
      where('userId', '==', (user as User).uid),
      where('estado', '!=', 'cancelada')
    );
    const unsub = onSnapshot(q, (snap) => {
      setMisReservas(snap.docs.map(d => ({ id: d.id, ...d.data() } as typeof misReservas[0])));
    });
    return unsub;
  }, [user]);

  /* ── Real-time court reservations for selected date ── */
  useEffect(() => {
    if (!selectedDate) return;
    const dateStr = selectedDate.toISOString().split('T')[0];
    const q = query(collection(db, 'reservas'),
      where('fecha', '==', dateStr),
      where('estado', '!=', 'cancelada')
    );
    const unsub = onSnapshot(q, (snap) => {
      const map: Record<string,string> = {};
      snap.forEach(d => {
        const r = d.data();
        const key = `${r.canchaId}-${r.hora}`;
        map[key] = r.userName || 'Reservado';
        if (r.duracion === 2) {
          const h2 = `${r.canchaId}-${String(parseInt(r.hora)+1).padStart(2,'0')}:00`;
          map[h2] = r.userName || 'Reservado';
        }
      });
      setReservasDelDia(map);
    });
    return unsub;
  }, [selectedDate]);

  function showToast(msg:string){ setToast(msg); setToastVisible(true); setTimeout(()=>setToastVisible(false),2800); }
  function openModal(tipo:string,idx?:number){ setModal({tipo,idx}); }
  function closeModal(){ setModal(null); }

  const allJugadores = [...jugadores, ...extraJugadores];
  const maxPts = Math.max(...allJugadores.map(p=>p[1] as number));
  const waUrl  = (msg:string)=>`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

  function getHorasDelDia(date:Date): number[] {
    const day = date.getDay();
    if (day===0) return Array.from({length:14},(_,i)=>i+8);
    if (day===5||day===6) return Array.from({length:13},(_,i)=>i+9);
    return Array.from({length:14},(_,i)=>i+9);
  }
  function fmtDate(d:Date): string {
    return d.toLocaleDateString('es-CL',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  }
  function getCalDays(): (Date|null)[] {
    const year=calMonth.getFullYear(), month=calMonth.getMonth();
    const firstDay=new Date(year,month,1).getDay();
    const daysInMonth=new Date(year,month+1,0).getDate();
    const offset=firstDay===0?6:firstDay-1;
    const cells:(Date|null)[]=Array(offset).fill(null);
    for (let d=1;d<=daysInMonth;d++) cells.push(new Date(year,month,d));
    return cells;
  }
  const precioReserva = duracion===1?15000:25000;

  async function savePerfil(data:typeof perfil) {
    setPerfil(data);
    if (user && user !== 'loading') {
      await setDoc(doc(db,'users',(user as User).uid), { ...data }, { merge:true });
    }
  }

  async function confirmarReserva() {
    if (!selectedDate||!selectedHora||!user||user==='loading') return;
    const dateStr = selectedDate.toISOString().split('T')[0];
    await addDoc(collection(db,'reservas'), {
      canchaId:   selectedCancha,
      fecha:      dateStr,
      hora:       selectedHora,
      duracion,
      userId:     (user as User).uid,
      userName:   perfil.nombre || (user as User).email || 'Usuario',
      userRut:    perfil.rut || '',
      monto:      precioReserva,
      estado:     'pendiente',
      createdAt:  serverTimestamp(),
    });
    const msg = `Hola PlayTenis! Quiero reservar:\n📅 ${fmtDate(selectedDate)}\n⏰ ${selectedHora} (${duracion}hr)\n🎾 Cancha ${selectedCancha}\n👤 ${perfil.nombre||''}\nTotal: $${precioReserva.toLocaleString('es-CL')}`;
    setCanchaStep('calendar');
    setSelectedDate(null); setSelectedHora(null); setResNombre(''); setResTel('');
    showToast('✅ Reserva confirmada');
    window.open(waUrl(msg),'_blank');
  }

  if (user === 'loading') return (
    <div className="phone" style={{alignItems:'center',justifyContent:'center'}}>
      <div style={{fontSize:40,marginBottom:12}}>🎾</div>
      <div style={{fontWeight:700,color:'var(--naranja)'}}>PlayTenis Academia</div>
    </div>
  );

  if (!user) return <AuthScreen onAuth={()=>{}} />;

  return (
    <div className="phone">
      <header>
        <Image src="/logo.jpeg" alt="PlayTenis" width={44} height={44} style={{borderRadius:'50%',objectFit:'cover',flexShrink:0}} />
        <div><h1>PlayTenis · Academia</h1><p>Tenis · Clases y Arriendos · Colina 🇨🇱</p></div>
      </header>

      <div className="content">
        {/* INICIO */}
        <section className={`screen ${screen==="inicio"?"active":""}`}>
          <div className="hero">
            <div className="ball"/>
            <h2>No solo enseñamos<br/>a golpear la pelota 🎾</h2>
            <p>Enseñamos a amar el juego y disfrutar del proceso ✨</p>
          </div>
          <div className="grid2">
            <button className="acc" onClick={()=>setScreen("ranking")}><div className="ic">🏆</div><div className="t">Ranking</div><div className="s">Posiciones del club</div></button>
            <button className="acc" onClick={()=>setScreen("torneos")}><div className="ic">🎯</div><div className="t">Torneos</div><div className="s">Inscríbete ahora</div></button>
            <button className="acc" onClick={()=>setScreen("canchas")}><div className="ic">📅</div><div className="t">Reservar cancha</div><div className="s">Disponibilidad en tiempo real</div></button>
            <button className="acc" onClick={()=>setScreen("academia")}><div className="ic">🎾</div><div className="t">Academia</div><div className="s">Clases y servicios</div></button>
          </div>
          <div className="aviso">⚠️ <strong>Solo zapatillas de arcilla</strong> en las canchas.</div>
          <div className="stats">
            <div className="stat"><div className="n">4</div><div className="l">Canchas</div></div>
            <div className="stat"><div className="n">500+</div><div className="l">Socios</div></div>
            <div className="stat"><div className="n">20+</div><div className="l">Torneos/año</div></div>
          </div>
          <div className="section-title">Próximo torneo</div>
          <div className="tcard">
            <div className="tn">{torneos[0].n}</div>
            <div className="tm">{torneos[0].f}</div>
            <div className="trow"><span className="price">{torneos[0].p}</span><span className="cupos">{torneos[0].c}</span><button className="mini" onClick={()=>setScreen("torneos")}>Ver más</button></div>
          </div>
        </section>

        {/* RANKING */}
        <section className={`screen ${screen==="ranking"?"active":""}`}>
          <div className="mycard">
            <div className="pos">Líder · Escalerilla 2026</div>
            <div className="name">#1 · {allJugadores[0][0] as string}</div>
            <div className="row">
              <div><span className="big">{allJugadores[0][1] as number}</span><span className="cap">Puntos</span></div>
              <div><span className="big">{allJugadores[0][2] as number}</span><span className="cap">Jugados</span></div>
              <div><span className="big">{allJugadores[0][5] as number}%</span><span className="cap">Rend.</span></div>
            </div>
          </div>
          <button className="btn" onClick={()=>openModal("partido")}>+ Registrar partido</button>
          <div className="section-title">Ranking del club</div>
          {allJugadores.map((p,i)=>{
            const cls=i===0?"top1":i===1?"top2":i===2?"top3":"";
            const pct=Math.round(((p[1] as number)/maxPts)*100);
            return (
              <div key={i} className={`rank-item ${cls}`}>
                <div className="rank-pos">{i+1}</div>
                <div className="avatar" style={{background:avatarColor(p[0] as string)}}>{initials(p[0] as string)}</div>
                <div className="rank-info">
                  <div className="nm">{p[0] as string}</div>
                  <div className="sub">{p[3] as number}G · {p[4] as number}P · {p[2] as number} jugados</div>
                  <div className="bar"><i style={{width:`${pct}%`}}/></div>
                </div>
                <div className="rank-pts"><div className="p">{p[1] as number}</div><div className="pct">{p[5] as number}%</div></div>
              </div>
            );
          })}
          <p className="foot">PlayTenis Chicureo · @playtenis.cl 🎾</p>
        </section>

        {/* TORNEOS */}
        <section className={`screen ${screen==="torneos"?"active":""}`}>
          <div className="section-title">Inscripciones abiertas</div>
          {torneos.map((t,i)=>(
            <div key={i} className="tcard">
              <div className="tn">{t.n}</div><div className="tm">{t.f}</div>
              <div className="trow"><span className="price">{t.p}</span><span className="cupos">{t.c}</span>
                <button className="mini wa" onClick={()=>openModal("torneo",i)}>Inscribirme</button>
              </div>
            </div>
          ))}
        </section>

        {/* CANCHAS — 4 canchas + disponibilidad real-time */}
        <section className={`screen ${screen==="canchas"?"active":""}`}>
          <div className="aviso">🎾 <strong>Solo zapatillas de arcilla.</strong> Reprogramación con 24 hrs de anticipación.</div>

          {/* STEP 1: CALENDARIO */}
          {canchaStep==='calendar' && (<>
            <div className="section-title">Selecciona una fecha</div>
            <div className="infobox" style={{marginBottom:14}}>
              <div className="cal-nav">
                <button onClick={()=>setCalMonth(m=>{const d=new Date(m);d.setMonth(d.getMonth()-1);return d;})}>‹</button>
                <span className="cal-month">{calMonth.toLocaleDateString('es-CL',{month:'long',year:'numeric'}).replace(/^\w/,c=>c.toUpperCase())}</span>
                <button onClick={()=>setCalMonth(m=>{const d=new Date(m);d.setMonth(d.getMonth()+1);return d;})}>›</button>
              </div>
              <div className="cal-days-header">{['L','M','M','J','V','S','D'].map((d,i)=><span key={i}>{d}</span>)}</div>
              <div className="cal-grid">
                {getCalDays().map((d,i)=>{
                  if (!d) return <div key={i}/>;
                  const today=new Date();today.setHours(0,0,0,0);
                  const isPast=d<today;
                  const isSel=selectedDate?.toDateString()===d.toDateString();
                  const isToday=d.toDateString()===today.toDateString();
                  return (
                    <button key={i} className={`cal-day${isSel?' sel':isToday?' today':''}`} disabled={isPast}
                      onClick={()=>{setSelectedDate(d);setSelectedHora(null);setCanchaStep('slots');}}>
                      {d.getDate()}
                    </button>
                  );
                })}
              </div>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:'var(--suave)',borderTop:'1px solid var(--linea)',paddingTop:10}}>
                <span>1 hora · <strong style={{color:'var(--naranja-osc)'}}>$15.000</strong></span>
                <span>2 horas · <strong style={{color:'var(--naranja-osc)'}}>$25.000</strong></span>
                <span>4 canchas disponibles</span>
              </div>
            </div>
            <button className="btn wa" onClick={()=>window.open(`https://wa.me/${WA}`,"_blank")}>💬 Consultar por WhatsApp</button>
            <p className="foot">San Vicente de Lo Arcaya 1, Colina</p>
          </>)}

          {/* STEP 2: GRID 4 canchas × horarios */}
          {canchaStep==='slots' && selectedDate && (<>
            <div className="step-header">
              <button onClick={()=>setCanchaStep('calendar')}>←</button>
              <h3>{fmtDate(selectedDate).replace(/^\w/,c=>c.toUpperCase())}</h3>
            </div>
            <div className="dur-toggle">
              <button className={`dur-btn${duracion===1?' active':''}`} onClick={()=>setDuracion(1)}>1 hora · $15.000</button>
              <button className={`dur-btn${duracion===2?' active':''}`} onClick={()=>setDuracion(2)}>2 horas · $25.000</button>
            </div>

            {/* Selector de cancha */}
            <div className="cancha-tabs">
              {CANCHAS.map(c=>(
                <button key={c.id} className={`cancha-tab${selectedCancha===c.id?' active':''}`} onClick={()=>{setSelectedCancha(c.id);setSelectedHora(null);}}>
                  {c.nombre}
                </button>
              ))}
            </div>
            <div style={{fontSize:11,color:'var(--suave)',marginBottom:10,textAlign:'center'}}>
              {CANCHAS.find(c=>c.id===selectedCancha)?.tipo}
            </div>

            {/* Slots */}
            <div className="section-title">Elige tu horario</div>
            <div className="slot-grid">
              {getHorasDelDia(selectedDate).map(h=>{
                const label=`${String(h).padStart(2,'0')}:00`;
                const key=`${selectedCancha}-${label}`;
                const ocupado=!!reservasDelDia[key];
                const isSel=selectedHora===label;
                return (
                  <button key={h} className={`slot${isSel?' sel':''}${ocupado?' ocupado':''}`} disabled={ocupado}
                    onClick={()=>!ocupado&&setSelectedHora(label)}>
                    {label}
                    <span className="sub">{ocupado ? '❌ Reservado' : duracion===2?`hasta ${String(h+2).padStart(2,'0')}:00`:`hasta ${String(h+1).padStart(2,'0')}:00`}</span>
                  </button>
                );
              })}
            </div>
            <div className="cancha-legend">
              <span className="leg-ok">Disponible</span>
              <span className="leg-no">Reservado</span>
              <span className="leg-sel">Seleccionado</span>
            </div>
            <button className="btn" disabled={!selectedHora} style={{opacity:selectedHora?1:0.4}}
              onClick={()=>{if(selectedHora)setCanchaStep('form');}}>
              Continuar →
            </button>
          </>)}

          {/* STEP 3: FORMULARIO */}
          {canchaStep==='form' && selectedDate && selectedHora && (<>
            <div className="step-header">
              <button onClick={()=>setCanchaStep('slots')}>←</button>
              <h3>Datos de reserva</h3>
            </div>
            <div className="resumen-box">
              <div className="r-row"><span className="rk">Cancha</span><span className="rv">Cancha {selectedCancha} · {CANCHAS.find(c=>c.id===selectedCancha)?.tipo}</span></div>
              <div className="r-row"><span className="rk">Fecha</span><span className="rv">{fmtDate(selectedDate).replace(/^\w/,c=>c.toUpperCase())}</span></div>
              <div className="r-row"><span className="rk">Hora</span><span className="rv">{selectedHora} · {duracion} hora{duracion>1?'s':''}</span></div>
              <div className="r-row"><span className="rk">Total</span><span className="rv" style={{color:'var(--naranja-osc)',fontSize:15}}>${precioReserva.toLocaleString('es-CL')}</span></div>
            </div>
            <div className="field"><label>Tu nombre</label><input placeholder="Ej: Juan Pérez" value={resNombre||perfil.nombre} onChange={e=>setResNombre(e.target.value)} /></div>
            <div className="field"><label>Teléfono</label><input type="tel" placeholder="+569 XXXX XXXX" value={resTel||perfil.telefono} onChange={e=>setResTel(e.target.value)} /></div>
            <button className="btn" onClick={()=>setCanchaStep('pago')}>Ver datos de pago →</button>
          </>)}

          {/* STEP 4: PAGO + CONFIRMACIÓN */}
          {canchaStep==='pago' && selectedDate && selectedHora && (<>
            <div className="step-header">
              <button onClick={()=>setCanchaStep('form')}>←</button>
              <h3>Confirmar reserva</h3>
            </div>
            <div className="resumen-box">
              <div className="r-row"><span className="rk">Nombre</span><span className="rv">{resNombre||perfil.nombre}</span></div>
              <div className="r-row"><span className="rk">Cancha</span><span className="rv">Cancha {selectedCancha}</span></div>
              <div className="r-row"><span className="rk">Fecha</span><span className="rv">{fmtDate(selectedDate).replace(/^\w/,c=>c.toUpperCase())}</span></div>
              <div className="r-row"><span className="rk">Hora</span><span className="rv">{selectedHora} · {duracion} hora{duracion>1?'s':''}</span></div>
              <div className="r-row"><span className="rk">Total</span><span className="rv" style={{color:'var(--naranja-osc)',fontSize:15}}>${precioReserva.toLocaleString('es-CL')}</span></div>
            </div>
            <div className="pagobox">
              <h4>💳 Datos de pago</h4>
              <div className="row"><span className="k">Nombre</span><span className="v">{PAGO.nombre}</span></div>
              <div className="row"><span className="k">RUT</span><span className="v">{PAGO.rut}</span></div>
              <div className="row"><span className="k">Banco</span><span className="v">{PAGO.banco}</span></div>
              <div className="row"><span className="k">Cuenta</span><span className="v">{PAGO.tipoCuenta} {PAGO.numCuenta}</span></div>
              <div className="row"><span className="k">Monto</span><span className="v" style={{color:'var(--naranja-osc)',fontSize:15}}>${precioReserva.toLocaleString('es-CL')}</span></div>
            </div>
            <button className="btn wa" onClick={confirmarReserva}>💬 Confirmar por WhatsApp</button>
            <button className="btn sec" style={{marginTop:8}} onClick={()=>{setCanchaStep('calendar');setSelectedDate(null);setSelectedHora(null);}}>Cancelar</button>
          </>)}
        </section>

        {/* ACADEMIA */}
        <section className={`screen ${screen==="academia"?"active":""}`}>
          <div className="section-title">Director Deportivo</div>
          <div className="infobox" style={{marginBottom:14}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div className="avatar" style={{background:"#993D00",width:52,height:52,fontSize:18,flexShrink:0}}>PE</div>
              <div><div style={{fontWeight:800,fontSize:16}}>Patricio Escalona</div><div style={{fontSize:12,color:"var(--suave)"}}>Director Deportivo · PlayTenis Chicureo</div></div>
            </div>
          </div>
          <div className="aviso">🎾 <strong>1 clase de prueba GRATIS.</strong> ¡Agenda tu cupo!</div>
          <div className="section-title">Programas</div>
          {[["👶","Kinder Tenis","Para quienes inician en el tenis"],["🧒","Niños","Clases grupales · técnica y diversión"],["👥","Adultos Grupales","Todos los niveles"],["🎾","Clases Individuales","Horario a convenir con Patricio"],["🏆","Escalerilla","Ranking y competencia interna"]].map(([ic,nm,ds])=>(
            <div key={nm} className="lcard">
              <div className="ic">{ic}</div>
              <div style={{flex:1}}><div className="nm">{nm}</div><div className="ds">{ds}</div></div>
              <button className="mini" onClick={()=>openModal("clase")}>Inscribir</button>
            </div>
          ))}
          <button className="btn wa" onClick={()=>window.open(waUrl("Hola! Quiero agendar mi clase de prueba GRATIS en PlayTenis Chicureo."),"_blank")}>💬 Clase de prueba GRATIS</button>
          <p className="foot">@playtenis.cl · +56 9 8158 8218</p>
        </section>

        {/* PERFIL */}
        <section className={`screen ${screen==="perfil"?"active":""}`}>
          {!perfil.ok && !editPerfil && (
            <div style={{textAlign:'center',padding:'30px 0'}}>
              <div style={{fontSize:48,marginBottom:12}}>👤</div>
              <div style={{fontWeight:800,fontSize:18,marginBottom:6}}>Completa tu perfil</div>
              <div style={{fontSize:13,color:'var(--suave)',marginBottom:20}}>Hola {(user as User).email} 👋</div>
              <button className="btn" onClick={()=>setEditPerfil(true)}>Completar perfil</button>
            </div>
          )}
          {editPerfil && (
            <>
              <div className="step-header">
                {perfil.ok && <button onClick={()=>setEditPerfil(false)}>←</button>}
                <h3>{perfil.ok?'Editar perfil':'Nuevo perfil'}</h3>
              </div>
              <div className="field"><label>Nombre completo</label><input placeholder="Ej: Juan Pérez" defaultValue={perfil.nombre} id="pf-nombre"/></div>
              <div className="field"><label>RUT</label><input placeholder="12.345.678-9" defaultValue={perfil.rut} id="pf-rut"/></div>
              <div className="field"><label>Teléfono</label><input type="tel" placeholder="+569 XXXX XXXX" defaultValue={perfil.telefono} id="pf-tel"/></div>
              <div className="field"><label>Fecha de nacimiento</label><input type="date" defaultValue={perfil.nacimiento} id="pf-nac"/></div>
              <div className="section-title">Mi estilo de juego</div>
              <div className="field"><label>Estilo</label>
                <select value={perfil.estilo} onChange={e=>setPerfil({...perfil,estilo:e.target.value})}>
                  <option value="">-- Elige --</option>
                  <option>Derecha</option><option>Zurdo</option><option>Baseline</option>
                  <option>Red</option><option>Agresivo</option><option>Defensor</option><option>Todo terreno</option>
                </select>
              </div>
              <div className="field"><label>Golpe favorito</label>
                <select value={perfil.golpe} onChange={e=>setPerfil({...perfil,golpe:e.target.value})}>
                  <option value="">-- Elige --</option>
                  <option>Derecha</option><option>Revés</option><option>Saque</option>
                  <option>Volea</option><option>Smash</option><option>Drop shot</option><option>Globo</option>
                </select>
              </div>
              <div className="field"><label>Superficie preferida</label>
                <select value={perfil.superficie} onChange={e=>setPerfil({...perfil,superficie:e.target.value})}>
                  <option value="">-- Elige --</option>
                  <option>Arcilla</option><option>Cemento</option><option>Hierba</option><option>Dura</option>
                </select>
              </div>
              <button className="btn" onClick={()=>{
                const nombre=(document.getElementById('pf-nombre') as HTMLInputElement)?.value||perfil.nombre;
                const rut=(document.getElementById('pf-rut') as HTMLInputElement)?.value||perfil.rut;
                const tel=(document.getElementById('pf-tel') as HTMLInputElement)?.value||perfil.telefono;
                const nac=(document.getElementById('pf-nac') as HTMLInputElement)?.value||perfil.nacimiento;
                savePerfil({...perfil,nombre,rut,telefono:tel,nacimiento:nac,ok:true});
                setEditPerfil(false); showToast('✅ Perfil guardado');
              }}>Guardar perfil</button>
            </>
          )}

          {perfil.ok && !editPerfil && (<>
            {/* 1. Tarjeta perfil */}
            <div className="perfil-header">
              <div className="perfil-top">
                <div className="perfil-av" style={{background:avatarColor(perfil.nombre||'U')}}>{initials(perfil.nombre||'Usuario')}</div>
                <div style={{flex:1}}>
                  <div className="perfil-name">{perfil.nombre}</div>
                  <div className="perfil-sub">RUT: {perfil.rut||'—'}</div>
                  <div className="perfil-sub">{perfil.telefono||'—'}</div>
                </div>
                <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:6}}>
                  <button onClick={()=>setEditPerfil(true)} style={{background:'none',border:'none',fontSize:18,cursor:'pointer',color:'var(--suave)'}}>✏️</button>
                  <span className={`socio-badge ${perfil.socio?'activo':'inactivo'}`}>{perfil.socio?'✓ SOCIO':'Sin membresía'}</span>
                </div>
              </div>
            </div>

            {/* 2. Mensaje escalerilla */}
            <div className="aviso" style={{fontSize:12,marginBottom:12}}>
              {partidos.length===0
                ?'Aún no tienes partidos en la escalerilla. ¡Juega y sube tu ranking!'
                :`🏆 ${partidos.filter(p=>p.ganado).length} victorias · ${partidos.filter(p=>!p.ganado).length} derrotas en la escalerilla`
              }
            </div>

            {/* 3. Mis últimos partidos */}
            <div className="section-title">Mis últimos partidos</div>
            {partidos.length===0
              ?<div style={{fontSize:13,color:'var(--suave)',marginBottom:10}}>No se pudo cargar el historial.</div>
              :partidos.slice(-5).reverse().map((p,i)=>(
                <div key={i} className="match-row">
                  <div><div className="mr-rival">vs {p.rival}</div><div className="mr-res">{p.fecha} · {p.resultado}</div></div>
                  <span className={`badge ${p.ganado?'win':'loss'}`}>{p.ganado?'Victoria':'Derrota'}</span>
                </div>
              ))
            }

            {/* 4. Partidos pendientes */}
            {pendientes.length>0&&(<>
              <div className="section-title">Partidos pendientes</div>
              {pendientes.map(p=>(
                <div key={p.id} className="pend-card">
                  <div className="pc-title">vs {p.rival}</div>
                  <div style={{fontSize:12,color:'var(--suave)',marginTop:2}}>{p.fecha} · {p.resultado}</div>
                  <div className="pc-btns">
                    <button className="pc-ok" onClick={()=>{setPartidos(prev=>[...prev,{rival:p.rival,fecha:p.fecha,resultado:p.resultado,ganado:true}]);setPendientes(prev=>prev.filter(x=>x.id!==p.id));showToast('✅ Partido confirmado');}}>✓ Victoria</button>
                    <button className="pc-no" onClick={()=>{setPartidos(prev=>[...prev,{rival:p.rival,fecha:p.fecha,resultado:p.resultado,ganado:false}]);setPendientes(prev=>prev.filter(x=>x.id!==p.id));showToast('Partido registrado');}}>✗ Derrota</button>
                  </div>
                </div>
              ))}
            </>)}

            {/* 5. Mis próximas reservas */}
            <div className="section-title">Mis próximas reservas</div>
            {misReservas.length===0
              ?<div style={{fontSize:13,color:'var(--suave)',marginBottom:10}}>No tienes reservas próximas.</div>
              :misReservas.map((r,i)=>(
                <div key={i} className="res-card" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div>
                    <div className="rc-title">Cancha {r.canchaId} · {r.hora}</div>
                    <div className="rc-sub">{r.fecha} · {r.duracion} hora · ${r.monto.toLocaleString('es-CL')} - ${r.monto.toLocaleString('es-CL')}</div>
                  </div>
                  <span className="badge win" style={{fontSize:11,marginLeft:8}}>Conf.</span>
                </div>
              ))
            }

            {/* 6–9. Botones estilo ATMAS */}
            <button className="btn" style={{marginBottom:8}} onClick={()=>openModal("partido")}>+ Registrar partido</button>
            <button className="btn sec" style={{marginBottom:8}} onClick={()=>openModal("estilo")}>Mi estilo de juego</button>
            <button className="btn dark" style={{marginBottom:8}} onClick={()=>{savePerfil({...perfil,socio:!perfil.socio});showToast(perfil.socio?'Membresía desactivada':'✅ ¡Bienvenido SOCIO PlayTenis!');}}>
              {perfil.socio?'✓ Membresía activa · Renovar':'🏆 Membresía PlayTenis'}
            </button>
            <button className="btn sec" style={{marginBottom:8}} onClick={()=>setScreen('canchas')}>Reservar cancha</button>
            <button className="btn sec" onClick={async()=>{await signOut(auth);setPerfil({nombre:'',rut:'',telefono:'',nacimiento:'',estilo:'',golpe:'',superficie:'',socio:false,ok:false});setIsAdmin(false);showToast('Sesión cerrada');}}>
              Cerrar sesión
            </button>
            {isAdmin && <button className="admin-link" onClick={()=>setScreen('admin')}>🔐 Administración</button>}
            <p className="foot">@playtenis.cl · +56 9 8158 8218</p>
          </>)}
        </section>

        {/* ADMIN */}
        <section className={`screen ${screen==="admin"?"active":""}`}>
          {!adminLogged?(
            <div style={{textAlign:'center',padding:'40px 20px'}}>
              <div style={{fontSize:52,marginBottom:8}}>🔐</div>
              <div style={{fontWeight:800,fontSize:20,marginBottom:4}}>Acceso Admin</div>
              <div style={{fontSize:13,color:'var(--suave)',marginBottom:24}}>Solo Patricio Escalona</div>
              <div className="field" style={{maxWidth:220,margin:'0 auto 16px'}}>
                <input type="password" inputMode="numeric" maxLength={4} placeholder="PIN (4 dígitos)"
                  value={adminPinInput} onChange={e=>setAdminPinInput(e.target.value)}
                  style={{textAlign:'center',fontSize:24,letterSpacing:10}}/>
              </div>
              <button className="btn" onClick={()=>{
                if(adminPinInput==='2025'){setAdminLogged(true);setAdminPinInput('');showToast('✅ Bienvenido, Patricio');}
                else{showToast('PIN incorrecto');setAdminPinInput('');}
              }}>Ingresar</button>
              <button className="btn sec" style={{marginTop:8}} onClick={()=>{setScreen('perfil');setAdminPinInput('');}}>Cancelar</button>
            </div>
          ):(<>
            <div className="admin-card">
              <div className="admin-card-top">
                <div className="avatar" style={{background:'rgba(255,255,255,0.2)',width:48,height:48,fontSize:17,border:'2px solid rgba(255,255,255,0.3)'}}>PE</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:800,fontSize:17}}>Patricio Escalona</div>
                  <div style={{fontSize:12,opacity:0.75,marginTop:2}}>Director · PlayTenis Academia</div>
                </div>
                <span className="admin-badge">ADMIN</span>
              </div>
              <div className="admin-stats-row">
                <div className="admin-stat-item"><div className="n">4</div><div className="l">Canchas hoy</div></div>
                <div className="admin-stat-item"><div className="n">{inscripciones.filter(i=>i.estado==='pendiente').length}</div><div className="l">Inscripciones</div></div>
                <div className="admin-stat-item"><div className="n">{allJugadores.length}</div><div className="l">Jugadores</div></div>
              </div>
            </div>

            <div className="section-title">Inscripciones torneos</div>
            {inscripciones.map(ins=>(
              <div key={ins.id} className="insc-card">
                <div className="insc-nombre">{ins.nombre}</div>
                <div className="insc-torneo">{ins.torneo}</div>
                <div className="insc-tel">📞 {ins.tel}</div>
                {ins.estado==='pendiente'?(
                  <div className="insc-btns">
                    <button className="pc-ok" onClick={()=>{setInscripciones(p=>p.map(x=>x.id===ins.id?{...x,estado:'aprobado'}:x));showToast('✅ Inscripción aprobada');}}>✓ Aprobar</button>
                    <button className="pc-no" onClick={()=>{setInscripciones(p=>p.map(x=>x.id===ins.id?{...x,estado:'rechazado'}:x));showToast('Inscripción rechazada');}}>✗ Rechazar</button>
                  </div>
                ):(
                  <span className={`badge ${ins.estado==='aprobado'?'win':'loss'}`}>{ins.estado==='aprobado'?'✓ Aprobado':'✗ Rechazado'}</span>
                )}
              </div>
            ))}

            <div className="section-title" style={{marginTop:20}}>Acciones</div>
            <button className="btn dark" style={{marginBottom:8}} onClick={()=>setScreen('canchas')}>📅 Gestionar actividades del día</button>
            <button className="btn" style={{marginBottom:8}} onClick={()=>openModal('partido')}>+ Registrar partido</button>
            <button className="btn dark" style={{marginBottom:8}} onClick={()=>{setShowAddPlayer(p=>!p);setShowAddWinner(false);}}>👤 + Agregar jugador al ranking</button>
            {showAddPlayer&&(<>
              <div className="field"><label>Nombre</label><input placeholder="Nombre completo" value={nuevoNombreRk} onChange={e=>setNuevoNombreRk(e.target.value)}/></div>
              <div className="field"><label>Puntos iniciales</label><input type="number" placeholder="Ej: 30" value={nuevoPuntosRk} onChange={e=>setNuevoPuntosRk(e.target.value)}/></div>
              <button className="btn" disabled={!nuevoNombreRk||!nuevoPuntosRk} style={{opacity:nuevoNombreRk&&nuevoPuntosRk?1:0.4,marginBottom:8}}
                onClick={()=>{setExtraJugadores(prev=>[...prev,[nuevoNombreRk,parseInt(nuevoPuntosRk)||0,0,0,0,0]]);setNuevoNombreRk('');setNuevoPuntosRk('');setShowAddPlayer(false);showToast(`✅ ${nuevoNombreRk} agregado`);}}>
                Guardar jugador
              </button>
            </>)}
            <button className="btn dark" style={{marginBottom:8}} onClick={()=>{setShowAddWinner(p=>!p);setShowAddPlayer(false);}}>🏆 Registrar ganador de torneo</button>
            {showAddWinner&&(<>
              <div className="field"><label>Torneo</label>
                <select value={ganadorTorneoIdx} onChange={e=>setGanadorTorneoIdx(Number(e.target.value))}>
                  {torneos.map((t,i)=><option key={i} value={i}>{t.n}</option>)}
                </select>
              </div>
              <div className="field"><label>Ganador</label>
                <input placeholder="Nombre del ganador" value={ganadorNombreInput} onChange={e=>setGanadorNombreInput(e.target.value)}/>
              </div>
              <button className="btn" disabled={!ganadorNombreInput} style={{opacity:ganadorNombreInput?1:0.4,marginBottom:8}}
                onClick={()=>{showToast(`🏆 ${ganadorNombreInput} registrado`);setGanadorNombreInput('');setShowAddWinner(false);}}>
                Guardar ganador
              </button>
            </>)}
            <button className="btn sec" style={{marginBottom:8}} onClick={()=>setScreen('canchas')}>📅 Ver reservas de canchas</button>
            <button className="btn sec" onClick={()=>{setAdminLogged(false);setScreen('perfil');showToast('Sesión admin cerrada');}}>Cerrar sesión admin</button>
            <p className="foot">@playtenis.cl · PlayTenis Academia · Colina</p>
          </>)}
        </section>
      </div>

      {/* Tab Bar */}
      <div className="tabbar">
        {[["inicio","🏠","Inicio"],["ranking","🏆","Ranking"],["torneos","🎯","Torneos"],["canchas","📅","Cancha"],["academia","🎾","Academia"],["perfil","👤","Perfil"]].map(([s,ic,lb])=>(
          <button key={s} className={`tab ${screen===s||(s==='perfil'&&screen==='admin')?'active':''}`}
            onClick={()=>{setScreen(s);if(s!=='canchas')setCanchaStep('calendar');if(s!=='admin'){setAdminLogged(false);setAdminPinInput('');}}}>
            <span className="ic">{ic}</span>{lb}
          </button>
        ))}
      </div>

      {/* Modal */}
      {modal&&(
        <div className="modal show" onClick={e=>{if(e.target===e.currentTarget)closeModal();}}>
          <div className="sheet">
            {modal.tipo==="torneo"&&modal.idx!==undefined&&(<>
              <h3>Inscripción · {torneos[modal.idx].n}</h3>
              <div className="field"><label>Tu nombre</label><input placeholder="Ej: Juan Pérez"/></div>
              <div className="field"><label>Teléfono</label><input type="tel" placeholder="+569 XXXX XXXX"/></div>
              <div className="pagobox">
                <h4>💳 Datos de pago</h4>
                <div className="row"><span className="k">Nombre</span><span className="v">{PAGO.nombre}</span></div>
                <div className="row"><span className="k">RUT</span><span className="v">{PAGO.rut}</span></div>
                <div className="row"><span className="k">Banco</span><span className="v">{PAGO.banco}</span></div>
                <div className="row"><span className="k">Cuenta</span><span className="v">{PAGO.tipoCuenta} {PAGO.numCuenta}</span></div>
                <div className="row"><span className="k">Monto</span><span className="v" style={{color:"var(--naranja-osc)",fontSize:16}}>${torneos[modal.idx].monto.toLocaleString("es-CL")}</span></div>
              </div>
              <button className="btn wa" onClick={()=>{closeModal();window.open(waUrl(`Hola PlayTenis! Quiero inscribirme en: ${torneos[modal.idx!].n}`),"_blank");}}>💬 Confirmar por WhatsApp</button>
              <button className="btn sec" style={{marginTop:8}} onClick={closeModal}>Cancelar</button>
            </>)}
            {modal.tipo==="partido"&&(<>
              <h3>Registrar partido</h3>
              <div className="field"><label>Oponente</label><select>{allJugadores.map((p,i)=><option key={i}>{p[0] as string}</option>)}</select></div>
              <div className="field"><label>Fecha</label><input type="date" defaultValue={new Date().toISOString().split("T")[0]}/></div>
              <div className="field"><label>Resultado</label><input placeholder="Ej: 6-3, 7-5"/></div>
              <button className="btn" onClick={()=>{
                const rivalEl=document.querySelector('.sheet select') as HTMLSelectElement;
                const resEl=document.querySelector('.sheet input[placeholder="Ej: 6-3, 7-5"]') as HTMLInputElement;
                const rival=rivalEl?.value||'Rival';
                const resultado=resEl?.value||'';
                const ganado=resultado.length>0&&parseInt(resultado[0])>parseInt(resultado[resultado.indexOf('-')+1]||'0');
                setPartidos(prev=>[...prev,{rival,fecha:new Date().toLocaleDateString('es-CL'),resultado,ganado}]);
                closeModal(); showToast("✅ Partido registrado");
              }}>Guardar</button>
              <button className="btn sec" style={{marginTop:8}} onClick={closeModal}>Cancelar</button>
            </>)}
            {modal.tipo==="estilo"&&(<>
              <h3>Mi estilo de juego</h3>
              <div className="field"><label>Estilo</label>
                <select value={perfil.estilo} onChange={e=>setPerfil({...perfil,estilo:e.target.value})}>
                  <option value="">-- Elige --</option>
                  <option>Derecha</option><option>Zurdo</option><option>Baseline</option>
                  <option>Red</option><option>Agresivo</option><option>Defensor</option><option>Todo terreno</option>
                </select>
              </div>
              <div className="field"><label>Golpe favorito</label>
                <select value={perfil.golpe} onChange={e=>setPerfil({...perfil,golpe:e.target.value})}>
                  <option value="">-- Elige --</option>
                  <option>Derecha</option><option>Revés</option><option>Saque</option>
                  <option>Volea</option><option>Smash</option><option>Drop shot</option><option>Globo</option>
                </select>
              </div>
              <div className="field"><label>Superficie preferida</label>
                <select value={perfil.superficie} onChange={e=>setPerfil({...perfil,superficie:e.target.value})}>
                  <option value="">-- Elige --</option>
                  <option>Arcilla</option><option>Cemento</option><option>Hierba</option><option>Dura</option>
                </select>
              </div>
              <button className="btn" onClick={()=>{savePerfil({...perfil});closeModal();showToast('✅ Estilo guardado');}}>Guardar mi estilo</button>
              <button className="btn sec" style={{marginTop:8}} onClick={closeModal}>Cancelar</button>
            </>)}
            {modal.tipo==="clase"&&(<>
              <h3>Inscripción · Academia PlayTenis</h3>
              <div className="field"><label>Nombre</label><input placeholder="Ej: Juan Pérez"/></div>
              <div className="field"><label>Teléfono</label><input type="tel" placeholder="+569 XXXX XXXX"/></div>
              <div className="field"><label>Programa</label><select><option>Kinder Tenis</option><option>Niños · Grupal</option><option>Adultos · Grupal</option><option>Individual</option><option>Escalerilla</option></select></div>
              <button className="btn wa" onClick={()=>{closeModal();window.open(waUrl("Hola PlayTenis! Quiero agendar mi clase de prueba GRATIS."),"_blank");}}>💬 Agendar clase GRATIS</button>
              <button className="btn sec" style={{marginTop:8}} onClick={closeModal}>Cancelar</button>
            </>)}
          </div>
        </div>
      )}
      <div className={`toast ${toastVisible?"show":""}`}>{toast}</div>
    </div>
  );
}

