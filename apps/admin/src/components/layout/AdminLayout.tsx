import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-base-black">
      <Sidebar />
      <div className="lg:pl-60">
        <main className="mx-auto max-w-6xl px-6 py-8 md:px-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
