"use client";

import { useState } from "react";

const courts = [
  {
    id: 1,
    name: "Cancha 1 - Arcilla",
    type: "Arcilla",
    covered: false,
    pricePerHour: 12000,
    description: "Cancha principal de arcilla roja, ideal para partidos competitivos.",
  },
  {
    id: 2,
    name: "Cancha 2 - Arcilla",
    type: "Arcilla",
    covered: false,
    pricePerHour: 12000,
    description: "Cancha de arcilla con vista a la precordillera.",
  },
  {
    id: 3,
    name: "Cancha 3 - Cemento",
    type: "Cemento",
    covered: false,
    pricePerHour: 10000,
    description: "Superficie rápida de cemento, perfecta para entrenamiento.",
  },
  {
    id: 4,
    name: "Cancha 4 - Cemento Cubierta",
    type: "Cemento",
    covered: true,
    pricePerHour: 15000,
    description: "Cancha techada para jugar en cualquier condición climática.",
  },
  {
    id: 5,
    name: "Cancha 5 - Arcilla",
    type: "Arcilla",
    covered: false,
    pricePerHour: 12000,
    description: "Amplia cancha de arcilla con iluminación LED.",
  },
  {
    id: 6,
    name: "Cancha 6 - Sintética Cubierta",
    type: "Sintética",
    covered: true,
    pricePerHour: 18000,
    description: "Cancha de grama sintética, premium y techada.",
  },
  {
    id: 7,
    name: "Cancha 7 - Arcilla",
    type: "Arcilla",
    covered: false,
    pricePerHour: 12000,
    description: "Cancha iluminada para partidos nocturnos.",
  },
  {
    id: 8,
    name: "Cancha 8 - Cemento",
    type: "Cemento",
    covered: false,
    pricePerHour: 10000,
    description: "Cancha de entrenamiento con pared de rebote.",
  },
];

const timeSlots = [
  "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00", "18:00",
  "19:00", "20:00", "21:00",
];

const surfaceColors: Record<string, string> = {
  Arcilla: "bg-orange-100 text-orange-700",
  Cemento: "bg-blue-100 text-blue-700",
  Sintética: "bg-purple-100 text-purple-700",
};

