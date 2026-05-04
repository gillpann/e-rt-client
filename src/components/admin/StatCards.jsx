import { STAT_CARDS } from "../../utils/constants"

const StatCards = ({ counts, setFilter }) => {
  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {STAT_CARDS.map(({ key, label, bg, border, color, labelColor, iconBg, iconColor, Icon }) => (
        <button
          key={key}
          onClick={() => setFilter(label)}
          className={`${bg} border ${border} rounded-2xl p-4 text-left hover:opacity-75 transition-opacity flex items-center gap-3`}
        >
          <div className={`${iconBg} ${iconColor} w-10 h-10 rounded-xl flex items-center justify-center shrink-0`}>
            <Icon size={18} />
          </div>
          <div>
            <p className={`font-medium text-2xl ${color}`}>{counts[key]}</p>
            <p className={`text-xs ${labelColor} mt-0.5`}>{label}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default StatCards;