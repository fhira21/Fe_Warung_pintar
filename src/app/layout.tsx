import "./globals.css";
import TopBar from "@/components/TopBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 text-gray-800">
        <TopBar />
        {children}
      </body>
    </html>
  );
}
