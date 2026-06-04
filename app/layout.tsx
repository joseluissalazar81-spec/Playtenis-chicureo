import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PlayTenis Chicureo",
  description: "Academia de Tenis en Chicureo, Lo Barnechea. Reservas, torneos y ranking.",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="PlayTenis" />
        <meta name="theme-color" content="#2D2D2D" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
