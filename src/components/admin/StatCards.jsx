import { STAT_CARDS } from "../../utils/constants";

const StatCards = ({ counts, setFilter }) => {
  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {STAT_CARDS.map((s) => (
        <button
          key={s.key}
          onClick={() => setFilter(s.label)}
          className={`${s.bg} border ${s.border} rounded-2xl p-4 text-left hover:opacity-80 transition-opacity`}
        >
          <p className={`font-bold text-2xl ${s.color}`}>{counts[s.key]}</p>
          <p className={`text-xs ${s.color} mt-0.5`}>{s.label}</p>
        </button>
      ))}
    </div>
  );
};

export default StatCards;