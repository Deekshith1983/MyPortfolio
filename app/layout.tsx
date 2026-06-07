import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Deekshith S — Full Stack Developer",
  description:
    "Full Stack Developer with experience building scalable web applications using MERN Stack and Django. Specializing in Python, React, and modern web technologies. Based in Bengaluru, India.",
  keywords: [
    "Deekshith S",
    "Full Stack Developer",
    "MERN Stack",
    "Django",
    "Python Developer",
    "React Developer",
    "Bengaluru",
    "Portfolio",
  ],
  authors: [{ name: "Deekshith S" }],
  openGraph: {
    title: "Deekshith S — Full Stack Developer",
    description:
      "Full Stack Developer specializing in MERN Stack, Django & Python. Building scalable, impactful web applications.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deekshith S — Full Stack Developer",
    description:
      "Full Stack Developer specializing in MERN Stack, Django & Python.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
