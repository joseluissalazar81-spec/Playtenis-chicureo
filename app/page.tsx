"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const WA = "56981588218";
const PAGO = { nombre: "Patricio Escalona", banco: "Transferencia / Mercado Pago", email: "info@playtenis.cl" };

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

const features = [
  { icon: "👶", title: "Kinder Tenis", description: "Para quienes inician su vida en este hermoso mundo. Una experiencia extraordinaria para los más pequeños." },
  { icon: "👥", title: "Clases Grupales", description: "Para niños y adultos. Técnica, diversión y comunidad. 1 clase de prueba GRATIS para nuevos alumnos." },
  { icon: "🎾", title: "Clases Individuales", description: "Horario a convenir con Patricio Escalona, Director Deportivo del club." },
  { icon: "🏆", title: "Escalerilla y Torneos", description: "Ranking interno, Copa TD y torneos durante todo el año. ¡Compite y mejora tu nivel!" },
];

const plans = [
  { name: "Básico", price: "$85.000", period: "/ mes", features: ["2 horas de cancha por semana", "Acceso a camarines", "Descuento 10% en clases", "Newsletter del club"], highlight: false },
  { name: "Premium", price: "$145.000", period: "/ mes", features: ["Canchas ilimitadas", "1 clase grupal semanal", "Escalerilla incluida", "Prioridad en torneos", "Clase de prueba GRATIS"], highlight: true },
  { name: "Familiar", price: "$220.000", period: "/ mes", features: ["Todo lo de Premium", "Hasta 4 integrantes", "Kinder Tenis incluido", "Eventos familiares"], highlight: false },
];

const avatarColors = ["#e74c3c","#e67e22","#f39c12","#2ecc71","#1abc9c","#3498db","#9b59b6","#e91e63"];
function initials(n: string) { return n.split(" ").slice(0, 2).map((x: string) => x[0]).join("").toUpperCase(); }
function avatarColor(n: string) { let h = 0; for (const c of n) h = (h * 31 + c.charCodeAt(0)) % avatarColors.length; return avatarColors[h]; }

type ModalData = { tipo: string; idx?: number } | null;

