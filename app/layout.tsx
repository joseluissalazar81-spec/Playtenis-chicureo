import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "PlayTenis Chicureo | Club de Tenis en Lo Barnechea",
  description:
    "El mejor club de tenis en Chicureo, Lo Barnechea. Canchas de alta calidad, torneos, socios y reservas online.",
};

function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#2D2D2D]/95 backdrop-blur-sm shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo.jpeg"
              alt="PlayTenis Chicureo"
              width={44}
              height={44}
              className="rounded-full group-hover:scale-105 transition-transform"
            />
            <div className="hidden sm:block">
              <span className="text-white font-bold text-lg leading-tight block">
                PlayTenis
              </span>
              <span className="text-[#E8450A] text-xs font-medium tracking-wide">
                CHICUREO
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/"
              className="text-white/80 hover:text-[#E8450A] px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/canchas"
              className="text-white/80 hover:text-[#E8450A] px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Canchas
            </Link>
            <Link
              href="/socios"
              className="text-white/80 hover:text-[#E8450A] px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Socios
            </Link>
            <Link
              href="/torneos"
              className="text-white/80 hover:text-[#E8450A] px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Torneos
            </Link>
            <Link
              href="/canchas"
              className="ml-2 bg-[#E8450A] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#b33408] transition-colors hidden sm:inline-block"
            >
              Reservar
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[#2D2D2D] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image src="/logo.jpeg" alt="PlayTenis" width={40} height={40} className="rounded-full" />
              <div>
                <span className="text-white font-bold text-lg block">PlayTenis</span>
                <span className="text-[#E8450A] text-xs font-medium tracking-wide">
                  CHICUREO
                </span>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              El club de tenis más exclusivo de Chicureo, Lo Barnechea. Canchas
              profesionales, comunidad apasionada.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-[#E8450A] mb-4">Navegación</h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/canchas" className="hover:text-white transition-colors">
                  Reserva de Canchas
                </Link>
              </li>
              <li>
                <Link href="/socios" className="hover:text-white transition-colors">
                  Gestión de Socios
                </Link>
              </li>
              <li>
                <Link href="/torneos" className="hover:text-white transition-colors">
                  Torneos y Rankings
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[#E8450A] mb-4">Contacto</h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>📍 Av. Chicureo 1250, Lo Barnechea</li>
              <li>📞 +56 2 2345 6789</li>
              <li>✉️ info@playtenis.cl</li>
              <li>🕐 Lun–Dom: 07:00 – 22:00</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-6 text-center text-white/50 text-sm">
          © 2025 PlayTenis Chicureo. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-50 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
