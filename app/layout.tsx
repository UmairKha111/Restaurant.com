import "./globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        {/* ✅ FULL WIDTH NAVBAR (NO WRAPPER) */}
        <Navbar />

        {/* ✅ ONLY CONTENT IS IN CONTAINER */}
        <main className="w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
