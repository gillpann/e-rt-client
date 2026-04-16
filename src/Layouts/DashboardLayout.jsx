import { useState } from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { FiLogOut, FiMenu } from "react-icons/fi";

// Terima props `navItems` dan `role` biar bisa dipakai warga & admin
export default function DashboardLayout({ navItems, role = "warga", userName = "Warga" }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-poppins flex">

      {/* ── Overlay mobile ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-60 bg-white border-r border-slate-100 z-30
          flex flex-col transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-slate-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary-700 flex items-center justify-center shrink-0 shadow-sm">
            <span className="text-white font-bold text-sm">RT</span>
          </div>
          <div className="leading-tight">
            <p className="font-semibold text-slate-800 text-sm leading-none">e-RT Warga</p>
            <p className="text-[10px] text-slate-400 font-normal leading-none mt-0.5">RT 03 / RW 08</p>
          </div>
        </div>

        {/* Role badge */}
        <div className="px-5 pt-5 pb-2">
          <span className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-1 rounded-md
            ${role === "admin"
              ? "bg-amber-50 text-amber-700 border border-amber-100"
              : "bg-primary-50 text-primary-700 border border-primary-100"
            }`}>
            {role === "admin" ? "Pengurus RT" : "Warga"}
          </span>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-2 flex flex-col gap-0.5 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
                ${isActive
                  ? "bg-primary-700 text-white shadow-sm"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`w-5 h-5 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`}>
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className={`ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-full
                      ${isActive ? "bg-white/20 text-white" : "bg-primary-100 text-primary-700"}`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="px-3 py-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-3 py-2 mb-1">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
              <span className="text-primary-700 font-semibold text-xs">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-800 text-sm font-semibold truncate">{userName}</p>
              <p className="text-slate-400 text-[12px] font-normal truncate capitalize">{role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-150 font-medium"
          >
            <FiLogOut className="w-5 h-5 shrink-0" />
            Keluar
          </button>
        </div>
      </aside>

      {/* ── MAIN AREA ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar mobile */}
        <header className="lg:hidden bg-white border-b border-slate-100 px-5 py-3.5 flex items-center justify-between sticky top-0 z-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition"
          >
            <FiMenu className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
            <span className="text-primary-700 font-semibold text-xs">
              {userName.charAt(0).toUpperCase()}
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-5 sm:p-7">
          <Outlet />
        </main>
      </div>
    </div>
  );
}