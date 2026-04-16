import { STATUS_CONFIG } from "../../utils/Status";

const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status];

  return (
    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
      {cfg.label}
    </span>
  );
};

export default StatusBadge;