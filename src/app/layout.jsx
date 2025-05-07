import { Geist, Geist_Mono, DM_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "MovieApp",
    template: "%s | MovieApp",
  },
  description: "",
};

// import JustWatch from 'justwatch-api';

export default async function RootLayout({ children }) {
  // const just = async () =>{
  //   const justwatch = new JustWatch({locale: 'en_US'})
  //   const search = await justwatch.search({query: 'Inception'})
  //   console.log(search);

  // }

  // just()

  //const pbRes = await fetch(
  //  `https://apibay.org/q.php?q=${encodeURIComponent("Inception")}&cat=201`,
  //);
  //const data = await pbRes.json();
  //console.log(data);

  return (
    <html lang="en" className="bg-[#070816]">
      <body
        // className={`antialiased h-screen bg-[#070816]`}
        className={`${dmSans.variable} ${geistSans.variable} ${geistMono.variable} antialiased h-full bg-[#070816]`}
      >
        <div className="">{children}</div>
      </body>
    </html>
  );
}
