"use client";

import { useState } from "react";

const torneos = [
  {
    id: 1,
    nombre: "Abierto de Verano PlayTenis",
    fecha: "2025-01-20",
    fechaFin: "2025-01-26",
    categoria: "Open",
    estado: "Finalizado",
    participantes: 32,
    superfice: "Arcilla",
    premio: "$500.000 CLP",
    ganador: "Carlos Rodríguez",
    subcampeón: "Matías González",
    descripcion:
      "El torneo más importante del club que reúne a los mejores jugadores de la temporada de verano.",
  },
  {
    id: 2,
    nombre: "Torneo Aniversario 2024",
    fecha: "2024-09-15",
    fechaFin: "2024-09-22",
    categoria: "Amateur",
    estado: "Finalizado",
    participantes: 24,
    superfice: "Cemento",
    premio: "$300.000 CLP",
    ganador: "Sofía Morales",
    subcampeón: "Isidora Muñoz",
    descripcion:
      "Torneo de celebración del aniversario del club, abierto a todos los socios.",
  },
  {
    id: 3,
    nombre: "Copa Chicureo Interclubs",
    fecha: "2025-03-10",
    fechaFin: "2025-03-16",
    categoria: "Interclub",
    estado: "Finalizado",
    participantes: 48,
    superfice: "Arcilla",
    premio: "$800.000 CLP",
    ganador: "PlayTenis Chicureo",
    subcampeón: "Club Polo Santiago",
    descripcion:
      "Campeonato interclubs que reúne a los mejores exponentes de la zona oriente.",
  },
  {
    id: 4,
    nombre: "Torneo Otoño Categorías",
    fecha: "2025-04-28",
    fechaFin: "2025-05-04",
    categoria: "Categorías",
    estado: "Finalizado",
    participantes: 56,
    superfice: "Arcilla",
    premio: "$400.000 CLP",
    ganador: "Diego Soto",
    subcampeón: "Rodrigo Lara",
    descripcion:
      "Torneo dividido por categorías de nivel para una competencia más equitativa.",
  },
  {
    id: 5,
    nombre: "Torneo de Invierno 2025",
    fecha: "2025-07-07",
    fechaFin: "2025-07-13",
    categoria: "Open",
    estado: "En Curso",
    participantes: 28,
    superfice: "Sintética Cubierta",
    premio: "$450.000 CLP",
    ganador: null,
    subcampeón: null,
    descripcion:
      "Torneo invernal en canchas cubiertas, ideal para la temporada de frío.",
  },
  {
    id: 6,
    nombre: "Juvenil Sub-18 Chicureo",
    fecha: "2025-08-11",
    fechaFin: "2025-08-17",
    categoria: "Juvenil",
    estado: "Inscripciones Abiertas",
    participantes: 20,
    superfice: "Arcilla",
    premio: "$200.000 CLP + Trofeo",
    ganador: null,
    subcampeón: null,
    descripcion:
      "Torneo exclusivo para jugadores sub-18, impulsando el tenis joven de Chicureo.",
  },
  {
    id: 7,
    nombre: "Copa Fin de Año 2025",
    fecha: "2025-11-24",
    fechaFin: "2025-11-30",
    categoria: "Open",
    estado: "Próximo",
    participantes: 0,
    superfice: "Arcilla",
    premio: "$600.000 CLP",
    ganador: null,
    subcampeón: null,
    descripcion:
      "El gran cierre de la temporada, el torneo más esperado del segundo semestre.",
  },
];

