import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import PhotoAlbum from "../components/PhotoAlbum";
import Silk from "../components/Silk";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Arweave Day Asia</title>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <div
        className={`${geistSans.className} ${geistMono.className} font-sans min-h-screen relative`}
      >
      {/* Silk Background */}
      <div className="fixed inset-0 z-0">
        <Silk
          speed={5}
          scale={1}
          color="#10B981"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>


      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 relative z-10">
        <PhotoAlbum />
      </div>
      </div>
    </>
  );
}
