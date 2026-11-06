import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://agrilien-001.vercel.app";

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "AgriLien | Marché agricole direct à Goma",
    template: "%s | AgriLien",
  },

  description:
    "AgriLien connecte directement les producteurs de Masisi, Rutshuru et Nyiragongo aux acheteurs de Goma. Consultez les récoltes, comparez les prix et contactez les vendeurs.",

  verification: {
    google: "Gqe-075G7phS8uv51LPITi0lJaDWvA-YMKjOmA50F_A",
  },

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "AgriLien — Vendez au meilleur prix, achetez directement",
    description:
      "La plateforme agricole locale qui rapproche producteurs et acheteurs à Goma.",
    type: "website",
    locale: "fr_CD",
    siteName: "AgriLien",
    url: "/",
    images: ["/logo-agrilien.jpg"],
  },

  twitter: {
    card: "summary_large_image",
    title: "AgriLien | Marché agricole direct à Goma",
    description: "Les producteurs et les acheteurs du Nord-Kivu réunis.",
    images: ["/logo-agrilien.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        {children}

        {gaId ? (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        ) : null}
      </body>
    </html>
  );
}
