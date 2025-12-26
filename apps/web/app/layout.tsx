import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Motorama",
  description: "AI design studio and compendium for automotive innovation."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="page">
          <header className="site-header">
            <div className="brand">
              <span className="brand-mark">M</span>
              <div>
                <p className="brand-name">Motorama</p>
                <p className="brand-tagline">Design intelligence for automotive visionaries.</p>
              </div>
            </div>
            <nav className="nav">
              <a href="#design">Design Studio</a>
              <a href="#compendium">Compendium</a>
              <a href="#workflow">Workflow</a>
            </nav>
          </header>
          {children}
          <footer className="site-footer">
            <p>Motorama · AI-assisted vehicle design & historical archive</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
