import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abuzar Sayyed - Full-Stack Developer & UI/UX Designer",
  description: "Portfolio of Abuzar Sayyed - React, Node.js, Tailwind CSS developer from India. View projects like Hotel Theme",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script type="text/javascript" src="https://embeds.iubenda.com/widgets/d94344cc-642e-4513-9507-7a1f1b324745.js" async defer></script> 
      {/* Google tag (gtag.js) */}
      <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-9T2D933YZV"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              // Default: sab denied – iubenda accept karne pe granted karega
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied'
              });

              // IP anonymize (GDPR ke liye best)
              gtag('config', 'G-9T2D933YZV', {
                anonymize_ip: true
              });
            `,
          }}
        />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
