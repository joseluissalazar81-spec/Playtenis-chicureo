"use client";

import { useState } from "react";

const socios = [
  {
    id: 1,
    nombre: "Carlos Rodríguez",
    rut: "12.345.678-9",
    plan: "Premium",
    estado: "Activo",
    telefono: "+56 9 8123 4567",
    email: "carlos.r@gmail.com",
    fechaIngreso: "2019-03-15",
    nivel: "Avanzado",
    avatar: "CR",
    color: "bg-orange-500",
  },
  {
    id: 2,
    nombre: "María Fernández",
    rut: "13.456.789-0",
    plan: "Familiar",
    estado: "Activo",
    telefono: "+56 9 7654 3210",
    email: "mfernandez@outlook.com",
    fechaIngreso: "2020-07-22",
    nivel: "Intermedio",
    avatar: "MF",
    color: "bg-pink-500",
  },
  {
    id: 3,
    nombre: "Andrés Vega",
    rut: "14.567.890-1",
    plan: "Básico",
    estado: "Activo",
    telefono: "+56 9 9876 5432",
    email: "a.vega@empresa.cl",
    fechaIngreso: "2021-01-10",
    nivel: "Principiante",
    avatar: "AV",
    color: "bg-green-500",
  },
  {
    id: 4,
    nombre: "Sofía Morales",
    rut: "15.678.901-2",
    plan: "Premium",
    estado: "Activo",
    telefono: "+56 9 6543 2109",
    email: "sofia.morales@hotmail.com",
    fechaIngreso: "2018-11-05",
    nivel: "Avanzado",
    avatar: "SM",
    color: "bg-purple-500",
  },
  {
    id: 5,
    nombre: "Felipe Hernández",
    rut: "16.789.012-3",
    plan: "Familiar",
    estado: "Inactivo",
    telefono: "+56 9 5432 1098",
    email: "fhernandez@correo.cl",
    fechaIngreso: "2022-04-18",
    nivel: "Intermedio",
    avatar: "FH",
    color: "bg-yellow-600",
  },
  {
    id: 6,
    nombre: "Valentina Torres",
    rut: "17.890.123-4",
    plan: "Básico",
    estado: "Activo",
    telefono: "+56 9 4321 0987",
    email: "valtorres@gmail.com",
    fechaIngreso: "2023-02-28",
    nivel: "Principiante",
    avatar: "VT",
    color: "bg-red-500",
  },
  {
    id: 7,
    nombre: "Matías González",
    rut: "18.901.234-5",
    plan: "Premium",
    estado: "Activo",
    telefono: "+56 9 3210 9876",
    email: "mgonzalez@empresa.cl",
    fechaIngreso: "2017-09-12",
    nivel: "Avanzado",
    avatar: "MG",
    color: "bg-indigo-500",
  },
  {
    id: 8,
    nombre: "Catalina Pérez",
    rut: "19.012.345-6",
    plan: "Familiar",
    estado: "Activo",
    telefono: "+56 9 2109 8765",
    email: "cperez@hotmail.com",
    fechaIngreso: "2020-12-01",
    nivel: "Intermedio",
    avatar: "CP",
    color: "bg-teal-500",
  },
  {
    id: 9,
    nombre: "Diego Soto",
    rut: "20.123.456-7",
    plan: "Básico",
    estado: "Pendiente",
    telefono: "+56 9 1098 7654",
    email: "dsoto@correo.cl",
    fechaIngreso: "2024-01-15",
    nivel: "Principiante",
    avatar: "DS",
    color: "bg-orange-500",
  },
  {
    id: 10,
    nombre: "Isidora Muñoz",
    rut: "21.234.567-8",
    plan: "Premium",
    estado: "Activo",
    telefono: "+56 9 0987 6543",
    email: "imunoz@gmail.com",
    fechaIngreso: "2019-06-20",
    nivel: "Avanzado",
    avatar: "IM",
    color: "bg-rose-500",
  },
  {
    id: 11,
    nombre: "Rodrigo Lara",
    rut: "10.234.567-K",
    plan: "Familiar",
    estado: "Activo",
    telefono: "+56 9 8765 4321",
    email: "rlara@empresa.cl",
    fechaIngreso: "2021-08-30",
    nivel: "Intermedio",
    avatar: "RL",
    color: "bg-cyan-500",
  },
  {
    id: 12,
    nombre: "Javiera Castro",
    rut: "11.345.678-0",
    plan: "Básico",
    estado: "Inactivo",
    telefono: "+56 9 7654 3210",
    email: "jcastro@hotmail.com",
    fechaIngreso: "2022-10-05",
    nivel: "Principiante",
    avatar: "JC",
    color: "bg-lime-600",
  },
];

const planColors: Record<string, string> = {
  Básico: "bg-gray-100 text-gray-700",
  Premium: "bg-orange-50 text-[#2D2D2D]",
  Familiar: "bg-orange-100 text-blue-700",
};

const estadoColors: Record<string, string> = {
  Activo: "bg-green-100 text-green-700",
  Inactivo: "bg-red-100 text-red-700",
  Pendiente: "bg-yellow-100 text-yellow-700",
};

const nivelColors: Record<string, string> = {
  Principiante: "bg-orange-100 text-sky-700",
  Intermedio: "bg-orange-100 text-orange-700",
  Avanzado: "bg-purple-100 text-purple-700",
};