const ranking = [
  { pos: 1, nombre: "Carlos Rodríguez", puntos: 1250, torneos: 8, victorias: 22, derrotas: 5, nivel: "Avanzado", tendencia: "up" },
  { pos: 2, nombre: "Sofía Morales", puntos: 1180, torneos: 7, victorias: 19, derrotas: 6, nivel: "Avanzado", tendencia: "up" },
  { pos: 3, nombre: "Matías González", puntos: 1050, torneos: 9, victorias: 18, derrotas: 8, nivel: "Avanzado", tendencia: "down" },
  { pos: 4, nombre: "Isidora Muñoz", puntos: 980, torneos: 6, victorias: 15, derrotas: 7, nivel: "Avanzado", tendencia: "up" },
  { pos: 5, nombre: "Valentina Torres", puntos: 750, torneos: 5, victorias: 11, derrotas: 9, nivel: "Intermedio", tendencia: "same" },
  { pos: 6, nombre: "María Fernández", puntos: 720, torneos: 6, victorias: 10, derrotas: 10, nivel: "Intermedio", tendencia: "up" },
  { pos: 7, nombre: "Rodrigo Lara", puntos: 680, torneos: 7, victorias: 9, derrotas: 12, nivel: "Intermedio", tendencia: "down" },
  { pos: 8, nombre: "Catalina Pérez", puntos: 650, torneos: 5, victorias: 9, derrotas: 8, nivel: "Intermedio", tendencia: "same" },
  { pos: 9, nombre: "Diego Soto", puntos: 420, torneos: 4, victorias: 6, derrotas: 10, nivel: "Principiante", tendencia: "up" },
  { pos: 10, nombre: "Andrés Vega", puntos: 380, torneos: 4, victorias: 5, derrotas: 11, nivel: "Principiante", tendencia: "down" },
  { pos: 11, nombre: "Felipe Hernández", puntos: 350, torneos: 3, victorias: 5, derrotas: 9, nivel: "Intermedio", tendencia: "same" },
  { pos: 12, nombre: "Javiera Castro", puntos: 290, torneos: 3, victorias: 4, derrotas: 10, nivel: "Principiante", tendencia: "down" },
];

const estadoColors: Record<string, string> = {
  "Finalizado": "bg-gray-100 text-gray-600",
  "En Curso": "bg-green-100 text-green-700",
  "Inscripciones Abiertas": "bg-blue-100 text-blue-700",
  "Próximo": "bg-orange-100 text-orange-700",
};

const categoriaColors: Record<string, string> = {
  Open: "bg-purple-100 text-purple-700",
  Amateur: "bg-orange-50 text-[#2D2D2D]",
  Interclub: "bg-yellow-100 text-yellow-700",
  Categorías: "bg-pink-100 text-pink-700",
  Juvenil: "bg-sky-100 text-sky-700",
};

const tendenciaIcon: Record<string, string> = {
  up: "↑",
  down: "↓",
  same: "→",
};

const tendenciaColor: Record<string, string> = {
  up: "text-green-600",
  down: "text-red-500",
  same: "text-gray-400",
};

