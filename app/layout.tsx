import "./globals.css";
import type { ReactNode } from "react";
import { IBM_Plex_Sans, Source_Code_Pro } from "next/font/google";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans"
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-source-code"
});

export const metadata = {
  title: "FinMark Server Network Guide",
  description:
    "Interactive guide for configuring FinMark server adapters inside Oracle VirtualBox."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${plexSans.variable} ${sourceCodePro.variable}`}>
      <body>
        <div className="page-shell">
          <header className="page-header">
            <div className="header-accent" />
            <div>
              <p className="eyebrow">FinMark Ops</p>
              <h1>FinMark Server Network Blueprint</h1>
              <p className="lede">
                Single reference for provisioning the FinMark Windows VM inside
                Oracle VirtualBox with separated internet and internal network
                connectivity.
              </p>
            </div>
          </header>
          <main>{children}</main>
          <footer className="page-footer">
            <span>© {new Date().getFullYear()} FinMark Infrastructure</span>
            <span>Document version 1.0.0</span>
          </footer>
        </div>
      </body>
    </html>
  );
}
