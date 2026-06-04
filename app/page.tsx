"use client";
import Link from "next/link";
import Image from "next/image";
import MobileApp from "./MobileApp";

const features = [
  {
    icon: "🎾",
    title: "8 Canchas Profesionales",
    description:
      "Canchas de arcilla y cemento con iluminación LED de última generación para jugar de día y de noche.",
  },
  {
    icon: "🏆",
    title: "Torneos Todo el Año",
    description:
      "Participá en torneos internos, regionales y nacionales. Compite y mejora tu ranking ATP/WTA amateur.",
  },
  {
    icon: "👨‍🏫",
    title: "Profesores Certificados",
    description:
      "Clases para todos los niveles, desde principiantes hasta jugadores avanzados. Escuela infantil y adultos.",
  },
  {
    icon: "🏊",
    title: "Instalaciones Premium",
    description:
      "Camarines modernos, piscina, gimnasio, restaurante y estacionamiento gratuito para socios.",
  },
];

const stats = [
  { value: "500+", label: "Socios Activos" },
  { value: "8", label: "Canchas" },
  { value: "15+", label: "Años de Historia" },
  { value: "20+", label: "Torneos al Año" },
];

const plans = [
  {
    name: "Básico",
    price: "$85.000",
    period: "/ mes",
    features: [
      "2 horas de cancha por semana",
      "Acceso a camarines",
      "Descuento 10% en clases",
      "Newsletter del club",
    ],
    highlight: false,
  },
  {
    name: "Premium",
    price: "$145.000",
    period: "/ mes",
    features: [
      "Canchas ilimitadas",
      "1 clase grupal semanal",
      "Acceso a gimnasio",
      "Piscina y sauna",
      "Prioridad en torneos",
    ],
    highlight: true,
  },
  {
    name: "Familiar",
    price: "$220.000",
    period: "/ mes",
    features: [
      "Todo lo de Premium",
      "Hasta 4 integrantes",
      "Escuela infantil incluida",
      "Eventos familiares",
      "Estacionamiento VIP",
    ],
    highlight: false,
  },
];

