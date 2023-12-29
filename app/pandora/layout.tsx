"use client";
import { Provider } from "react-redux";
import { store } from "@/store";

export default function PandoraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-[100vh] bg-primary font-quicksand ">
        <Provider store={store}>{children}</Provider>;
      </body>
    </html>
  );
}
