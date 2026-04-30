import { FiEye, FiEyeOff, FiAlertCircle, FiLoader } from "react-icons/fi";
import logo from "../../assets/logo.png"

export default function LoginForm({
  nik,
  setNik,
  password,
  setPassword,
  showPass,
  setShowPass,
  error,
  loading,
  onSubmit,
}) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl shadow-sm px-8 py-9">

      {/* Header kartu */}
      <div className="text-center mb-7">
        <div className="flex items-center justify-center mx-auto">
          <img
            src={logo}
            alt="e-RT Logo"
            className="w-16 h-16 object-contain"
          />
        </div>
        <h1 className="font-bold text-slate-900 text-xl mb-1">Selamat Datang</h1>
        <p className="text-slate-400 text-xs font-normal leading-relaxed">
          Masuk untuk mengajukan surat keterangan<br />RT 03 / RW 08
        </p>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>

        {/* Input NIK */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            NIK <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="username"
            maxLength={16}
            value={nik}
            onChange={(e) => setNik(e.target.value.replace(/\D/g, ""))}
            placeholder="16 digit Nomor Induk Kependudukan"
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
          />
          <p className={`text-[10px] mt-1 font-normal transition-colors ${
            nik.length === 16 ? "text-primary-600" : "text-slate-400"
          }`}>
            {nik.length}/16 digit
          </p>
        </div>

        {/* Input Password */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Password <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPass((p) => !p)}
              aria-label={showPass ? "Sembunyikan password" : "Tampilkan password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
              tabIndex={-1}
            >
              {showPass ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        {/* Error alert */}
        {error && (
          <div
            role="alert"
            className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl px-4 py-3"
          >
            <FiAlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        {/* Tombol submit */}
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
  );
}