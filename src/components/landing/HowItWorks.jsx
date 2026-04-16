import { FiUser, FiFileText, FiEdit, FiCheckCircle, FiInfo  } from "react-icons/fi";

const STEPS = [
  {
    number: "01",
    title: "Login dengan NIK",
    desc: "Masuk menggunakan Nomor Induk Kependudukan (NIK) dan password yang sudah diberikan oleh pengurus RT.",
    icon: <FiUser className="w-6 h-6" />,
  },
  {
    number: "02",
    title: "Pilih Jenis Surat",
    desc: "Pilih jenis surat keterangan yang kamu butuhkan dari daftar layanan yang tersedia di dashboard.",
    icon: <FiFileText className="w-6 h-6" />,
  },
  {
    number: "03",
    title: "Isi & Kirim Formulir",
    desc: "Lengkapi formulir pengajuan secara online. Beberapa data sudah otomatis terisi dari profil akunmu.",
    icon: <FiEdit className="w-6 h-6" />,
  },
  {
    number: "04",
    title: "Lacak & Ambil Surat",
    desc: "Pantau status pengajuan secara real-time. Setelah selesai, surat bisa diambil langsung ke pengurus RT.",
    icon: <FiCheckCircle className="w-6 h-6" />,
  },
];

export default function HowItWorks() {
  return (
    <section id="cara-pakai" className="py-20 px-5 sm:px-8 bg-slate-50">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-primary-50 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full border border-primary-100 mb-4 tracking-wide uppercase">
            Cara Penggunaan
          </span>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-slate-900 mb-3">
            Mudah dalam 4 langkah
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Proses pengajuan surat sepenuhnya online. Tidak perlu datang ke rumah Pak RT untuk mulai mengajukan.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-primary-200 z-0" />

          {STEPS.map((step, idx) => (
            <div key={step.number} className="relative z-10 flex flex-col items-center text-center">
              {/* Number circle */}
              <div className="w-16 h-16 rounded-full bg-primary-700 text-white flex items-center justify-center mb-5 shadow-md ring-4 ring-white">
                {step.icon}
              </div>

              {/* Step number badge */}
              <span className="absolute top-0 right-[calc(50%-36px)] translate-x-full -translate-y-1 bg-slate-800 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                {step.number}
              </span>

              <h3 className="font-semibold text-slate-800 text-sm mb-2">{step.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-normal max-w-[200px] mx-auto">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Info note */}
        <div className="mt-12 bg-primary-50 border border-primary-100 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 max-w-2xl mx-auto">
          <div className="w-9 h-9 rounded-xl bg-primary-100 flex items-center justify-center shrink-0 text-primary-700">
            <FiInfo />
          </div>
          <p className="text-primary-800 text-xs font-normal leading-relaxed">
            <strong className="font-semibold">Belum punya akun?</strong> Hubungi pengurus RT untuk mendaftarkan NIK kamu ke sistem. Pendaftaran dilakukan langsung oleh pengurus, bukan melalui portal ini.
          </p>
        </div>
      </div>
    </section>
  );
}