function DesktopPage() {
  const [search, setSearch] = useState("");
  const [filterPlan, setFilterPlan] = useState("Todos");
  const [filterEstado, setFilterEstado] = useState("Todos");
  const [selectedSocio, setSelectedSocio] = useState<number | null>(null);

  const filtered = socios.filter((s) => {
    const matchSearch =
      s.nombre.toLowerCase().includes(search.toLowerCase()) ||
      s.rut.includes(search) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchPlan = filterPlan === "Todos" || s.plan === filterPlan;
    const matchEstado = filterEstado === "Todos" || s.estado === filterEstado;
    return matchSearch && matchPlan && matchEstado;
  });

  const stats = {
    total: socios.length,
    activos: socios.filter((s) => s.estado === "Activo").length,
    premium: socios.filter((s) => s.plan === "Premium").length,
    familiar: socios.filter((s) => s.plan === "Familiar").length,
  };

  const selectedData = socios.find((s) => s.id === selectedSocio);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div
        className="py-16 text-center text-white"
        style={{
          background: "linear-gradient(135deg, #993D00 0%, #B34A00 100%)",
        }}
      >
        <h1 className="text-4xl md:text-5xl font-black mb-3">
          Gestión de Socios
        </h1>
        <p className="text-white/80 text-lg max-w-xl mx-auto">
          Administra el padrón de socios del club con toda su información y
          estado de membersía.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Socios", value: stats.total, icon: "👥", color: "bg-white" },
            { label: "Activos", value: stats.activos, icon: "✅", color: "bg-green-50" },
            { label: "Plan Premium", value: stats.premium, icon: "⭐", color: "bg-orange-50" },
            { label: "Plan Familiar", value: stats.familiar, icon: "👨‍👩‍👧‍👦", color: "bg-orange-50" },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`${stat.color} rounded-xl p-4 shadow-sm text-center`}
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-3xl font-black text-[#2D2D2D]">
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 flex flex-wrap gap-3 items-center">
          <input
            type="text"
            placeholder="Buscar por nombre, RUT o email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-48 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-tennis-green"
          />
          <div className="flex gap-2 flex-wrap">
            {["Todos", "Básico", "Premium", "Familiar"].map((p) => (
              <button
                key={p}
                onClick={() => setFilterPlan(p)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  filterPlan === p
                    ? "bg-[#CC5500] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            {["Todos", "Activo", "Inactivo", "Pendiente"].map((e) => (
              <button
                key={e}
                onClick={() => setFilterEstado(e)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  filterEstado === e
                    ? "bg-[#2D2D2D] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-bold text-[#2D2D2D]">
                  Padrón de Socios
                </h2>
                <span className="text-sm text-gray-500">
                  {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">
                        Socio
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">
                        Plan
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">
                        Estado
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">
                        Nivel
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((socio) => (
                      <tr
                        key={socio.id}
                        onClick={() =>
                          setSelectedSocio(
                            selectedSocio === socio.id ? null : socio.id
                          )
                        }
                        className={`border-b border-gray-50 cursor-pointer transition-colors ${
                          selectedSocio === socio.id
                            ? "bg-orange-50"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full ${socio.color} text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}
                            >
                              {socio.avatar}
                            </div>
                            <div>
                              <div className="font-medium text-gray-800">
                                {socio.nombre}
                              </div>
                              <div className="text-xs text-gray-400">
                                {socio.rut}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${planColors[socio.plan]}`}
                          >
                            {socio.plan}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${estadoColors[socio.estado]}`}
                          >
                            {socio.estado}
                          </span>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${nivelColors[socio.nivel]}`}
                          >
                            {socio.nivel}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td
                          colSpan={4}
                          className="text-center py-10 text-gray-400"
                        >
                          No se encontraron socios con los filtros seleccionados.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-1">
            {selectedData ? (
              <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                <div className="text-center mb-6">
                  <div
                    className={`w-16 h-16 rounded-full ${selectedData.color} text-white text-xl font-bold flex items-center justify-center mx-auto mb-3`}
                  >
                    {selectedData.avatar}
                  </div>
                  <h3 className="font-bold text-[#2D2D2D] text-lg">
                    {selectedData.nombre}
                  </h3>
                  <p className="text-gray-500 text-sm">{selectedData.rut}</p>
                  <div className="flex justify-center gap-2 mt-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${planColors[selectedData.plan]}`}
                    >
                      {selectedData.plan}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${estadoColors[selectedData.estado]}`}
                    >
                      {selectedData.estado}
                    </span>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>📧</span>
                    <span>{selectedData.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>📞</span>
                    <span>{selectedData.telefono}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>📅</span>
                    <span>
                      Socio desde{" "}
                      {new Date(selectedData.fechaIngreso).toLocaleDateString(
                        "es-CL",
                        { year: "numeric", month: "long" }
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>🎾</span>
                    <span>
                      Nivel:{" "}
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${nivelColors[selectedData.nivel]}`}
                      >
                        {selectedData.nivel}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="mt-6 space-y-2">
                  <button className="w-full bg-[#CC5500] text-white py-2 rounded-lg text-sm font-semibold hover:bg-[#993D00] transition-colors">
                    Editar Socio
                  </button>
                  <button className="w-full border border-gray-200 text-gray-600 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                    Ver Reservas
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm p-8 text-center text-gray-400 sticky top-24">
                <div className="text-5xl mb-3">👤</div>
                <p className="font-medium">Selecciona un socio</p>
                <p className="text-sm mt-1">
                  Haz clic en una fila para ver el detalle del socio.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


export default function Page() {
  return (
    <div className="desktop-only">
      <DesktopPage />
    </div>
  );
}
