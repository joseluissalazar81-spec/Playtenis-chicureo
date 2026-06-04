"use client";
import Image from "next/image";
import { useState } from "react";

const PAGO = {
  nombre: "Patricio Escalona",
  banco: "Transferencia / Mercado Pago",
  email: "info@playtenis.cl",
};

const jugadores = [
  ["Carlos Muñoz", 72, 15, 14, 1, 93.3],
  ["Rodrigo Vega", 65, 14, 12, 2, 85.7],
  ["Andrés Torres", 58, 13, 11, 2, 84.6],
  ["Felipe Rivas", 52, 12, 10, 2, 83.3],
  ["Matías Cortés", 48, 11, 9, 2, 81.8],
  ["Sebastián Núñez", 43, 10, 8, 2, 80.0],
  ["Pablo Herrera", 38, 12, 7, 5, 58.3],
  ["Diego Soto", 35, 10, 6, 4, 60.0],
  ["Javier Pinto", 30, 9, 5, 4, 55.6],
  ["Nicolás Lagos", 25, 8, 4, 4, 50.0],
];

const torneos = [
  { n: "Torneo Apertura Chicureo 🏆", f: "15 julio 2026 · 16:00 y 18:00", p: "$25.000", c: "8 cupos", monto: 25000 },
  { n: "Copa PlayTenis Verano", f: "20 agosto 2026 · Desde las 10:00", p: "$20.000", c: "12 cupos", monto: 20000 },
  { n: "Escalerilla Jul–Sep 2026 🎾", f: "Partidos durante el trimestre", p: "$30.000", c: "5 cupos", monto: 30000 },
];

const avatarColors = ["#e74c3c","#e67e22","#f39c12","#2ecc71","#1abc9c","#3498db","#9b59b6","#e91e63","#00bcd4","#4caf50"];

function initials(n: string) {
  return n.split(" ").slice(0, 2).map((x: string) => x[0]).join("").toUpperCase();
}
function avatarColor(n: string) {
  let h = 0;
  for (const c of n) h = (h * 31 + c.charCodeAt(0)) % avatarColors.length;
  return avatarColors[h];
}

type ModalData = { tipo: string; idx?: number } | null;