export default function App() {
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
    <>
      {/* MÓVIL */}
      <div className="mobile-only phone">
        <header>
          <Image src="/logo.jpeg" alt="PlayTenis" width={44} height={44} style={{ borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
          <div><h1>PlayTenis · Chicureo</h1><p>Tenis · Clases y Arriendos · Colina 🇨🇱</p></div>
        </header>
        <div className="content">
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

          <section className={`screen ${screen === "academia" ? "active" : ""}`}>
            <div className="section-title">Director Deportivo</div>
            <div className="infobox" style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div className="avatar" style={{ background: "#E8450A", width: 52, height: 52, fontSize: 18, flexShrink: 0 }}>PE</div>
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

        <div className="tabbar">
          {[["inicio","🏠","Inicio"],["ranking","🏆","Ranking"],["torneos","🎯","Torneos"],["canchas","📅","Cancha"],["academia","🎾","Academia"]].map(([s,ic,lb]) => (
            <button key={s} className={`tab ${screen === s ? "active" : ""}`} onClick={() => setScreen(s)}>
              <span className="ic">{ic}</span>{lb}
            </button>
          ))}
        </div>

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
                  <div className="row"><span className="k">Monto</span><span className="v" style={{ color: "var(--naranja-osc)", fontSize: 16 }}>${(torneos[modal.idx].monto).toLocaleString("es-CL")}</span></div>
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

      {/* DESKTOP */}
      <div className="desktop-only">
        <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(45,45,45,0.96)", backdropFilter: "blur(8px)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Image src="/logo.jpeg" alt="PlayTenis" width={44} height={44} style={{ borderRadius: "50%" }} />
              <div><div style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>PlayTenis</div><div style={{ color: "#E8450A", fontSize: 11, fontWeight: 600, letterSpacing: 1 }}>CHICUREO · COLINA</div></div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {[["#nosotros","Nosotros"],["#clases","Clases"],["#torneos","Torneos"],["#contacto","Contacto"]].map(([h,l]) => (
                <a key={h} href={h} style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none", padding: "8px 14px", borderRadius: 8, fontSize: 14, fontWeight: 500 }}>{l}</a>
              ))}
              <a href={waUrl("Hola! Quiero reservar una cancha en PlayTenis Chicureo.")} target="_blank" style={{ background: "#E8450A", color: "#fff", padding: "10px 20px", borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: "none", marginLeft: 8 }}>Reservar</a>
            </div>
          </div>
        </nav>

        <section style={{ minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #1a1a1a 0%, #2D2D2D 50%, #b33408 100%)", position: "relative", overflow: "hidden", paddingTop: 64 }}>
          <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 16px", maxWidth: 900, margin: "0 auto" }}>
            <Image src="/logo.jpeg" alt="PlayTenis" width={140} height={140} style={{ borderRadius: "50%", boxShadow: "0 8px 40px rgba(0,0,0,0.4)", border: "4px solid rgba(255,255,255,0.2)", marginBottom: 32 }} />
            <h1 style={{ fontSize: "clamp(48px,8vw,88px)", fontWeight: 900, color: "#fff", lineHeight: 1.05, marginBottom: 24 }}>
              Play<span style={{ color: "#E8450A" }}>Tenis</span><br />
              <span style={{ fontSize: "clamp(24px,4vw,44px)", fontWeight: 300, color: "rgba(255,255,255,0.8)" }}>Chicureo · Colina</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 20, maxWidth: 600, margin: "0 auto 40px", lineHeight: 1.6 }}>
              No solo enseñamos a golpear la pelota,<br />enseñamos a amar el juego y disfrutar del proceso 🎾
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
              <a href={waUrl("Hola! Quiero reservar una cancha en PlayTenis Chicureo.")} target="_blank" style={{ background: "#E8450A", color: "#fff", padding: "16px 36px", borderRadius: 14, fontWeight: 700, fontSize: 18, textDecoration: "none" }}>Reservar Cancha</a>
              <a href={waUrl("Hola! Quiero agendar mi clase de prueba GRATIS en PlayTenis.")} target="_blank" style={{ border: "2px solid #fff", color: "#fff", padding: "16px 36px", borderRadius: 14, fontWeight: 700, fontSize: 18, textDecoration: "none" }}>Clase GRATIS 🎾</a>
            </div>
          </div>
        </section>

        <section style={{ background: "#f9fafb", padding: "48px 32px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, textAlign: "center" }}>
            {[["500+","Socios"],["8","Canchas"],["917","Publicaciones IG"],["5.900+","Seguidores"]].map(([v,l]) => (
              <div key={l}><div style={{ fontSize: 48, fontWeight: 900, color: "#E8450A" }}>{v}</div><div style={{ color: "#6b7280", fontSize: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{l}</div></div>
            ))}
          </div>
        </section>

        <section id="nosotros" style={{ padding: "80px 32px", background: "#fff" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
            <div>
              <span style={{ color: "#E8450A", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: 2 }}>Sobre Nosotros</span>
              <h2 style={{ fontSize: 40, fontWeight: 900, color: "#2D2D2D", marginTop: 8, marginBottom: 16 }}>El Tenis en su Máxima Expresión</h2>
              <p style={{ color: "#4b5563", lineHeight: 1.8, marginBottom: 16 }}>PlayTenis Chicureo es una academia ubicada en <strong>San Vicente de Lo Arcaya 1, Colina</strong>. Dirigida por <strong>Patricio Escalona</strong>, Director Deportivo con amplia trayectoria en el tenis chileno.</p>
              <p style={{ color: "#4b5563", lineHeight: 1.8, marginBottom: 32 }}>Clases grupales, individuales, Kinder Tenis, escalerilla y torneos. <strong>1 clase de prueba GRATIS</strong> para nuevos alumnos.</p>
              <a href={waUrl("Hola! Quiero más información sobre PlayTenis Chicureo.")} target="_blank" style={{ background: "#E8450A", color: "#fff", padding: "14px 28px", borderRadius: 12, fontWeight: 700, fontSize: 16, textDecoration: "none" }}>Contáctanos</a>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[["🎾","Kinder Tenis","Desde los más pequeños"],["🏆","Copa TD","Torneos nacionales"],["👥","Comunidad","+5.900 seguidores"],["📅","Arriendos","Reserva por WhatsApp"]].map(([ic,t,d]) => (
                <div key={t} style={{ background: "#fde8e0", borderRadius: 20, padding: 24, textAlign: "center" }}>
                  <div style={{ fontSize: 36, marginBottom: 8 }}>{ic}</div>
                  <div style={{ fontWeight: 700, color: "#2D2D2D" }}>{t}</div>
                  <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="clases" style={{ padding: "80px 32px", background: "#f9fafb" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
            <span style={{ color: "#E8450A", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: 2 }}>Academia</span>
            <h2 style={{ fontSize: 40, fontWeight: 900, color: "#2D2D2D", marginTop: 8, marginBottom: 12 }}>Clases para Todos</h2>
            <p style={{ color: "#6b7280", fontSize: 18, marginBottom: 48 }}>1 clase de prueba GRATIS · Agenda al +56 9 8158 8218</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
              {features.map(f => (
                <div key={f.title} style={{ background: "#fff", borderRadius: 20, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", textAlign: "left" }}>
                  <div style={{ fontSize: 40, marginBottom: 16 }}>{f.icon}</div>
                  <h3 style={{ fontWeight: 800, color: "#2D2D2D", fontSize: 18, marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.6 }}>{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="torneos" style={{ padding: "80px 32px", background: "#fff" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
            <span style={{ color: "#E8450A", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: 2 }}>Torneos</span>
            <h2 style={{ fontSize: 40, fontWeight: 900, color: "#2D2D2D", marginTop: 8, marginBottom: 48 }}>Inscripciones Abiertas</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
              {torneos.map((t, i) => (
                <div key={i} style={{ background: "#f9fafb", borderRadius: 20, padding: 28, borderLeft: "5px solid #E8450A", textAlign: "left" }}>
                  <h3 style={{ fontWeight: 800, fontSize: 20, color: "#2D2D2D", marginBottom: 8 }}>{t.n}</h3>
                  <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 16 }}>{t.f}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontWeight: 800, color: "#b33408", fontSize: 20 }}>{t.p}</span>
                    <span style={{ background: "#fde8e0", color: "#b33408", fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>{t.c}</span>
                    <a href={waUrl(`Hola! Quiero inscribirme en: ${t.n}`)} target="_blank" style={{ background: "#25d366", color: "#fff", padding: "8px 16px", borderRadius: 20, fontSize: 13, fontWeight: 700, textDecoration: "none", marginLeft: "auto" }}>💬 Inscribirme</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: "80px 32px", background: "#f9fafb" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
            <span style={{ color: "#E8450A", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: 2 }}>Membresías</span>
            <h2 style={{ fontSize: 40, fontWeight: 900, color: "#2D2D2D", marginTop: 8, marginBottom: 48 }}>Planes para Todos</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, maxWidth: 1000, margin: "0 auto" }}>
              {plans.map(plan => (
                <div key={plan.name} style={{ background: plan.highlight ? "#E8450A" : "#fff", borderRadius: 20, padding: 32, transform: plan.highlight ? "scale(1.05)" : "none", boxShadow: plan.highlight ? "0 12px 40px rgba(232,69,10,0.3)" : "0 2px 12px rgba(0,0,0,0.06)", position: "relative" }}>
                  {plan.highlight && <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "#2D2D2D", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 16px", borderRadius: 20 }}>MÁS POPULAR</div>}
                  <h3 style={{ fontSize: 22, fontWeight: 800, color: plan.highlight ? "#fff" : "#2D2D2D", marginBottom: 8 }}>{plan.name}</h3>
                  <div style={{ marginBottom: 24 }}><span style={{ fontSize: 44, fontWeight: 900, color: plan.highlight ? "#fff" : "#2D2D2D" }}>{plan.price}</span><span style={{ color: plan.highlight ? "rgba(255,255,255,0.7)" : "#6b7280", fontSize: 14 }}>{plan.period}</span></div>
                  <ul style={{ listStyle: "none", marginBottom: 28, textAlign: "left", padding: 0 }}>
                    {plan.features.map(f => <li key={f} style={{ display: "flex", gap: 8, marginBottom: 10, fontSize: 14, color: plan.highlight ? "rgba(255,255,255,0.9)" : "#4b5563" }}><span style={{ color: plan.highlight ? "#fff" : "#E8450A" }}>✓</span>{f}</li>)}
                  </ul>
                  <a href={waUrl(`Hola! Me interesa el plan ${plan.name} de PlayTenis Chicureo.`)} target="_blank" style={{ display: "block", textAlign: "center", padding: "14px", borderRadius: 12, fontWeight: 700, fontSize: 16, textDecoration: "none", background: plan.highlight ? "#2D2D2D" : "#E8450A", color: "#fff" }}>Comenzar</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contacto" style={{ padding: "80px 32px", background: "#fff" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
            <div>
              <span style={{ color: "#E8450A", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: 2 }}>Contacto</span>
              <h2 style={{ fontSize: 40, fontWeight: 900, color: "#2D2D2D", marginTop: 8, marginBottom: 24 }}>Encuéntranos en Colina</h2>
              {[["📍","Dirección","San Vicente de Lo Arcaya 1, Colina"],["📞","Teléfono","+56 9 8158 8218 (Patricio Escalona)"],["📱","Instagram","@playtenis.cl"],["🕐","Horario","Lun a Dom: 09:00 – 23:00"]].map(([ic,t,d]) => (
                <div key={t} style={{ display: "flex", gap: 16, marginBottom: 20, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 24 }}>{ic}</span>
                  <div><div style={{ fontWeight: 700, color: "#2D2D2D" }}>{t}</div><div style={{ color: "#6b7280" }}>{d}</div></div>
                </div>
              ))}
            </div>
            <div style={{ background: "#fde8e0", borderRadius: 20, padding: 40, textAlign: "center" }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>🎾</div>
              <h3 style={{ fontSize: 24, fontWeight: 800, color: "#2D2D2D", marginBottom: 12 }}>¿Listo para jugar?</h3>
              <p style={{ color: "#4b5563", marginBottom: 24 }}>1 clase de prueba GRATIS esperándote en Chicureo, Colina.</p>
              <a href={waUrl("Hola! Quiero agendar mi clase de prueba GRATIS en PlayTenis.")} target="_blank" style={{ display: "inline-block", background: "#25d366", color: "#fff", padding: "14px 28px", borderRadius: 14, fontWeight: 700, fontSize: 16, textDecoration: "none" }}>💬 Agendar clase GRATIS</a>
            </div>
          </div>
        </section>

        <footer style={{ background: "#2D2D2D", color: "#fff", padding: "48px 32px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Image src="/logo.jpeg" alt="PlayTenis" width={44} height={44} style={{ borderRadius: "50%" }} />
              <div><div style={{ fontWeight: 800, fontSize: 16 }}>PlayTenis Chicureo</div><div style={{ color: "#E8450A", fontSize: 12 }}>San Vicente de Lo Arcaya 1, Colina</div></div>
            </div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>© 2026 PlayTenis Chicureo · @playtenis.cl</div>
          </div>
        </footer>
      </div>
    </>
  );
}
