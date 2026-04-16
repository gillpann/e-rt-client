import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiChevronLeft, FiAlertCircle, FiLoader } from "react-icons/fi";

export default function LoginPage() {
  const navigate = useNavigate();
  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!nik || !password) {
      setError("NIK dan password wajib diisi.");
      return;
    }
    if (nik.length < 16) {
      setError("NIK harus 16 digit.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await api.post("/auth/login", { nik, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("userName", data.user.nama);

      if (data.user.role === "admin") navigate("/admin");
      else navigate("/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Login gagal. Coba lagi.");
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-poppins">

      {/* Top bar */}
      <div className="bg-white border-b border-slate-100 px-6 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-slate-500 hover:text-primary-700 text-sm transition-colors"
        >
          <FiChevronLeft className="w-4 h-4" />
          Kembali
        </button>
        <div className="h-4 w-px bg-slate-200" />
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-primary-700 flex items-center justify-center">
            <span className="text-white font-bold text-[9px]">RT</span>
          </div>
          <span className="text-slate-700 font-semibold text-sm">e-RT Warga</span>
        </div>
      </div>

      {/* Center */}
      <div className="flex-1 flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-sm">
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm px-8 py-9">

            <div className="text-center mb-7">
              <div className="w-12 h-12 rounded-2xl bg-primary-700 flex items-center justify-center mx-auto mb-4 shadow">
                <span className="text-white font-bold text-base">RT</span>
              </div>
              <h1 className="font-bold text-slate-900 text-xl mb-1">Selamat Datang</h1>
              <p className="text-slate-400 text-xs font-normal leading-relaxed">
                Masuk untuk mengajukan surat keterangan<br />RT 03 / RW 08
              </p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  NIK <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={16}
                  value={nik}
                  onChange={(e) => setNik(e.target.value.replace(/\D/g, ""))}
                  placeholder="16 digit Nomor Induk Kependudukan"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                />
                <p className="text-[10px] text-slate-400 mt-1 font-normal">{nik.length}/16 digit</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Password <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                    tabIndex={-1}
                  >
                    {showPass ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl px-4 py-3">
                  <FiAlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-700 hover:bg-primary-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-xl transition-all duration-150 hover:shadow-md hover:-translate-y-px active:translate-y-0 mt-1 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <FiLoader className="w-4 h-4 animate-spin" />
                    Memverifikasi...
                  </>
                ) : "Masuk"}
              </button>
            </form>
          </div>

          <div className="mt-5 text-center">
            <p className="text-xs text-slate-400 font-normal leading-relaxed">
              Belum punya akun?{" "}
              <span className="text-primary-700 font-medium">Hubungi pengurus RT 03</span>{" "}
              untuk didaftarkan.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center py-4 text-[10px] text-slate-300 font-normal">
        © {new Date().getFullYear()} e-RT Warga · RT 03 / RW 08
      </div>
    </div>
  );
}