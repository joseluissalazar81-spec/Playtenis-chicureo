import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "PlayTenis Chicureo | Academia de Tenis en Colina",
  description: "Academia de tenis en Chicureo, Colina. Clases, canchas, torneos y escalerilla. Contacto: +56 9 8158 8218",
};

function Navbar() {
  return (
    <header className="desktop-only fixed top-0 left-0 right-0 z-50 bg-[#CCE226]/95 backdrop-blur-sm shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <Image src="/logo.jpeg" alt="PlayTenis Chicureo" width={44} height={44} className="rounded-full group-hover:scale-105 transition-transform" />
            <div className="hidden sm:block">
              <span className="text-[#1d2433] font-bold text-lg leading-tight block">PlayTenis</span>
              <span className="text-[#8B2E05] text-xs font-medium tracking-wide">ACADEMIA · COLINA</span>
            </div>
          </Link>
          <div className="flex items-center gap-1 sm:gap-2">
            <Link href="/" className="text-[#1d2433]/80 hover:text-[#8B2E05] px-3 py-2 rounded-md text-sm font-medium transition-colors">Inicio</Link>
            <Link href="/canchas" className="text-[#1d2433]/80 hover:text-[#8B2E05] px-3 py-2 rounded-md text-sm font-medium transition-colors">Canchas</Link>
            <Link href="/socios" className="text-[#1d2433]/80 hover:text-[#8B2E05] px-3 py-2 rounded-md text-sm font-medium transition-colors">Socios</Link>
            <Link href="/torneos" className="text-[#1d2433]/80 hover:text-[#8B2E05] px-3 py-2 rounded-md text-sm font-medium transition-colors">Torneos</Link>
            <a href="https://wa.me/56981588218?text=Hola!%20Quiero%20reservar%20una%20cancha%20en%20PlayTenis." target="_blank" className="ml-2 bg-[#C1440E] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#8B2E05] transition-colors hidden sm:inline-block">
              Reservar
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="desktop-only bg-[#CCE226] text-[#1d2433]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image src="/logo.jpeg" alt="PlayTenis" width={40} height={40} className="rounded-full" />
              <div>
                <span className="text-[#1d2433] font-bold text-lg block">PlayTenis</span>
                <span className="text-[#8B2E05] text-xs font-medium tracking-wide">ACADEMIA · COLINA</span>
              </div>
            </div>
            <p className="text-[#1d2433]/70 text-sm leading-relaxed">Academia de tenis en Chicureo, Colina. Clases, canchas y torneos todo el año.</p>
          </div>
          <div>
            <h3 className="font-semibold text-[#8B2E05] mb-4">Navegación</h3>
            <ul className="space-y-2 text-[#1d2433]/70 text-sm">
              <li><Link href="/" className="hover:text-[#1d2433] transition-colors">Inicio</Link></li>
              <li><Link href="/canchas" className="hover:text-[#1d2433] transition-colors">Reserva de Canchas</Link></li>
              <li><Link href="/socios" className="hover:text-[#1d2433] transition-colors">Socios</Link></li>
              <li><Link href="/torneos" className="hover:text-[#1d2433] transition-colors">Torneos y Rankings</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[#8B2E05] mb-4">Contacto</h3>
            <ul className="space-y-2 text-[#1d2433]/70 text-sm">
              <li>📍 San Vicente de Lo Arcaya 1, Colina</li>
              <li>📞 +56 9 8158 8218</li>
              <li>📱 @playtenis.cl</li>
              <li>🕐 Lun–Dom: 09:00 – 23:00</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#1d2433]/20 mt-8 pt-6 text-center text-[#1d2433]/50 text-sm">
          © 2026 PlayTenis Chicureo. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="PlayTenis" />
        <meta name="theme-color" content="#CCE226" />
      </head>
      <body>
        <Navbar />
        <main className="desktop-main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
