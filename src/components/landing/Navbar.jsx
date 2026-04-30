import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/logo.png"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: "Beranda",    href: "#beranda"    },
    { label: "Layanan",    href: "#layanan"    },
    { label: "Cara Pakai", href: "#cara-pakai" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="relative flex items-center justify-between h-16">

          {/* Kiri — logo (desktop) / hamburger (mobile) */}
          <div className="flex items-center gap-3 z-10">

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>

            {/* Logo — desktop only */}
            <div className="hidden md:flex items-center gap-3">
              <img
                src={logo}
                alt="e-RT Logo"
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>

          {/* Tengah — nav links desktop only */}
          <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-slate-500 hover:text-primary-700 font-medium transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Kanan — tombol Masuk selalu tampil */}
          <button
            onClick={() => navigate("/login")}
            className="bg-primary-700 hover:bg-primary-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-150 hover:shadow-md hover:-translate-y-px active:translate-y-0 z-10"
          >
            Masuk
          </button>

        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-5 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-slate-600 hover:text-primary-700 font-medium py-1 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}