export default function HomePage() {
  return (
    <>
      <div className="mobile-only">
        <MobileApp />
      </div>
      <div className="desktop-only">
      {/* Hero */}
      <section
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1a1a1a 0%, #2D2D2D 50%, #1565C0 100%)",
        }}
      >
        {/* Decorative tennis court lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white transform -translate-y-1/2" />
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white transform -translate-x-1/2" />
          <div className="absolute top-[20%] left-[15%] right-[15%] h-0.5 bg-white" />
          <div className="absolute bottom-[20%] left-[15%] right-[15%] h-0.5 bg-white" />
          <div className="absolute top-[20%] bottom-[20%] left-[15%] w-0.5 bg-white" />
          <div className="absolute top-[20%] bottom-[20%] right-[15%] w-0.5 bg-white" />
          <div className="absolute top-[20%] bottom-[20%] left-[43%] right-[43%] border-2 border-white rounded-full" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.jpeg"
              alt="PlayTenis Chicureo"
              width={120}
              height={120}
              className="rounded-full shadow-2xl border-4 border-white/30"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Play<span className="text-[#1565C0]">Tenis</span>
            <br />
            <span className="text-3xl md:text-4xl font-light text-white/80">
              Chicureo
            </span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            La academia de tenis en Chicureo, Colina. Canchas de primera
            clase, comunidad apasionada y el mejor ambiente para jugar en la
            precordillera de Santiago.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/canchas"
              className="bg-[#1565C0] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#0D47A1] transition-colors shadow-lg hover:shadow-xl"
            >
              Reservar Cancha
            </Link>
            <Link
              href="#nosotros"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors"
            >
              Conocer el Club
            </Link>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 80L60 66.7C120 53.3 240 26.7 360 20C480 13.3 600 26.7 720 33.3C840 40 960 40 1080 33.3C1200 26.7 1320 13.3 1380 6.7L1440 0V80H0Z"
              fill="#f9fafb"
            />
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-black text-[#1565C0] mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm font-medium uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="nosotros" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#1565C0] font-semibold text-sm uppercase tracking-wider">
                Sobre Nosotros
              </span>
              <h2 className="section-title mt-2">
                El Tenis en su Máxima Expresión
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Fundado en 2009 en el corazón de Chicureo, PlayTenis nació con la
                visión de crear una comunidad deportiva de excelencia en Colina.
                Contamos con infraestructura de clase mundial rodeada
                del impresionante paisaje de la precordillera andina.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Nuestro club es hogar de familias, profesionales y competidores
                que comparten la pasión por el tenis. Con más de 500 socios
                activos, ofrecemos un ambiente inclusivo donde cada pelotazo
                cuenta.
              </p>
              <div className="flex gap-4">
                <Link href="/socios" className="btn-primary">
                  Hacerse Socio
                </Link>
                <Link href="/canchas" className="btn-secondary">
                  Ver Canchas
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-2">🌿</div>
                <div className="font-bold text-[#2D2D2D]">
                  Entorno Natural
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Vistas a la precordillera
                </p>
              </div>
              <div className="bg-blue-100 rounded-2xl p-6 text-center mt-8">
                <div className="text-4xl mb-2">🏅</div>
                <div className="font-bold text-[#2D2D2D]">
                  Campeones
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  +50 títulos regionales
                </p>
              </div>
              <div className="bg-blue-50 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-2">👶</div>
                <div className="font-bold text-[#2D2D2D]">
                  Escuela Infantil
                </div>
                <p className="text-sm text-gray-600 mt-1">Desde 5 años</p>
              </div>
              <div className="bg-blue-50 rounded-2xl p-6 text-center mt-8">
                <div className="text-4xl mb-2">💪</div>
                <div className="font-bold text-[#2D2D2D]">
                  Fitness
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Gym y piscina incluidos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#1565C0] font-semibold text-sm uppercase tracking-wider">
            Por Qué Elegirnos
          </span>
          <h2 className="section-title mt-2">Todo lo que Necesitas</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            En PlayTenis Chicureo encontrarás las mejores instalaciones y
            servicios para disfrutar el tenis al máximo.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="card text-left">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-[#2D2D2D] text-lg mb-2">
                  {f.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#1565C0] font-semibold text-sm uppercase tracking-wider">
            Membersías
          </span>
          <h2 className="section-title mt-2">Planes para Todos</h2>
          <p className="section-subtitle max-w-xl mx-auto">
            Elige el plan que mejor se adapte a ti y tu familia. Todos los
            precios en pesos chilenos (CLP).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 relative ${
                  plan.highlight
                    ? "bg-[#1565C0] text-white shadow-2xl scale-105"
                    : "bg-gray-50 text-gray-800 shadow-md"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white text-[#1565C0] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
                    Más Popular
                  </div>
                )}
                <h3
                  className={`text-xl font-bold mb-2 ${
                    plan.highlight ? "text-white" : "text-[#2D2D2D]"
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span
                    className={`text-sm ${
                      plan.highlight ? "text-white/70" : "text-gray-500"
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm">
                      <span
                        className={`mt-0.5 ${
                          plan.highlight ? "text-white" : "text-[#1565C0]"
                        }`}
                      >
                        ✓
                      </span>
                      <span
                        className={plan.highlight ? "text-white/90" : "text-gray-600"}
                      >
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/socios"
                  className={`block text-center py-3 rounded-xl font-bold transition-colors ${
                    plan.highlight
                      ? "bg-white text-[#1565C0] hover:bg-blue-50"
                      : "bg-[#1565C0] text-white hover:bg-[#0D47A1]"
                  }`}
                >
                  Comenzar
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section id="contacto" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#1565C0] font-semibold text-sm uppercase tracking-wider">
                Ubicación y Contacto
              </span>
              <h2 className="section-title mt-2">Encuéntranos en Chicureo</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Estamos ubicados en el sector de Chicureo, Colina.
                Fácil acceso desde la Autopista del Sol y Las Condes.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <div className="font-semibold text-[#2D2D2D]">
                      Dirección
                    </div>
                    <div className="text-gray-600">
                      San Vicente de Lo Arcaya 1, Colina, Santiago
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📞</span>
                  <div>
                    <div className="font-semibold text-[#2D2D2D]">
                      Teléfono
                    </div>
                    <div className="text-gray-600">+56 2 2345 6789</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✉️</span>
                  <div>
                    <div className="font-semibold text-[#2D2D2D]">
                      Email
                    </div>
                    <div className="text-gray-600">info@playtenis.cl</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🕐</span>
                  <div>
                    <div className="font-semibold text-[#2D2D2D]">
                      Horario
                    </div>
                    <div className="text-gray-600">
                      Lunes a Domingo: 07:00 – 22:00 hrs
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 rounded-2xl p-8 text-center">
              <div className="text-6xl mb-4">🗻️</div>
              <h3 className="text-[#2D2D2D] font-bold text-xl mb-2">
                Chicureo, Colina
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                A 25 minutos del centro de Santiago, rodeado del paisaje
                natural de la precordillera andina.
              </p>
              <div className="bg-white rounded-xl p-4 text-left text-sm text-gray-600 space-y-1">
                <p>
                  <strong>Desde Autopista del Sol:</strong> Salida Chicureo,
                  luego 5 km norte
                </p>
                <p>
                  <strong>Desde Las Condes:</strong> Av. El Rodeo hacia
                  Colina, sector Chicureo (San Vicente de Lo Arcaya)
                </p>
                <p>
                  <strong>Transporte público:</strong> Micro 422 desde
                  Bilbao con Lo Encañado
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20"
        style={{
          background:
            "linear-gradient(135deg, #1a1a1a 0%, #2D2D2D 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-4xl font-black text-white mb-4">
            ¿Listo para Jugar?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Reserva tu cancha en minutos o únete como socio y disfruta de
            todos los beneficios de PlayTenis Chicureo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/canchas"
              className="bg-[#1565C0] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#0D47A1] transition-colors"
            >
              Reservar Cancha
            </Link>
            <Link
              href="/socios"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors"
            >
              Ser Socio
            </Link>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
