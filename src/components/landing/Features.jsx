const LAYANAN = [
  {
    icon: "📄",
    title: "Surat Keterangan Domisili",
    desc: "Diperlukan untuk berbagai keperluan administrasi seperti pembukaan rekening, daftar sekolah, dan lainnya.",
  },
  {
    icon: "🪪",
    title: "Surat Pengantar KTP / KK",
    desc: "Surat pengantar dari RT untuk pengurusan KTP baru, perpanjangan, atau pembuatan Kartu Keluarga.",
  },
  {
    icon: "📋",
    title: "Surat Keterangan Tidak Mampu",
    desc: "Digunakan untuk keperluan beasiswa, keringanan biaya rumah sakit, atau bantuan sosial lainnya.",
  },
  {
    icon: "🏠",
    title: "Surat Keterangan Usaha",
    desc: "Menerangkan bahwa pemegang surat menjalankan usaha di wilayah RT ini.",
  },
  {
    icon: "✅",
    title: "Surat Keterangan Berkelakuan Baik",
    desc: "Surat pernyataan dari RT bahwa warga memiliki perilaku baik di lingkungan.",
  },
  {
    icon: "🔄",
    title: "Surat Keterangan Pindah",
    desc: "Digunakan saat warga akan berpindah alamat dari wilayah RT ini ke wilayah lain.",
  },
];

export default function Features() {
  return (
    <section id="layanan" className="py-20 px-5 sm:px-8 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-primary-50 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full border border-primary-100 mb-4 tracking-wide uppercase">
            Layanan Tersedia
          </span>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-slate-900 mb-3">
            Surat apa yang bisa diajukan?
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Berikut jenis surat yang tersedia di portal e-RT. Masuk dulu untuk mulai mengajukan.
          </p>
        </div>

        {/* Grid kartu layanan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {LAYANAN.map((item) => (
            <div
              key={item.title}
              className="group bg-slate-50 hover:bg-primary-50 border border-slate-100 hover:border-primary-200 rounded-2xl p-6 transition-all duration-200 cursor-default"
            >
              <div className="w-11 h-11 rounded-xl bg-white border border-slate-100 group-hover:border-primary-200 flex items-center justify-center text-xl mb-4 shadow-sm transition-all">
                {item.icon}
              </div>
              <h3 className="font-semibold text-slate-800 text-sm mb-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed font-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-xs text-slate-400 mt-8 font-normal">
          Butuh surat lain? Hubungi pengurus RT secara langsung.
        </p>
      </div>
    </section>
  );
}