import type { Metadata } from "next";
import "@/assets/styles/main.scss";

export const metadata: Metadata = {
  title: "Event Planner",
  description: "Calendario",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