export default function App() {
  const [screen, setScreen] = useState("inicio");
  const [modal, setModal] = useState<ModalData>(null);
  const [toast, setToast] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  function showToast(msg: string) {
    setToast(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2800);
  }

  function go(s: string) {
    setScreen(s);
  }

  function openModal(tipo: string, idx?: number) {
    setModal({ tipo, idx });
  }

  function closeModal() {
    setModal(null);
  }

  const maxPts = Math.max(...jugadores.map(p => p[1] as number));

  return (
    <div className="phone">
      {/* Header */}
      <header>
        <Image src="/logo.jpeg" alt="PlayTenis" width={44} height={44} style={{ borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
        <div>
          <h1>PlayTenis · Chicureo</h1>
          <p>Academia de Tenis · Lo Barnechea 🇨🇱</p>
        </div>
      </header>

      {/* Content */}
      <div className="content">

        {/* INICIO */}
        <section className={`screen ${screen === "inicio" ? "active" : ""}`} id="inicio">
          <div className="hero">
            <div className="ball" />
            <h2>¡Tu pasión,<br />nuestro compromiso!</h2>
            <p>Academia, reservas y torneos en un solo lugar.</p>
          </div>
          <div className="grid2">
            <button className="acc" onClick={() => go("ranking")}><div className="ic">🏆</div><div className="t">Ranking</div><div className="s">Posiciones del club</div></button>
            <button className="acc" onClick={() => go("torneos")}><div className="ic">🎯</div><div className="t">Torneos</div><div className="s">Inscríbete ahora</div></button>
            <button className="acc" onClick={() => go("canchas")}><div className="ic">📅</div><div className="t">Reservar cancha</div><div className="s">Elige tu horario</div></button>
            <button className="acc" onClick={() => go("academia")}><div className="ic">🎾</div><div className="t">Academia</div><div className="s">Clases y servicios</div></button>
          </div>
          <div className="aviso">⚠️ <strong>Solo zapatillas de arcilla</strong> en las canchas.</div>
          <div className="stats">
            <div className="stat"><div className="n">8</div><div className="l">Canchas</div></div>
            <div className="stat"><div className="n">500+</div><div className="l">Socios</div></div>
            <div className="stat"><div className="n">20+</div><div className="l">Torneos/año</div></div>
          </div>
          <div className="section-title">Próximo torneo</div>
          <div className="tcard">
            <div className="tn">Torneo Apertura Chicureo 🏆</div>
            <div className="tm">15 julio 2026 · turnos 16:00 y 18:00</div>
            <div className="trow">
              <span className="price">$25.000</span>
              <span className="cupos">8 cupos</span>
              <button className="mini" onClick={() => go("torneos")}>Ver más</button>
            </div>
          </div>
        </section>

        {/* RANKING */}
        <section className={`screen ${screen === "ranking" ? "active" : ""}`} id="ranking">
          <div className="mycard">
            <div className="pos">Líder · Escalerilla Jun–Ago 2026</div>
            <div className="name">#1 · Carlos Muñoz</div>
            <div className="row">
              <div><span className="big">72</span><span className="cap">Puntos</span></div>
              <div><span className="big">15</span><span className="cap">Jugados</span></div>
              <div><span className="big">93.3%</span><span className="cap">Rendimiento</span></div>
            </div>
          </div>
          <button className="btn" onClick={() => openModal("partido")}>+ Registrar partido</button>
          <div className="section-title">Ranking del club</div>
          {jugadores.map((p, i) => {
            const cls = i === 0 ? "top1" : i === 1 ? "top2" : i === 2 ? "top3" : "";
            const col = avatarColor(p[0] as string);
            const ini = initials(p[0] as string);
            const pct = Math.round(((p[1] as number) / maxPts) * 100);
            return (
              <div key={i} className={`rank-item ${cls}`}>
                <div className="rank-pos">{i + 1}</div>
                <div className="avatar" style={{ background: col }}>{ini}</div>
                <div className="rank-info">
                  <div className="nm">{p[0] as string}</div>
                  <div className="sub">{p[3] as number}G · {p[4] as number}P · {p[2] as number} jugados</div>
                  <div className="bar"><i style={{ width: `${pct}%` }} /></div>
                </div>
                <div className="rank-pts">
                  <div className="p">{p[1] as number}</div>
                  <div className="pct">{p[5] as number}%</div>
                </div>
              </div>
            );
          })}
          <p className="foot">PlayTenis Chicureo · Academia de Tenis 🎾</p>
        </section>

        {/* TORNEOS */}
        <section className={`screen ${screen === "torneos" ? "active" : ""}`} id="torneos">
          <div className="section-title">Inscripciones abiertas</div>
          {torneos.map((t, i) => (
            <div key={i} className="tcard">
              <div className="tn">{t.n}</div>
              <div className="tm">{t.f}</div>
              <div className="trow">
                <span className="price">{t.p}</span>
                <span className="cupos">{t.c}</span>
                <button className="mini wa" onClick={() => openModal("torneo", i)}>Inscribirme</button>
              </div>
            </div>
          ))}
          <div className="section-title">Jugadores inscritos · Apertura</div>
          {["Carlos Muñoz","Rodrigo Vega","Andrés Torres","Felipe Rivas"].map((n, i) => (
            <div key={i} className="lcard">
              <div className="avatar" style={{ background: avatarColor(n), width: 32, height: 32, fontSize: 12, flexShrink: 0 }}>{initials(n)}</div>
              <div style={{ flex: 1 }}><div className="nm">{n}</div></div>
              <span style={{ fontSize: 18 }}>✅</span>
            </div>
          ))}
          {[5,6,7,8].map(i => (
            <div key={i} className="lcard">
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--gris)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "var(--suave)" }}>{i}</div>
              <div style={{ flex: 1 }}><div className="ds">Cupo disponible</div></div>
              <button className="mini" onClick={() => openModal("torneo", 0)}>Unirme</button>
            </div>
          ))}
        </section>

        {/* CANCHAS */}
        <section className={`screen ${screen === "canchas" ? "active" : ""}`} id="canchas">
          <div className="section-title">Reserva de canchas</div>
          <div className="aviso">🎾 <strong>Solo zapatillas de arcilla.</strong> Reprogramación con 24 hrs de anticipación.</div>
          <div className="infobox">
            <div className="hrow"><span className="dia">Lunes a Jueves</span><span className="hrs">09:00 – 23:00</span></div>
            <div className="hrow"><span className="dia">Viernes</span><span className="hrs">09:00 – 22:00</span></div>
            <div className="hrow"><span className="dia">Sábado</span><span className="hrs">09:00 – 21:00</span></div>
            <div className="hrow"><span className="dia">Domingo</span><span className="hrs">08:00 – 22:00</span></div>
          </div>
          <div className="infobox">
            <div className="hrow"><span className="dia">1 hora</span><span className="hrs">$15.000</span></div>
            <div className="hrow"><span className="dia">2 horas</span><span className="hrs">$25.000</span></div>
            <div className="hrow"><span className="dia">Socio Premium</span><span className="hrs">Descuento 20%</span></div>
          </div>
          <div className="lcard">
            <div className="ic">🤝</div>
            <div style={{ flex: 1 }}>
              <div className="nm">¿No tienes con quién jugar?</div>
              <div className="ds">PlayTenis te busca rival de tu nivel</div>
            </div>
            <button className="mini wa" onClick={() => window.open("https://wa.me/56981588218?text=" + encodeURIComponent("Hola PlayTenis! Busco rival de mi nivel para jugar."), "_blank")}>Pedir rival</button>
          </div>
          <button className="btn" onClick={() => openModal("cancha")}>📅 Reservar cancha</button>
          <button className="btn wa" onClick={() => window.open("https://wa.me/56981588218", "_blank")}>💬 WhatsApp PlayTenis</button>
          <p className="foot">Av. Chicureo 1250, Lo Barnechea</p>
        </section>

        {/* ACADEMIA */}
        <section className={`screen ${screen === "academia" ? "active" : ""}`} id="academia">
          <div className="section-title">Nuestro Equipo</div>
          <div className="infobox" style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div className="avatar" style={{ background: "#E8450A", width: 52, height: 52, fontSize: 18, flexShrink: 0 }}>PT</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16 }}>Equipo PlayTenis</div>
                <div style={{ fontSize: 12, color: "var(--suave)" }}>Profesores certificados · Chicureo</div>
              </div>
            </div>
            <div className="section-title" style={{ marginTop: 4 }}>Certificaciones</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
              <span className="cupos">PTR Nivel 1</span>
              <span className="cupos">PTR Nivel 2</span>
              <span className="cupos">ITF Play & Stay</span>
              <span className="cupos">Alto Rendimiento</span>
            </div>
          </div>
          <div className="section-title">Academia · Todos los niveles</div>
          <div className="chips">
            <span className="chip" style={{ cursor: "pointer" }} onClick={() => openModal("nivel", 0)}>Iniciación</span>
            <span className="chip" style={{ cursor: "pointer" }} onClick={() => openModal("nivel", 1)}>Intermedio</span>
            <span className="chip" style={{ cursor: "pointer" }} onClick={() => openModal("nivel", 2)}>Avanzado</span>
            <span className="chip" style={{ cursor: "pointer" }} onClick={() => openModal("nivel", 3)}>Alto rendimiento</span>
          </div>
          <div className="lcard"><div className="ic">👶</div><div style={{ flex: 1 }}><div className="nm">Iniciación · 3 a 8 años</div><div className="ds">Sábados · grupales</div></div><button className="mini" onClick={() => openModal("clase")}>Inscribir</button></div>
          <div className="lcard"><div className="ic">👥</div><div style={{ flex: 1 }}><div className="nm">Clases grupales</div><div className="ds">Lun / Mié / Sáb</div></div><button className="mini" onClick={() => openModal("clase")}>Inscribir</button></div>
          <div className="lcard"><div className="ic">🎾</div><div style={{ flex: 1 }}><div className="nm">Clases individuales</div><div className="ds">Horario a convenir</div></div><button className="mini" onClick={() => openModal("clase")}>Inscribir</button></div>
          <div className="section-title">Servicios 🔧</div>
          <div className="lcard"><div className="ic">🛠️</div><div style={{ flex: 1 }}><div className="nm">Encordado profesional</div><div className="ds">Control · Potencia · Híbrido</div></div><button className="mini" onClick={() => openModal("encordado")}>Solicitar</button></div>
          <div className="lcard"><div className="ic">✊</div><div style={{ flex: 1 }}><div className="nm">Cambio de grip</div><div className="ds">Mayor comodidad y agarre</div></div><button className="mini" onClick={() => openModal("encordado")}>Solicitar</button></div>
          <p className="foot">@PlayTenis_Chicureo · Lo Barnechea, Santiago</p>
        </section>

      </div>

      {/* Tab Bar */}
      <div className="tabbar">
        <button className={`tab ${screen === "inicio" ? "active" : ""}`} data-s="inicio" onClick={() => go("inicio")}><span className="ic">🏠</span>Inicio</button>
        <button className={`tab ${screen === "ranking" ? "active" : ""}`} data-s="ranking" onClick={() => go("ranking")}><span className="ic">🏆</span>Ranking</button>
        <button className={`tab ${screen === "torneos" ? "active" : ""}`} data-s="torneos" onClick={() => go("torneos")}><span className="ic">🎯</span>Torneos</button>
        <button className={`tab ${screen === "canchas" ? "active" : ""}`} data-s="canchas" onClick={() => go("canchas")}><span className="ic">📅</span>Cancha</button>
        <button className={`tab ${screen === "academia" ? "active" : ""}`} data-s="academia" onClick={() => go("academia")}><span className="ic">🎾</span>Academia</button>
      </div>

      {/* Modal */}
      {modal && (
        <div className="modal show" onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
          <div className="sheet">
            {modal.tipo === "torneo" && modal.idx !== undefined && (
              <>
                <h3>Inscripción · {torneos[modal.idx].n}</h3>
                <div className="field"><label>Tu nombre</label><input placeholder="Ej: Juan Pérez" /></div>
                <div className="field"><label>Teléfono</label><input type="tel" placeholder="+569 XXXX XXXX" /></div>
                <div className="pagobox">
                  <h4>💳 Transferencia</h4>
                  <div className="row"><span className="k">Nombre</span><span className="v">{PAGO.nombre}</span></div>
                  <div className="row"><span className="k">Banco</span><span className="v">{PAGO.banco}</span></div>
                  <div className="row"><span className="k">Email</span><span className="v" style={{ fontSize: 11 }}>{PAGO.email}</span></div>
                  <div className="row"><span className="k">Monto</span><span className="v" style={{ color: "var(--naranja-osc)", fontSize: 16 }}>${torneos[modal.idx].monto.toLocaleString("es-CL")}</span></div>
                </div>
                <button className="btn wa" onClick={() => { closeModal(); window.open("https://wa.me/56981588218?text=" + encodeURIComponent("Hola PlayTenis! Quiero inscribirme en: " + torneos[modal.idx!].n), "_blank"); }}>💬 Confirmar por WhatsApp</button>
                <button className="btn sec" style={{ marginTop: 8 }} onClick={closeModal}>Cancelar</button>
              </>
            )}
            {modal.tipo === "cancha" && (
              <>
                <h3>Reservar cancha</h3>
                <div className="field"><label>Fecha</label><input type="date" defaultValue={new Date().toISOString().split("T")[0]} /></div>
                <div className="field"><label>Hora</label>
                  <select>
                    {Array.from({ length: 14 }, (_, i) => i + 9).map(h => (
                      <option key={h}>{String(h).padStart(2, "0")}:00</option>
                    ))}
                  </select>
                </div>
                <div className="field"><label>Cancha</label>
                  <select><option>Sin preferencia</option>{[1,2,3,4,5,6,7,8].map(n => <option key={n}>Cancha {n}</option>)}</select>
                </div>
                <div className="field"><label>Duración</label>
                  <select><option value="15000">1 hora · $15.000</option><option value="25000">2 horas · $25.000</option></select>
                </div>
                <div className="field"><label>Tu nombre</label><input placeholder="Ej: Juan Pérez" /></div>
                <div className="field"><label>Teléfono</label><input type="tel" placeholder="+569 XXXX XXXX" /></div>
                <button className="btn wa" onClick={() => { closeModal(); showToast("✅ Reserva enviada"); window.open("https://wa.me/56981588218", "_blank"); }}>💬 Confirmar por WhatsApp</button>
                <button className="btn sec" style={{ marginTop: 8 }} onClick={closeModal}>Cancelar</button>
              </>
            )}
            {modal.tipo === "partido" && (
              <>
                <h3>Registrar partido</h3>
                <div className="field"><label>Oponente</label>
                  <select>{jugadores.map((p, i) => <option key={i}>{p[0] as string}</option>)}</select>
                </div>
                <div className="field"><label>Cancha</label>
                  <select>{[1,2,3,4,5,6,7,8].map(n => <option key={n}>Cancha {n}</option>)}</select>
                </div>
                <div className="field"><label>Fecha</label><input type="date" defaultValue={new Date().toISOString().split("T")[0]} /></div>
                <div className="field"><label>Resultado</label><input placeholder="Ej: 6-3, 7-5" /></div>
                <button className="btn" onClick={() => { closeModal(); showToast("✅ Partido registrado"); }}>Guardar</button>
                <button className="btn sec" style={{ marginTop: 8 }} onClick={closeModal}>Cancelar</button>
              </>
            )}
            {modal.tipo === "clase" && (
              <>
                <h3>Inscripción · Academia PlayTenis</h3>
                <div className="field"><label>Nombre del alumno</label><input placeholder="Ej: Juan Pérez" /></div>
                <div className="field"><label>Teléfono</label><input type="tel" placeholder="+569 XXXX XXXX" /></div>
                <div className="field"><label>Nivel</label>
                  <select><option>Iniciación (3–8 años)</option><option>Intermedio</option><option>Avanzado</option><option>Alto rendimiento</option></select>
                </div>
                <div className="field"><label>Tipo</label>
                  <select><option>Grupal</option><option>Individual</option></select>
                </div>
                <button className="btn wa" onClick={() => { closeModal(); window.open("https://wa.me/56981588218?text=" + encodeURIComponent("Hola PlayTenis! Quiero inscribirme en la academia."), "_blank"); }}>💬 Coordinar por WhatsApp</button>
                <button className="btn sec" style={{ marginTop: 8 }} onClick={closeModal}>Cancelar</button>
              </>
            )}
            {modal.tipo === "encordado" && (
              <>
                <h3>Encordado · PlayTenis</h3>
                <div className="field"><label>Tu nombre</label><input placeholder="Ej: Juan Pérez" /></div>
                <div className="field"><label>Tipo de encordado</label>
                  <select><option>Control</option><option>Potencia</option><option>Híbrido</option><option>Competencia</option></select>
                </div>
                <div className="field"><label>¿Cambio de grip también?</label>
                  <select><option>No, solo encordado</option><option>Sí, grip también</option></select>
                </div>
                <button className="btn wa" onClick={() => { closeModal(); window.open("https://wa.me/56981588218?text=" + encodeURIComponent("Hola PlayTenis! Quiero solicitar un encordado."), "_blank"); }}>💬 Coordinar por WhatsApp</button>
                <button className="btn sec" style={{ marginTop: 8 }} onClick={closeModal}>Cancelar</button>
              </>
            )}
            {modal.tipo === "nivel" && (
              <>
                <h3>{["Iniciación 👶","Intermedio 👥","Avanzado 🎾","Alto Rendimiento 🏆"][modal.idx ?? 0]}</h3>
                <p style={{ fontSize: 14, color: "var(--texto)", marginBottom: 16 }}>
                  {[
                    "Para niños de 3 a 8 años. Aprenden las bases del tenis en ambiente divertido.",
                    "Para jugadores con base que quieren mejorar técnica y consistencia.",
                    "Para jugadores con buena base técnica que buscan el siguiente nivel.",
                    "Para competidores que buscan perfeccionar cada aspecto de su juego."
                  ][modal.idx ?? 0]}
                </p>
                <button className="btn wa" onClick={() => { closeModal(); window.open("https://wa.me/56981588218", "_blank"); }}>💬 Inscribirme por WhatsApp</button>
                <button className="btn sec" style={{ marginTop: 8 }} onClick={closeModal}>Cerrar</button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Toast */}
      <div className={`toast ${toastVisible ? "show" : ""}`}>{toast}</div>
    </div>
  );
}