function DesktopPage() {
  const [selectedCourt, setSelectedCourt] = useState<number | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [filterType, setFilterType] = useState("Todas");

  const today = new Date().toISOString().split("T")[0];

  const selectedCourtData = courts.find((c) => c.id === selectedCourt);
  const totalPrice = selectedCourtData
    ? selectedCourtData.pricePerHour * duration
    : 0;

  const filteredCourts =
    filterType === "Todas"
      ? courts
      : courts.filter((c) =>
          filterType === "Cubiertas" ? c.covered : c.type === filterType
        );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setSelectedCourt(null);
    setDate("");
    setTime("");
    setDuration(1);
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div
        className="py-16 text-center text-white"
        style={{
          background: "linear-gradient(135deg, #0D47A1 0%, #1976D2 100%)",
        }}
      >
        <h1 className="text-4xl md:text-5xl font-black mb-3">
          Reserva de Canchas
        </h1>
        <p className="text-white/80 text-lg max-w-xl mx-auto">
          Elige tu cancha favorita, selecciona horario y confirma tu reserva en
          segundos.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {submitted ? (
          /* Success Message */
          <div className="max-w-xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-lg p-10">
              <div className="text-6xl mb-4">🎾</div>
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-2">
                ¡Reserva Confirmada!
              </h2>
              <p className="text-gray-600 mb-6">
                Tu reserva ha sido recibida. Recibirás un correo de confirmación
                en <strong>{email}</strong>.
              </p>
              <div className="bg-blue-50 rounded-xl p-4 text-left text-sm space-y-2 mb-6">
                <p>
                  <strong>Cancha:</strong> {selectedCourtData?.name}
                </p>
                <p>
                  <strong>Fecha:</strong> {date}
                </p>
                <p>
                  <strong>Hora:</strong> {time} hrs ({duration} hora
                  {duration > 1 ? "s" : ""})
                </p>
                <p>
                  <strong>Nombre:</strong> {name}
                </p>
                <p>
                  <strong>Total:</strong> $
                  {totalPrice.toLocaleString("es-CL")} CLP
                </p>
              </div>
              <button
                onClick={handleReset}
                className="btn-primary w-full text-center"
              >
                Hacer otra reserva
              </button>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Court Selection */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h2 className="text-xl font-bold text-[#2D2D2D]">
                  Selecciona una Cancha
                </h2>
                <div className="flex gap-2 flex-wrap">
                  {["Todas", "Arcilla", "Cemento", "Sintética", "Cubiertas"].map(
                    (t) => (
                      <button
                        key={t}
                        onClick={() => setFilterType(t)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          filterType === t
                            ? "bg-[#1565C0] text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {t}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {filteredCourts.map((court) => (
                  <button
                    key={court.id}
                    onClick={() => setSelectedCourt(court.id)}
                    className={`text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedCourt === court.id
                        ? "border-[#1565C0] bg-blue-50 shadow-md"
                        : "border-gray-200 bg-white hover:border-[#1565C0] hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-[#2D2D2D] text-sm">
                        {court.name}
                      </h3>
                      {selectedCourt === court.id && (
                        <span className="text-[#1565C0] text-lg">✓</span>
                      )}
                    </div>
                    <div className="flex gap-2 mb-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          surfaceColors[court.type]
                        }`}
                      >
                        {court.type}
                      </span>
                      {court.covered && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium">
                          Techada
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mb-2">
                      {court.description}
                    </p>
                    <p className="text-sm font-bold text-[#1565C0]">
                      ${court.pricePerHour.toLocaleString("es-CL")}{" "}
                      <span className="font-normal text-gray-500">/ hora</span>
                    </p>
                  </button>
                ))}
              </div>

              {/* Time slots */}
              {selectedCourt && (
                <div>
                  <h2 className="text-xl font-bold text-[#2D2D2D] mb-4">
                    Disponibilidad — Horarios
                  </h2>
                  <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
                    {timeSlots.map((slot) => {
                      const blocked = ["09:00", "10:00", "18:00", "19:00"].includes(
                        slot
                      );
                      return (
                        <button
                          key={slot}
                          disabled={blocked}
                          onClick={() => setTime(slot)}
                          className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                            blocked
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed line-through"
                              : time === slot
                              ? "bg-[#1565C0] text-white shadow-md"
                              : "bg-white border border-gray-200 text-gray-700 hover:border-[#1565C0] hover:text-[#1565C0]"
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Los horarios tachados ya están reservados.
                  </p>
                </div>
              )}
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold text-[#2D2D2D] mb-5">
                  Confirmar Reserva
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Juan Pérez"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-tennis-green focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="juan@correo.cl"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-tennis-green focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+56 9 1234 5678"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-tennis-green focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha *
                    </label>
                    <input
                      type="date"
                      required
                      min={today}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-tennis-green focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duración
                    </label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-tennis-green focus:border-transparent"
                    >
                      <option value={1}>1 hora</option>
                      <option value={2}>2 horas</option>
                      <option value={3}>3 horas</option>
                    </select>
                  </div>

                  {/* Summary */}
                  <div className="bg-blue-50 rounded-xl p-4 text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cancha:</span>
                      <span className="font-medium">
                        {selectedCourtData ? `#${selectedCourtData.id}` : "—"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Horario:</span>
                      <span className="font-medium">{time || "—"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duración:</span>
                      <span className="font-medium">
                        {duration} hora{duration > 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="border-t border-[#1565C0]/20 mt-2 pt-2 flex justify-between font-bold">
                      <span>Total:</span>
                      <span className="text-[#1565C0]">
                        {selectedCourtData
                          ? `$${totalPrice.toLocaleString("es-CL")} CLP`
                          : "—"}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!selectedCourt || !date || !time}
                    className="w-full bg-[#1565C0] text-white py-3 rounded-xl font-bold hover:bg-[#0D47A1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirmar Reserva
                  </button>
                  {(!selectedCourt || !date || !time) && (
                    <p className="text-xs text-gray-400 text-center">
                      Selecciona cancha, fecha y horario para continuar.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        )}
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
