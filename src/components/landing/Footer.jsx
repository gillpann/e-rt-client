export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 px-5 sm:px-8 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary-700 flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-sm">RT</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-none">e-RT Warga</p>
              <p className="text-slate-500 text-[11px] leading-none mt-1 font-normal">
                RT 03 / RW 08
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-5">
            {["Beranda", "Layanan", "Cara Pakai"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-xs text-slate-400 hover:text-white transition-colors font-normal"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 my-6" />

        <div className="flex flex-col sm:flex-row justify-between gap-2 text-[11px]">
          <p>© {year} e-RT Warga · RT 03 / RW 08. Seluruh hak dilindungi.</p>
          <p className="text-slate-500 font-normal">
            Platform layanan warga digital · Tidak diperjualbelikan
          </p>
        </div>
      </div>
    </footer>
  );
}