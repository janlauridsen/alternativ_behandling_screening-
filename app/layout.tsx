export const metadata = {
  title: "Alternativ Behandling Screening",
  description:
    "Et orienteringsrum for nøgtern og informativ viden om alternativ behandling.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="da">
      <body
        style={{
          margin: 0,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          backgroundColor: "#ffffff",
          color: "#000000",
        }}
      >
        {children}
      </body>
    </html>
  );
}
