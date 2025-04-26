// import { Geist, Geist_Mono, DM_Mono } from "next/font/google";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: {
    default: "MovieApp",
    template: "%s | MovieApp",
  },
  description: "",
};

export default async function RootLayout({ children }) {

  return (
    <html lang="en" className="bg-[#141626]">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased h-full bg-[#141626]`}
      >
        <div className="">{children}</div>
      </body>
    </html>
  );
}
