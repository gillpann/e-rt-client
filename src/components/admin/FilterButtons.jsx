const FILTERS = ["Semua", "Menunggu", "Diproses", "Selesai", "Ditolak"];

const FilterButtons = ({ filter, setFilter }) => {
  return (
    <div className="flex gap-2 flex-wrap mb-4">
      {FILTERS.map((f) => (
        <button key={f} onClick={() => setFilter(f)}
          className={`text-xs px-3.5 py-1.5 rounded-full border
          ${filter === f ? "bg-primary-700 text-white" : "bg-white text-slate-500"}`}>
          {f}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;