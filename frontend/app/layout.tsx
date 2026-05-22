import "./globals.css";

export const metadata = {
  title: "PromptHire AI",
  description: "AI-Native Developer Assessment Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-900">
        {children}
      </body>
    </html>
  );
}