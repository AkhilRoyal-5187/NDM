"use client";
import NavBar from "./Navbar";
import Footer from "./Footer";

export default function ClientLayout({ children }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
} 