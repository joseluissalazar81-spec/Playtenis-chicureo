"use client";
import Image from "next/image";
import { useState } from "react";

const WA = "56981588218";
const PAGO = { nombre: "Patricio Escalona", banco: "Transferencia / Mercado Pago" };

const jugadores = [
  ["Carlos Muñoz", 72, 15, 14, 1, 93.3],
  ["Rodrigo Vega", 65, 14, 12, 2, 85.7],
  ["Andrés Torres", 58, 13, 11, 2, 84.6],
  ["Felipe Rivas", 52, 12, 10, 2, 83.3],
  ["Matías Cortés", 48, 11, 9, 2, 81.8],
  ["Sebastián Núñez", 43, 10, 8, 2, 80.0],
  ["Pablo Herrera", 38, 12, 7, 5, 58.3],
  ["Diego Soto", 35, 10, 6, 4, 60.0],
];

const torneos = [
  { n: "Torneo Apertura Chicureo 🏆", f: "15 julio 2026 · 16:00 y 18:00", p: "$25.000", c: "8 cupos", monto: 25000 },
  { n: "Copa PlayTenis Verano", f: "20 agosto 2026 · Desde las 10:00", p: "$20.000", c: "12 cupos", monto: 20000 },
  { n: "Escalerilla Jul–Sep 2026 🎾", f: "Partidos durante el trimestre", p: "$30.000", c: "5 cupos", monto: 30000 },
];

const avatarColors = ["#e74c3c","#e67e22","#f39c12","#2ecc71","#1abc9c","#3498db","#9b59b6","#e91e63"];
function initials(n: string) { return n.split(" ").slice(0, 2).map((x: string) => x[0]).join("").toUpperCase(); }
function avatarColor(n: string) { let h = 0; for (const c of n) h = (h * 31 + c.charCodeAt(0)) % avatarColors.length; return avatarColors[h]; }

type ModalData = { tipo: string; idx?: number } | null;

