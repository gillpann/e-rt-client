const StatCards = ({ counts, setFilter }) => {
  const stats = [
    { key: "menunggu", label: "Menunggu", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
    { key: "diproses", label: "Diproses", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
    { key: "selesai", label: "Selesai", color: "text-primary-700", bg: "bg-primary-50", border: "border-primary-100" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      {stats.map((s) => (
        <button key={s.key} onClick={() => setFilter(s.label)}
          className={`${s.bg} border ${s.border} rounded-2xl p-4 text-left`}>
          <p className={`font-bold text-2xl ${s.color}`}>{counts[s.key]}</p>
          <p className={`text-xs ${s.color}`}>{s.label}</p>
        </button>
      ))}
    </div>
  );
};

export default StatCards;