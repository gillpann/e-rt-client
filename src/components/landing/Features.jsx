import { LAYANAN } from "../../utils/constants";

export default function Features() {
  return (
    <section id="layanan" className="py-20 px-5 sm:px-8 bg-white">
      <div className="max-w-6xl mx-auto">

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {LAYANAN.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group bg-slate-50 hover:bg-primary-50 border border-slate-100 hover:border-primary-200 rounded-2xl p-6 transition-all duration-200 cursor-default"
              >
                <div className="w-10 h-10 bg-white group-hover:bg-primary-100 border border-slate-100 rounded-xl flex items-center justify-center mb-4 transition-all">
                  <Icon className="w-5 h-5 text-slate-400 group-hover:text-primary-600 transition-colors" />
                </div>
                <h3 className="font-semibold text-slate-800 text-sm mb-2 group-hover:text-primary-800 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-slate-400 mt-8 font-normal">
          Butuh surat lain? Hubungi pengurus RT secara langsung.
        </p>
      </div>
    </section>
  );
}