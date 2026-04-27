const STATUS_COLOR = {
  Menunggu: "bg-amber-100 text-amber-600",
  Diproses: "bg-blue-100 text-blue-600",
  Selesai:  "bg-primary-100 text-primary-700",
};

export default function RiwayatFilter({ filter, setFilter, filters, counts }) {
  return (
    <div className="flex gap-2 flex-wrap mb-5">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-full border transition-all
            ${filter === f
              ? "bg-primary-700 text-white border-primary-700"
              : "bg-white text-slate-500 border-slate-200 hover:border-primary-300 hover:text-primary-700"
            }`}
        >
          {f}
          {f !== "Semua" && counts?.[f.toLowerCase()] > 0 && (
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none
              ${filter === f
                ? "bg-white/20 text-white"
                : STATUS_COLOR[f] || "bg-slate-100 text-slate-500"
              }`}>
              {counts[f.toLowerCase()]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}