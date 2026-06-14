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

  function showToast(msg: string) { setToast(msg); setToastVisible(true); setTimeout(() => setToastVisible(false), 2800); }
  function openModal(tipo: string, idx?: number) { setModal({ tipo, idx }); }
  function closeModal() { setModal(null); }
  const maxPts = Math.max(...jugadores.map(p => p[1] as number));
  const waUrl = (msg: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

  return (
    <div className="phone">
      <header>
        <Image src="/logo.jpeg" alt="PlayTenis" width={44} height={44} style={{ borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
        <div><h1>PlayTenis · Chicureo</h1><p>Tenis · Clases y Arriendos · Colina 🇨🇱</p></div>
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
          <div className="section-title">Arriendo de canchas</div>
          <div className="aviso">🎾 <strong>Solo zapatillas de arcilla.</strong> Reprogramación con 24 hrs.</div>
          <div className="infobox">
            <div className="hrow"><span className="dia">Lunes a Jueves</span><span className="hrs">09:00 – 23:00</span></div>
            <div className="hrow"><span className="dia">Viernes</span><span className="hrs">09:00 – 22:00</span></div>
            <div className="hrow"><span className="dia">Sábado</span><span className="hrs">09:00 – 21:00</span></div>
            <div className="hrow"><span className="dia">Domingo</span><span className="hrs">08:00 – 22:00</span></div>
          </div>
          <div className="infobox">
            <div className="hrow"><span className="dia">1 hora</span><span className="hrs">$15.000</span></div>
            <div className="hrow"><span className="dia">2 horas</span><span className="hrs">$25.000</span></div>
          </div>
          <button className="btn" onClick={() => openModal("cancha")}>📅 Reservar cancha</button>
          <button className="btn wa" style={{ marginTop: 8 }} onClick={() => window.open(`https://wa.me/${WA}`, "_blank")}>💬 WhatsApp PlayTenis</button>
          <p className="foot">San Vicente de Lo Arcaya 1, Colina</p>
        </section>

        {/* ACADEMIA */}
        <section className={`screen ${screen === "academia" ? "active" : ""}`}>
          <div className="section-title">Director Deportivo</div>
          <div className="infobox" style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div className="avatar" style={{ background: "#0288D1", width: 52, height: 52, fontSize: 18, flexShrink: 0 }}>PE</div>
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
      </div>

      {/* Tab Bar */}
      <div className="tabbar">
        {[["inicio","🏠","Inicio"],["ranking","🏆","Ranking"],["torneos","🎯","Torneos"],["canchas","📅","Cancha"],["academia","🎾","Academia"]].map(([s,ic,lb]) => (
          <button key={s} className={`tab ${screen === s ? "active" : ""}`} onClick={() => setScreen(s)}>
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
              <button className="btn" onClick={() => { closeModal(); showToast("✅ Partido registrado"); }}>Guardar</button>
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
