export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0 }}>
        <div style={{ padding: 16, borderBottom: "1px solid #e5e7eb" }}>
          <strong>Motorama</strong> — Next.js Starter
        </div>
        <div style={{ padding: 16 }}>{children}</div>
      </body>
    </html>
  );
}
