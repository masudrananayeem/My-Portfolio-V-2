import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CustomCursor } from "../common/CustomCursor";

export function Layout() {
  return (
    <div className="relative min-h-screen bg-base-black">
      <CustomCursor />
      <Navbar />
      <main className="pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
