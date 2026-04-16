export default function RiwayatFilter({ filter, setFilter, filters }) {
  return (
    <div className="flex gap-2 flex-wrap mb-5">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`text-xs font-medium px-3.5 py-1.5 rounded-full border transition-all
            ${
              filter === f
                ? "bg-primary-700 text-white border-primary-700"
                : "bg-white text-slate-500 border-slate-200 hover:border-primary-300 hover:text-primary-700"
            }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}