export default function MobileApp() {
  const [screen, setScreen] = useState("inicio");
  const [modal, setModal] = useState<ModalData>(null);
  const [toast, setToast] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [canchaStep, setCanchaStep] = useState<'calendar'|'slots'|'form'|'pago'>('calendar');
  const [calMonth, setCalMonth] = useState(() => { const d = new Date(); d.setDate(1); return d; });
  const [selectedDate, setSelectedDate] = useState<Date|null>(null);
  const [selectedHora, setSelectedHora] = useState<string|null>(null);
  const [duracion, setDuracion] = useState<1|2>(1);
  const [resNombre, setResNombre] = useState('');
  const [resTel, setResTel] = useState('');
  const [resCancha, setResCancha] = useState('Sin preferencia');
  const [perfil, setPerfil] = useState(() => {
    try {
      const s = typeof window !== 'undefined' && localStorage.getItem('pt_perfil');
      return s ? JSON.parse(s) : { nombre: '', rut: '', telefono: '', nacimiento: '', estilo: '', golpe: '', superficie: '', socio: false, ok: false };
    } catch { return { nombre: '', rut: '', telefono: '', nacimiento: '', estilo: '', golpe: '', superficie: '', socio: false, ok: false }; }
  });
  const [editPerfil, setEditPerfil] = useState(false);
  const [partidos, setPartidos] = useState<Array<{rival:string,fecha:string,resultado:string,ganado:boolean}>>([]);
  const [reservas, setReservas] = useState<Array<{fecha:string,hora:string,dur:number,cancha:string}>>([]);
  const [pendientes, setPendientes] = useState<Array<{rival:string,fecha:string,resultado:string,id:number}>>([
    { rival: 'Carlos Muñoz', fecha: '10 jun 2026', resultado: '6-3, 7-5', id: 1 },
  ]);

  function showToast(msg: string) { setToast(msg); setToastVisible(true); setTimeout(() => setToastVisible(false), 2800); }
  function openModal(tipo: string, idx?: number) { setModal({ tipo, idx }); }
  function closeModal() { setModal(null); }
  const maxPts = Math.max(...jugadores.map(p => p[1] as number));
  const waUrl = (msg: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

  function getDaySlots(date: Date): number[] {
    const day = date.getDay();
    if (day === 0) return Array.from({length: 14}, (_, i) => i + 8);  // Dom 8-21
    if (day === 5) return Array.from({length: 13}, (_, i) => i + 9);  // Vie 9-21
    if (day === 6) return Array.from({length: 12}, (_, i) => i + 9);  // Sab 9-20
    return Array.from({length: 14}, (_, i) => i + 9);                 // Lun-Jue 9-22
  }
  function fmtDate(d: Date): string {
    return d.toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }
  function getCalDays(): (Date|null)[] {
    const year = calMonth.getFullYear(), month = calMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const offset = firstDay === 0 ? 6 : firstDay - 1; // Mon-first offset
    const cells: (Date|null)[] = Array(offset).fill(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
    return cells;
  }
  const precioReserva = duracion === 1 ? 15000 : 25000;

  function savePerfil(data: typeof perfil) {
    setPerfil(data);
    if (typeof window !== 'undefined') localStorage.setItem('pt_perfil', JSON.stringify(data));
  }

  return (
    <div className="phone">
      <header>
        <Image src="/logo.jpeg" alt="PlayTenis" width={44} height={44} style={{ borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
        <div><h1>PlayTenis · Academia</h1><p>Tenis · Clases y Arriendos · Colina 🇨🇱</p></div>
      </header>

      <div className="content">
        {/* INICIO */}
        <section className={`screen ${screen === "inicio" ? "active" : ""}`}>
          <div className="hero">
            <div className="ball" />
            <h2>No solo enseñamos<br />a golpear la pelota 🎾</h2>
            <p>Enseñamos a amar el juego y disfrutar del proceso ✨</p>
          </div>
          <div className="grid2">
            <button className="acc" onClick={() => setScreen("ranking")}><div className="ic">🏆</div><div className="t">Ranking</div><div className="s">Posiciones del club</div></button>
            <button className="acc" onClick={() => setScreen("torneos")}><div className="ic">🎯</div><div className="t">Torneos</div><div className="s">Inscríbete ahora</div></button>
            <button className="acc" onClick={() => setScreen("canchas")}><div className="ic">📅</div><div className="t">Reservar cancha</div><div className="s">Elige tu horario</div></button>
            <button className="acc" onClick={() => setScreen("academia")}><div className="ic">🎾</div><div className="t">Academia</div><div className="s">Clases y servicios</div></button>
          </div>
          <div className="aviso">⚠️ <strong>Solo zapatillas de arcilla</strong> en las canchas.</div>
          <div className="stats">
            <div className="stat"><div className="n">8</div><div className="l">Canchas</div></div>
            <div className="stat"><div className="n">500+</div><div className="l">Socios</div></div>
            <div className="stat"><div className="n">20+</div><div className="l">Torneos/año</div></div>
          </div>
          <div className="section-title">Próximo torneo</div>
          <div className="tcard">
            <div className="tn">{torneos[0].n}</div>
            <div className="tm">{torneos[0].f}</div>
            <div className="trow"><span className="price">{torneos[0].p}</span><span className="cupos">{torneos[0].c}</span><button className="mini" onClick={() => setScreen("torneos")}>Ver más</button></div>
          </div>
        </section>

        {/* RANKING */}
        <section className={`screen ${screen === "ranking" ? "active" : ""}`}>
          <div className="mycard">
            <div className="pos">Líder · Escalerilla 2026</div>
            <div className="name">#1 · {jugadores[0][0] as string}</div>
            <div className="row">
              <div><span className="big">{jugadores[0][1] as number}</span><span className="cap">Puntos</span></div>
              <div><span className="big">{jugadores[0][2] as number}</span><span className="cap">Jugados</span></div>
              <div><span className="big">{jugadores[0][5] as number}%</span><span className="cap">Rend.</span></div>
            </div>
          </div>
          <button className="btn" onClick={() => openModal("partido")}>+ Registrar partido</button>
          <div className="section-title">Ranking del club</div>
          {jugadores.map((p, i) => {
            const cls = i === 0 ? "top1" : i === 1 ? "top2" : i === 2 ? "top3" : "";
            const pct = Math.round(((p[1] as number) / maxPts) * 100);
            return (
              <div key={i} className={`rank-item ${cls}`}>
                <div className="rank-pos">{i + 1}</div>
                <div className="avatar" style={{ background: avatarColor(p[0] as string) }}>{initials(p[0] as string)}</div>
                <div className="rank-info">
                  <div className="nm">{p[0] as string}</div>
                  <div className="sub">{p[3] as number}G · {p[4] as number}P · {p[2] as number} jugados</div>
                  <div className="bar"><i style={{ width: `${pct}%` }} /></div>
                </div>
                <div className="rank-pts"><div className="p">{p[1] as number}</div><div className="pct">{p[5] as number}%</div></div>
              </div>
            );
          })}
          <p className="foot">PlayTenis Chicureo · @playtenis.cl 🎾</p>
        </section>

        {/* TORNEOS */}
        <section className={`screen ${screen === "torneos" ? "active" : ""}`}>
          <div className="section-title">Inscripciones abiertas</div>
          {torneos.map((t, i) => (
            <div key={i} className="tcard">
              <div className="tn">{t.n}</div><div className="tm">{t.f}</div>
              <div className="trow"><span className="price">{t.p}</span><span className="cupos">{t.c}</span>
                <button className="mini wa" onClick={() => openModal("torneo", i)}>Inscribirme</button>
              </div>
            </div>
          ))}
        </section>

        {/* CANCHAS */}
        <section className={`screen ${screen === "canchas" ? "active" : ""}`}>
          <div className="aviso">🎾 <strong>Solo zapatillas de arcilla.</strong> Reprogramación con 24 hrs de anticipación.</div>

          {/* STEP 1: CALENDARIO */}
          {canchaStep === 'calendar' && (<>
            <div className="section-title">Selecciona una fecha</div>
            <div className="infobox" style={{ marginBottom: 14 }}>
              <div className="cal-nav">
                <button onClick={() => setCalMonth(m => { const d = new Date(m); d.setMonth(d.getMonth()-1); return d; })}>‹</button>
                <span className="cal-month">{calMonth.toLocaleDateString('es-CL', { month: 'long', year: 'numeric' }).replace(/^\w/, c => c.toUpperCase())}</span>
                <button onClick={() => setCalMonth(m => { const d = new Date(m); d.setMonth(d.getMonth()+1); return d; })}>›</button>
              </div>
              <div className="cal-days-header">
                {['L','M','M','J','V','S','D'].map((d,i) => <span key={i}>{d}</span>)}
              </div>
              <div className="cal-grid">
                {getCalDays().map((d, i) => {
                  if (!d) return <div key={i} />;
                  const today = new Date(); today.setHours(0,0,0,0);
                  const isPast = d < today;
                  const isSel = selectedDate?.toDateString() === d.toDateString();
                  const isToday = d.toDateString() === today.toDateString();
                  return (
                    <button key={i} className={`cal-day${isSel?' sel':isToday?' today':''}`} disabled={isPast}
                      onClick={() => { setSelectedDate(d); setSelectedHora(null); setCanchaStep('slots'); }}>
                      {d.getDate()}
                    </button>
                  );
                })}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--suave)', borderTop: '1px solid var(--linea)', paddingTop: 10 }}>
                <span>1 hora · <strong style={{ color: 'var(--naranja-osc)' }}>$15.000</strong></span>
                <span>2 horas · <strong style={{ color: 'var(--naranja-osc)' }}>$25.000</strong></span>
                <span>8 canchas disponibles</span>
              </div>
            </div>
            <button className="btn wa" onClick={() => window.open(`https://wa.me/${WA}`, "_blank")}>💬 Consultar por WhatsApp</button>
            <p className="foot">San Vicente de Lo Arcaya 1, Colina</p>
          </>)}

          {/* STEP 2: HORARIOS */}
          {canchaStep === 'slots' && selectedDate && (<>
            <div className="step-header">
              <button onClick={() => setCanchaStep('calendar')}>←</button>
              <h3>{fmtDate(selectedDate).replace(/^\w/, c => c.toUpperCase())}</h3>
            </div>
            <div className="dur-toggle">
              <button className={`dur-btn${duracion===1?' active':''}`} onClick={() => setDuracion(1)}>1 hora · $15.000</button>
              <button className={`dur-btn${duracion===2?' active':''}`} onClick={() => setDuracion(2)}>2 horas · $25.000</button>
            </div>
            <div className="section-title">Elige tu horario</div>
            <div className="slot-grid">
              {getDaySlots(selectedDate).map(h => {
                const label = `${String(h).padStart(2,'0')}:00`;
                const isSel = selectedHora === label;
                return (
                  <button key={h} className={`slot${isSel?' sel':''}`} onClick={() => setSelectedHora(label)}>
                    {label}
                    <span className="sub">{duracion===2 ? `hasta ${String(h+2).padStart(2,'0')}:00` : `hasta ${String(h+1).padStart(2,'0')}:00`}</span>
                  </button>
                );
              })}
            </div>
            <button className="btn" disabled={!selectedHora} style={{ opacity: selectedHora ? 1 : 0.4 }}
              onClick={() => { if (selectedHora) setCanchaStep('form'); }}>
              Continuar →
            </button>
          </>)}

          {/* STEP 3: FORMULARIO */}
          {canchaStep === 'form' && selectedDate && selectedHora && (<>
            <div className="step-header">
              <button onClick={() => setCanchaStep('slots')}>←</button>
              <h3>Datos de reserva</h3>
            </div>
            <div className="resumen-box">
              <div className="r-row"><span className="rk">Fecha</span><span className="rv">{fmtDate(selectedDate).replace(/^\w/, c => c.toUpperCase())}</span></div>
              <div className="r-row"><span className="rk">Hora</span><span className="rv">{selectedHora} · {duracion} hora{duracion>1?'s':''}</span></div>
              <div className="r-row"><span className="rk">Total</span><span className="rv" style={{ color: 'var(--naranja-osc)', fontSize: 15 }}>${precioReserva.toLocaleString('es-CL')}</span></div>
            </div>
            <div className="field"><label>Tu nombre</label><input placeholder="Ej: Juan Pérez" value={resNombre} onChange={e => setResNombre(e.target.value)} /></div>
            <div className="field"><label>Teléfono</label><input type="tel" placeholder="+569 XXXX XXXX" value={resTel} onChange={e => setResTel(e.target.value)} /></div>
            <div className="field"><label>Cancha preferida</label>
              <select value={resCancha} onChange={e => setResCancha(e.target.value)}>
                <option>Sin preferencia</option>
                {Array.from({length:8},(_,i)=><option key={i+1}>Cancha {i+1}</option>)}
              </select>
            </div>
            <button className="btn" disabled={!resNombre || !resTel} style={{ opacity: resNombre && resTel ? 1 : 0.4 }}
              onClick={() => { if (resNombre && resTel) setCanchaStep('pago'); }}>
              Ver datos de pago →
            </button>
          </>)}

          {/* STEP 4: PAGO */}
          {canchaStep === 'pago' && selectedDate && selectedHora && (<>
            <div className="step-header">
              <button onClick={() => setCanchaStep('form')}>←</button>
              <h3>Confirmar reserva</h3>
            </div>
            <div className="resumen-box">
              <div className="r-row"><span className="rk">Nombre</span><span className="rv">{resNombre}</span></div>
              <div className="r-row"><span className="rk">Fecha</span><span className="rv">{fmtDate(selectedDate).replace(/^\w/, c => c.toUpperCase())}</span></div>
              <div className="r-row"><span className="rk">Hora</span><span className="rv">{selectedHora} · {duracion} hora{duracion>1?'s':''}</span></div>
              <div className="r-row"><span className="rk">Cancha</span><span className="rv">{resCancha}</span></div>
              <div className="r-row"><span className="rk">Total</span><span className="rv" style={{ color: 'var(--naranja-osc)', fontSize: 15 }}>${precioReserva.toLocaleString('es-CL')}</span></div>
            </div>
            <div className="pagobox">
              <h4>💳 Datos de pago</h4>
              <div className="row"><span className="k">Nombre</span><span className="v">{PAGO.nombre}</span></div>
              <div className="row"><span className="k">Banco</span><span className="v">{PAGO.banco}</span></div>
              <div className="row"><span className="k">Monto</span><span className="v" style={{ color: 'var(--naranja-osc)', fontSize: 15 }}>${precioReserva.toLocaleString('es-CL')}</span></div>
            </div>
            <button className="btn wa" onClick={() => {
              const msg = `Hola PlayTenis! Quiero reservar una cancha:\n📅 ${fmtDate(selectedDate!)}\n⏰ ${selectedHora} (${duracion}hr)\n🎾 ${resCancha}\n👤 ${resNombre}\n📞 ${resTel}\nTotal: $${precioReserva.toLocaleString('es-CL')}`;
              setReservas(prev => [...prev, {fecha: fmtDate(selectedDate!), hora: selectedHora!, dur: duracion, cancha: resCancha}]);
              setCanchaStep('calendar');
              setSelectedDate(null); setSelectedHora(null); setResNombre(''); setResTel(''); setResCancha('Sin preferencia');
              showToast('✅ Reserva enviada');
              window.open(waUrl(msg), '_blank');
            }}>💬 Confirmar por WhatsApp</button>
            <button className="btn sec" style={{ marginTop: 8 }} onClick={() => { setCanchaStep('calendar'); setSelectedDate(null); setSelectedHora(null); setResNombre(''); setResTel(''); }}>Cancelar</button>
          </>)}
        </section>

        {/* ACADEMIA */}
        <section className={`screen ${screen === "academia" ? "active" : ""}`}>
          <div className="section-title">Director Deportivo</div>
          <div className="infobox" style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div className="avatar" style={{ background: "#993D00", width: 52, height: 52, fontSize: 18, flexShrink: 0 }}>PE</div>
              <div><div style={{ fontWeight: 800, fontSize: 16 }}>Patricio Escalona</div><div style={{ fontSize: 12, color: "var(--suave)" }}>Director Deportivo · PlayTenis Chicureo</div></div>
            </div>
          </div>
          <div className="aviso">🎾 <strong>1 clase de prueba GRATIS.</strong> ¡Agenda tu cupo!</div>
          <div className="section-title">Programas</div>
          {[["👶","Kinder Tenis","Para quienes inician en el tenis"],["🧒","Niños","Clases grupales · técnica y diversión"],["👥","Adultos Grupales","Todos los niveles"],["🎾","Clases Individuales","Horario a convenir con Patricio"],["🏆","Escalerilla","Ranking y competencia interna"]].map(([ic,nm,ds]) => (
            <div key={nm} className="lcard">
              <div className="ic">{ic}</div>
              <div style={{ flex: 1 }}><div className="nm">{nm}</div><div className="ds">{ds}</div></div>
              <button className="mini" onClick={() => openModal("clase")}>Inscribir</button>
            </div>
          ))}
          <button className="btn wa" onClick={() => window.open(waUrl("Hola! Quiero agendar mi clase de prueba GRATIS en PlayTenis Chicureo."), "_blank")}>💬 Clase de prueba GRATIS</button>
          <p className="foot">@playtenis.cl · +56 9 8158 8218</p>
        </section>

        {/* PERFIL */}
        <section className={`screen ${screen === "perfil" ? "active" : ""}`}>
          {/* Setup inicial si no tiene perfil */}
          {!perfil.ok && !editPerfil && (
            <div style={{ textAlign: 'center', padding: '30px 0' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>👤</div>
              <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 6 }}>Crea tu perfil</div>
              <div style={{ fontSize: 13, color: 'var(--suave)', marginBottom: 20 }}>Guarda tus datos y lleva el registro de tus partidos</div>
              <button className="btn" onClick={() => setEditPerfil(true)}>Crear mi perfil</button>
            </div>
          )}

          {/* Formulario de edición */}
          {(editPerfil || (!perfil.ok)) && editPerfil && (
            <>
              <div className="step-header">
                {perfil.ok && <button onClick={() => setEditPerfil(false)}>←</button>}
                <h3>{perfil.ok ? 'Editar perfil' : 'Nuevo perfil'}</h3>
              </div>
              <div className="field"><label>Nombre completo</label><input placeholder="Ej: Juan Pérez" defaultValue={perfil.nombre} id="pf-nombre" /></div>
              <div className="field"><label>RUT</label><input placeholder="12.345.678-9" defaultValue={perfil.rut} id="pf-rut" /></div>
              <div className="field"><label>Teléfono</label><input type="tel" placeholder="+569 XXXX XXXX" defaultValue={perfil.telefono} id="pf-tel" /></div>
              <div className="field"><label>Fecha de nacimiento</label><input type="date" defaultValue={perfil.nacimiento} id="pf-nac" /></div>
              <div className="section-title">Mi estilo de juego</div>
              <div className="field">
                <label>Estilo</label>
                <select value={perfil.estilo} onChange={e => setPerfil({...perfil, estilo: e.target.value})}>
                  <option value="">-- Elige --</option>
                  <option>Derecha</option><option>Zurdo</option><option>Baseline</option>
                  <option>Red</option><option>Agresivo</option><option>Defensor</option><option>Todo terreno</option>
                </select>
              </div>
              <div className="field">
                <label>Golpe favorito</label>
                <select value={perfil.golpe} onChange={e => setPerfil({...perfil, golpe: e.target.value})}>
                  <option value="">-- Elige --</option>
                  <option>Derecha</option><option>Revés</option><option>Saque</option>
                  <option>Volea</option><option>Smash</option><option>Drop shot</option><option>Globo</option>
                </select>
              </div>
              <div className="field">
                <label>Superficie preferida</label>
                <select value={perfil.superficie} onChange={e => setPerfil({...perfil, superficie: e.target.value})}>
                  <option value="">-- Elige --</option>
                  <option>Arcilla</option><option>Cemento</option><option>Hierba</option><option>Dura</option>
                </select>
              </div>
              <button className="btn" onClick={() => {
                const nombre = (document.getElementById('pf-nombre') as HTMLInputElement)?.value || perfil.nombre;
                const rut = (document.getElementById('pf-rut') as HTMLInputElement)?.value || perfil.rut;
                const tel = (document.getElementById('pf-tel') as HTMLInputElement)?.value || perfil.telefono;
                const nac = (document.getElementById('pf-nac') as HTMLInputElement)?.value || perfil.nacimiento;
                savePerfil({...perfil, nombre, rut, telefono: tel, nacimiento: nac, ok: true});
                setEditPerfil(false);
                showToast('✅ Perfil guardado');
              }}>Guardar perfil</button>
            </>
          )}

          {/* Perfil completo */}
          {perfil.ok && !editPerfil && (<>
            <div className="perfil-header">
              <div className="perfil-top">
                <div className="perfil-av" style={{ background: avatarColor(perfil.nombre || 'U') }}>{initials(perfil.nombre || 'Usuario')}</div>
                <div style={{ flex: 1 }}>
                  <div className="perfil-name">{perfil.nombre}</div>
                  <div className="perfil-sub">RUT: {perfil.rut || '—'}</div>
                  <div className="perfil-sub">{perfil.telefono || '—'}</div>
                  <span className={`socio-badge ${perfil.socio ? 'activo' : 'inactivo'}`}>{perfil.socio ? '✓ SOCIO ACTIVO' : 'Sin membresía'}</span>
                </div>
                <button onClick={() => setEditPerfil(true)} style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: 'var(--suave)' }}>✏️</button>
              </div>
              {(perfil.estilo || perfil.golpe || perfil.superficie) && (
                <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {perfil.estilo && <span className="cupos" style={{ fontSize: 11 }}>{perfil.estilo}</span>}
                  {perfil.golpe && <span className="cupos" style={{ fontSize: 11 }}>🎯 {perfil.golpe}</span>}
                  {perfil.superficie && <span className="cupos" style={{ fontSize: 11 }}>🎾 {perfil.superficie}</span>}
                </div>
              )}
            </div>

            <div className="section-title">Mis últimos partidos</div>
            {partidos.length === 0
              ? <div className="aviso" style={{ fontSize: 12 }}>Aún no tienes partidos registrados. ¡Registra tu primer partido!</div>
              : partidos.slice(-5).reverse().map((p,i) => (
                <div key={i} className="match-row">
                  <div><div className="mr-rival">vs {p.rival}</div><div className="mr-res">{p.fecha} · {p.resultado}</div></div>
                  <span className={`badge ${p.ganado?'win':'loss'}`}>{p.ganado?'Victoria':'Derrota'}</span>
                </div>
              ))
            }
            <button className="btn" style={{ marginBottom: 14 }} onClick={() => openModal("partido")}>+ Registrar partido</button>

            {pendientes.length > 0 && (<>
              <div className="section-title">Partidos pendientes de confirmación</div>
              {pendientes.map(p => (
                <div key={p.id} className="pend-card">
                  <div className="pc-title">vs {p.rival}</div>
                  <div style={{ fontSize: 12, color: 'var(--suave)', marginTop: 2 }}>{p.fecha} · {p.resultado}</div>
                  <div className="pc-btns">
                    <button className="pc-ok" onClick={() => {
                      setPartidos(prev => [...prev, {rival: p.rival, fecha: p.fecha, resultado: p.resultado, ganado: true}]);
                      setPendientes(prev => prev.filter(x => x.id !== p.id));
                      showToast('✅ Partido confirmado');
                    }}>✓ Confirmar victoria</button>
                    <button className="pc-no" onClick={() => {
                      setPartidos(prev => [...prev, {rival: p.rival, fecha: p.fecha, resultado: p.resultado, ganado: false}]);
                      setPendientes(prev => prev.filter(x => x.id !== p.id));
                      showToast('Partido registrado');
                    }}>✗ Marcar derrota</button>
                  </div>
                </div>
              ))}
            </>)}

            <div className="section-title">Mis próximas reservas</div>
            {reservas.length === 0
              ? <div style={{ fontSize: 13, color: 'var(--suave)', marginBottom: 14 }}>No tienes reservas próximas.</div>
              : reservas.map((r,i) => (
                <div key={i} className="res-card">
                  <div className="rc-title">📅 {r.fecha}</div>
                  <div className="rc-sub">⏰ {r.hora} · {r.dur}hr · {r.cancha}</div>
                </div>
              ))
            }
            <button className="btn sec" onClick={() => setScreen('canchas')}>📅 Reservar cancha</button>

            <div className="section-title">Membresía</div>
            <button className="btn dark" onClick={() => {
              savePerfil({...perfil, socio: !perfil.socio});
              showToast(perfil.socio ? 'Membresía desactivada' : '✅ ¡Bienvenido SOCIO PlayTenis!');
            }}>{perfil.socio ? '✓ Membresía activa · Renovar' : '🏆 Activar Membresía PlayTenis'}</button>
            <p className="foot">@playtenis.cl · +56 9 8158 8218</p>
          </>)}
        </section>
      </div>

      {/* Tab Bar */}
      <div className="tabbar">
        {[["inicio","🏠","Inicio"],["ranking","🏆","Ranking"],["torneos","🎯","Torneos"],["canchas","📅","Cancha"],["academia","🎾","Academia"],["perfil","👤","Perfil"]].map(([s,ic,lb]) => (
          <button key={s} className={`tab ${screen === s ? "active" : ""}`} onClick={() => { setScreen(s); if (s !== 'canchas') setCanchaStep('calendar'); }}>
            <span className="ic">{ic}</span>{lb}
          </button>
        ))}
      </div>

      {/* Modal */}
      {modal && (
        <div className="modal show" onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
          <div className="sheet">
            {modal.tipo === "torneo" && modal.idx !== undefined && (<>
              <h3>Inscripción · {torneos[modal.idx].n}</h3>
              <div className="field"><label>Tu nombre</label><input placeholder="Ej: Juan Pérez" /></div>
              <div className="field"><label>Teléfono</label><input type="tel" placeholder="+569 XXXX XXXX" /></div>
              <div className="pagobox">
                <h4>💳 Datos de pago</h4>
                <div className="row"><span className="k">Nombre</span><span className="v">{PAGO.nombre}</span></div>
                <div className="row"><span className="k">Banco</span><span className="v">{PAGO.banco}</span></div>
                <div className="row"><span className="k">Monto</span><span className="v" style={{ color: "var(--naranja-osc)", fontSize: 16 }}>${torneos[modal.idx].monto.toLocaleString("es-CL")}</span></div>
              </div>
              <button className="btn wa" onClick={() => { closeModal(); window.open(waUrl(`Hola PlayTenis! Quiero inscribirme en: ${torneos[modal.idx!].n}`), "_blank"); }}>💬 Confirmar por WhatsApp</button>
              <button className="btn sec" style={{ marginTop: 8 }} onClick={closeModal}>Cancelar</button>
            </>)}
            {modal.tipo === "cancha" && (<>
              <h3>Reservar cancha</h3>
              <div className="field"><label>Fecha</label><input type="date" defaultValue={new Date().toISOString().split("T")[0]} /></div>
              <div className="field"><label>Hora</label><select>{Array.from({length:14},(_,i)=>i+9).map(h=><option key={h}>{String(h).padStart(2,"0")}:00</option>)}</select></div>
              <div className="field"><label>Duración</label><select><option>1 hora · $15.000</option><option>2 horas · $25.000</option></select></div>
              <div className="field"><label>Tu nombre</label><input placeholder="Ej: Juan Pérez" /></div>
              <button className="btn wa" onClick={() => { closeModal(); showToast("✅ Reserva enviada"); window.open(`https://wa.me/${WA}`, "_blank"); }}>💬 Confirmar por WhatsApp</button>
              <button className="btn sec" style={{ marginTop: 8 }} onClick={closeModal}>Cancelar</button>
            </>)}
            {modal.tipo === "partido" && (<>
              <h3>Registrar partido</h3>
              <div className="field"><label>Oponente</label><select>{jugadores.map((p,i)=><option key={i}>{p[0] as string}</option>)}</select></div>
              <div className="field"><label>Fecha</label><input type="date" defaultValue={new Date().toISOString().split("T")[0]} /></div>
              <div className="field"><label>Resultado</label><input placeholder="Ej: 6-3, 7-5" /></div>
              <button className="btn" onClick={() => {
                const rivalEl = document.querySelector('.sheet select') as HTMLSelectElement;
                const resEl = document.querySelector('.sheet input[placeholder="Ej: 6-3, 7-5"]') as HTMLInputElement;
                const rival = rivalEl?.value || 'Rival';
                const resultado = resEl?.value || '';
                const ganado = resultado.length > 0 && parseInt(resultado[0]) > parseInt(resultado[resultado.indexOf('-')+1] || '0');
                setPartidos(prev => [...prev, {rival, fecha: new Date().toLocaleDateString('es-CL'), resultado, ganado}]);
                closeModal();
                showToast("✅ Partido registrado");
              }}>Guardar</button>
              <button className="btn sec" style={{ marginTop: 8 }} onClick={closeModal}>Cancelar</button>
            </>)}
            {modal.tipo === "clase" && (<>
              <h3>Inscripción · Academia PlayTenis</h3>
              <div className="field"><label>Nombre</label><input placeholder="Ej: Juan Pérez" /></div>
              <div className="field"><label>Teléfono</label><input type="tel" placeholder="+569 XXXX XXXX" /></div>
              <div className="field"><label>Programa</label><select><option>Kinder Tenis</option><option>Niños · Grupal</option><option>Adultos · Grupal</option><option>Individual</option><option>Escalerilla</option></select></div>
              <button className="btn wa" onClick={() => { closeModal(); window.open(waUrl("Hola PlayTenis! Quiero agendar mi clase de prueba GRATIS."), "_blank"); }}>💬 Agendar clase GRATIS</button>
              <button className="btn sec" style={{ marginTop: 8 }} onClick={closeModal}>Cancelar</button>
            </>)}
          </div>
        </div>
      )}
      <div className={`toast ${toastVisible ? "show" : ""}`}>{toast}</div>
    </div>
  );
}
