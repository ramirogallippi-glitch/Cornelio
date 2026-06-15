import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cornelio — Cucina Italiana dal 1924",
  description: "Restaurante italiano de alta gama en Buenos Aires. Pastas artesanales, antipastos sofisticados y una experiencia única en casona porteña.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
