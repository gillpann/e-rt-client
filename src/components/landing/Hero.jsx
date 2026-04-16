import { useNavigate } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section
      id="beranda"
      className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-slate-50 pt-20 pb-24 px-5 sm:px-8"
    >
      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-100 rounded-full opacity-40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-72 h-72 bg-primary-200 rounded-full opacity-20 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border border-primary-200">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-600 animate-pulse" />
            Layanan Warga Digital · RT 03 RW 08
          </div>

          {/* Headline */}
          <h1 className="font-poppins font-bold text-4xl sm:text-5xl md:text-6xl text-slate-900 leading-tight max-w-3xl mb-5">
            Urus Surat RT{" "}
            <span className="text-primary-700">Tanpa Keluar Rumah</span>
          </h1>

          {/* Subheadline */}
          <p className="text-slate-500 text-base sm:text-lg font-normal max-w-xl leading-relaxed mb-10">
            Platform pengajuan surat keterangan warga RT 03 secara online.
            Ajukan, lacak, dan ambil surat, semua lewat satu tempat.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <button
              onClick={() => navigate("/login")}
              className="bg-primary-700 hover:bg-primary-800 text-white font-semibold text-sm px-7 py-3.5 rounded-xl transition-all duration-150 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 min-w-[180px]"
            >
              Ajukan Surat Sekarang
            </button>
            <a
              href="#cara-pakai"
              className="text-primary-700 hover:text-primary-900 font-medium text-sm flex items-center gap-1.5 transition-colors"
            >
              Lihat cara pakainya
              <FiChevronDown />
            </a>
          </div>

          {/* Trust note */}
          <p className="mt-8 text-xs text-slate-400 font-normal">
            Khusus warga RT 03 / RW 08 · Data aman & terjaga privasi
          </p>
        </div>
      </div>
    </section>
  );
}