export default function TorneosPage() {
  const [tab, setTab] = useState<"torneos" | "ranking">("torneos");
  const [filterEstado, setFilterEstado] = useState("Todos");
  const [selectedTorneo, setSelectedTorneo] = useState<number | null>(null);

  const filteredTorneos =
    filterEstado === "Todos"
      ? torneos
      : torneos.filter((t) => t.estado === filterEstado);

  const selectedT = torneos.find((t) => t.id === selectedTorneo);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div
        className="py-16 text-center text-white"
        style={{
          background: "linear-gradient(135deg, #1b4332 0%, #40916c 100%)",
        }}
      >
        <h1 className="text-4xl md:text-5xl font-black mb-3">
          Torneos y Rankings
        </h1>
        <p className="text-white/80 text-lg max-w-xl mx-auto">
          Sigue la acción de nuestros torneos y consulta el ranking actualizado
          de jugadores del club.
        </p>

        {/* Tabs */}
        <div className="flex justify-center gap-3 mt-8">
          <button
            onClick={() => setTab("torneos")}
            className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-colors ${
              tab === "torneos"
                ? "bg-white text-[#2D2D2D] shadow-md"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            🏆 Torneos
          </button>
          <button
            onClick={() => setTab("ranking")}
            className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-colors ${
              tab === "ranking"
                ? "bg-white text-[#2D2D2D] shadow-md"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            📊 Ranking
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {tab === "torneos" ? (
          <>
            {/* Tournament stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Torneos", value: torneos.length, icon: "🏆" },
                { label: "Finalizados", value: torneos.filter((t) => t.estado === "Finalizado").length, icon: "✅" },
                { label: "En Curso", value: torneos.filter((t) => t.estado === "En Curso").length, icon: "🎾" },
                { label: "Próximos", value: torneos.filter((t) => t.estado === "Próximo" || t.estado === "Inscripciones Abiertas").length, icon: "📅" },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm text-center">
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div className="text-3xl font-black text-[#2D2D2D]">{s.value}</div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="flex gap-2 flex-wrap mb-6">
              {["Todos", "Finalizado", "En Curso", "Inscripciones Abiertas", "Próximo"].map((e) => (
                <button
                  key={e}
                  onClick={() => setFilterEstado(e)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    filterEstado === e
                      ? "bg-[#E8450A] text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-[#E8450A] hover:text-[#E8450A]"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Tournaments list */}
              <div className="lg:col-span-2 space-y-3">
                {filteredTorneos.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTorneo(selectedTorneo === t.id ? null : t.id)}
                    className={`w-full text-left bg-white rounded-2xl shadow-sm p-5 transition-all duration-200 ${
                      selectedTorneo === t.id
                        ? "ring-2 ring-tennis-green shadow-md"
                        : "hover:shadow-md hover:ring-1 hover:ring-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${estadoColors[t.estado]}`}>
                            {t.estado}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoriaColors[t.categoria] || "bg-gray-100 text-gray-600"}`}>
                            {t.categoria}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-50 text-gray-500 font-medium">
                            {t.superfice}
                          </span>
                        </div>
                        <h3 className="font-bold text-[#2D2D2D] text-base mb-1">
                          {t.nombre}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                          <span>
                            📅{" "}
                            {new Date(t.fecha).toLocaleDateString("es-CL", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}{" "}
                            —{" "}
                            {new Date(t.fechaFin).toLocaleDateString("es-CL", {
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                          {t.participantes > 0 && (
                            <span>👥 {t.participantes} jugadores</span>
                          )}
                          <span>🏅 {t.premio}</span>
                        </div>
                      </div>
                      {t.ganador && (
                        <div className="text-right hidden sm:block">
                          <div className="text-xs text-gray-400 mb-0.5">Campeón</div>
                          <div className="text-sm font-bold text-[#E8450A] truncate max-w-32">
                            {t.ganador}
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Detail */}
              <div className="lg:col-span-1">
                {selectedT ? (
                  <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                    <div className="mb-1 flex gap-2 flex-wrap">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${estadoColors[selectedT.estado]}`}>
                        {selectedT.estado}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoriaColors[selectedT.categoria] || "bg-gray-100 text-gray-600"}`}>
                        {selectedT.categoria}
                      </span>
                    </div>
                    <h3 className="font-bold text-[#2D2D2D] text-lg mt-2 mb-3">
                      {selectedT.nombre}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      {selectedT.descripcion}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Fechas:</span>
                        <span className="font-medium text-gray-800">
                          {new Date(selectedT.fecha).toLocaleDateString("es-CL")} –{" "}
                          {new Date(selectedT.fechaFin).toLocaleDateString("es-CL")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Superficie:</span>
                        <span className="font-medium text-gray-800">{selectedT.superfice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Premio:</span>
                        <span className="font-medium text-[#E8450A]">{selectedT.premio}</span>
                      </div>
                      {selectedT.participantes > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Participantes:</span>
                          <span className="font-medium text-gray-800">{selectedT.participantes}</span>
                        </div>
                      )}
                    </div>
                    {selectedT.ganador && (
                      <div className="mt-4 bg-orange-100 rounded-xl p-4">
                        <div className="text-xs font-semibold text-gray-500 uppercase mb-2">
                          Resultados
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <span>🥇</span>
                            <span className="font-bold text-[#2D2D2D]">
                              {selectedT.ganador}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>🥈</span>
                            <span className="font-medium text-gray-700">
                              {selectedT.subcampeón}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    {(selectedT.estado === "Inscripciones Abiertas" ||
                      selectedT.estado === "Próximo") && (
                      <button className="w-full mt-4 bg-[#E8450A] text-white py-2.5 rounded-xl text-sm font-bold hover:bg-[#2D2D2D] transition-colors">
                        Inscribirme
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl shadow-sm p-8 text-center text-gray-400 sticky top-24">
                    <div className="text-5xl mb-3">🏆</div>
                    <p className="font-medium">Selecciona un torneo</p>
                    <p className="text-sm mt-1">Haz clic en un torneo para ver detalles.</p>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          /* Ranking tab */
          <div>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div>
                <h2 className="text-2xl font-bold text-[#2D2D2D]">
                  Ranking de Jugadores
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Actualizado al{" "}
                  {new Date().toLocaleDateString("es-CL", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="bg-orange-50 rounded-xl px-4 py-2 text-sm text-[#2D2D2D] font-medium">
                🎾 Temporada 2024-2025
              </div>
            </div>

            {/* Top 3 podium */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[ranking[1], ranking[0], ranking[2]].map((player, idx) => {
                const podiumPos = idx === 0 ? 2 : idx === 1 ? 1 : 3;
                const medals = ["🥈", "🥇", "🥉"];
                const heights = ["h-28", "h-36", "h-24"];
                return (
                  <div
                    key={player.nombre}
                    className={`flex flex-col items-center justify-end`}
                  >
                    <div className="text-center mb-2">
                      <div className="text-2xl mb-1">{medals[idx]}</div>
                      <div className="font-bold text-[#2D2D2D] text-sm leading-tight">
                        {player.nombre.split(" ")[0]}
                      </div>
                      <div className="text-xs text-gray-500">{player.puntos} pts</div>
                    </div>
                    <div
                      className={`w-full ${heights[idx]} rounded-t-xl flex items-center justify-center text-3xl font-black text-white ${
                        podiumPos === 1
                          ? "bg-[#E8450A] text-[#2D2D2D]"
                          : podiumPos === 2
                          ? "bg-gray-400"
                          : "bg-orange-400"
                      }`}
                    >
                      {podiumPos}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Full ranking table */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="text-center px-4 py-3 font-semibold text-gray-600 w-12">
                        Pos.
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">
                        Jugador
                      </th>
                      <th className="text-center px-4 py-3 font-semibold text-gray-600">
                        Puntos
                      </th>
                      <th className="text-center px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">
                        Torneos
                      </th>
                      <th className="text-center px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">
                        V/D
                      </th>
                      <th className="text-center px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">
                        % Victoria
                      </th>
                      <th className="text-center px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">
                        Nivel
                      </th>
                      <th className="text-center px-4 py-3 font-semibold text-gray-600 w-10">
                        ↕
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ranking.map((player) => {
                      const winRate = Math.round(
                        (player.victorias / (player.victorias + player.derrotas)) * 100
                      );
                      return (
                        <tr
                          key={player.pos}
                          className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                            player.pos <= 3 ? "font-medium" : ""
                          }`}
                        >
                          <td className="text-center px-4 py-3">
                            <span
                              className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                                player.pos === 1
                                  ? "bg-[#E8450A] text-[#2D2D2D]"
                                  : player.pos === 2
                                  ? "bg-gray-300 text-gray-700"
                                  : player.pos === 3
                                  ? "bg-orange-300 text-orange-800"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {player.pos}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-gray-800">{player.nombre}</span>
                          </td>
                          <td className="text-center px-4 py-3 font-bold text-[#E8450A]">
                            {player.puntos.toLocaleString("es-CL")}
                          </td>
                          <td className="text-center px-4 py-3 text-gray-600 hidden sm:table-cell">
                            {player.torneos}
                          </td>
                          <td className="text-center px-4 py-3 text-gray-600 hidden md:table-cell">
                            <span className="text-green-600">{player.victorias}</span>
                            {" / "}
                            <span className="text-red-500">{player.derrotas}</span>
                          </td>
                          <td className="text-center px-4 py-3 hidden md:table-cell">
                            <div className="flex items-center gap-2 justify-center">
                              <div className="flex-1 bg-gray-100 rounded-full h-2 w-16">
                                <div
                                  className="bg-[#E8450A] h-2 rounded-full"
                                  style={{ width: `${winRate}%` }}
                                />
                              </div>
                              <span className="text-xs text-gray-500 w-10">
                                {winRate}%
                              </span>
                            </div>
                          </td>
                          <td className="text-center px-4 py-3 hidden sm:table-cell">
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                player.nivel === "Avanzado"
                                  ? "bg-purple-100 text-purple-700"
                                  : player.nivel === "Intermedio"
                                  ? "bg-orange-100 text-orange-700"
                                  : "bg-sky-100 text-sky-700"
                              }`}
                            >
                              {player.nivel}
                            </span>
                          </td>
                          <td className={`text-center px-4 py-3 font-bold ${tendenciaColor[player.tendencia]}`}>
                            {tendenciaIcon[player.tendencia]}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">
              Los puntos se actualizan al finalizar cada torneo oficial del club.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
