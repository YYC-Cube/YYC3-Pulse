import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import { i18n } from "../lib/i18n-config";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const baseUrl = "https://pulse.yyc3.top";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "YYC³ Pulse",
    template: "%s | YYC³ Pulse",
  },
  description:
    "万象归元于云枢 | 深栈智启新纪元 — All Realms Converge at Cloud Nexus, DeepStack Ignites a New Era.",
  generator: "YYC³ Pulse",
  keywords: [
    "YYC³",
    "YanYuCloudCube",
    "Pulse",
    "Cloud Nexus",
    "DeepStack",
  ],
  authors: [{ name: "YanYuCloudCube Team", url: baseUrl }],
  creator: "YanYuCloudCube Team",
  publisher: "YanYuCloudCube Team",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    alternateLocale: "en_US",
    siteName: "YYC³ Pulse",
    title: "YYC³ Pulse",
    description:
      "万象归元于云枢 | 深栈智启新纪元 — All Realms Converge at Cloud Nexus, DeepStack Ignites a New Era.",
    url: baseUrl,
    images: [
      {
        url: `${baseUrl}/yyc3-logo.png`,
        width: 1200,
        height: 630,
        alt: "YYC³ Pulse",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YYC³ Pulse",
    description:
      "万象归元于云枢 | 深栈智启新纪元 — All Realms Converge at Cloud Nexus, DeepStack Ignites a New Era.",
    images: [`${baseUrl}/yyc3-logo.png`],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-64.png", sizes: "64x64", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-256.png", sizes: "256x256", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href={baseUrl} />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
