import { FiChevronDown } from "react-icons/fi";
import { formatTanggal } from "../../utils/format";
import { STATUS_CONFIG } from "../../utils/Status";
import StatusBadge from "../admin/StatusBadge";

export default function RiwayatCardHeader({ item, isOpen, onToggle }) {
  const cfg = STATUS_CONFIG[item.status];

  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-slate-50 transition-colors"
    >
      <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${cfg.dot}`} />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800 truncate">
          {item.jenis}
        </p>
        <p className="text-xs text-slate-400 font-normal mt-0.5">
          {item.kode} · {formatTanggal(item.created_at)}
        </p>
      </div>

      <StatusBadge status={item.status} />

      <FiChevronDown
        className={`w-4 h-4 text-slate-300 shrink-0 transition-transform ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>
  );
}