import { formatTanggal } from "../../utils/format";
import { STATUS_CONFIG } from "../../utils/Status";
import { FiClock, FiRefreshCw, FiCheckCircle, FiFileText } from "react-icons/fi";

const STATUS_ICON = {
  menunggu: <FiClock className="w-4 h-4" />,
  diproses: <FiRefreshCw className="w-4 h-4" />,
  selesai:  <FiCheckCircle className="w-4 h-4" />,
};

const TIMELINE_STEPS = ["Diterima", "Diproses", "Selesai"];
const STEP_MAP = { menunggu: 0, diproses: 1, selesai: 2 };

const Timeline = ({ status }) => {
  const activeStep = STEP_MAP[status] ?? 0;

  return (
    <div className="flex items-center gap-0 mt-4 mb-1">
      {TIMELINE_STEPS.map((label, idx) => {
        const done    = idx <= activeStep;
        const current = idx === activeStep;

        return (
          <div key={label} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              {/* Dot */}
              <div className={`w-2.5 h-2.5 rounded-full border-2 transition-all
                ${done
                  ? "bg-primary-600 border-primary-600"
                  : "bg-white border-slate-200"
                }
                ${current ? "ring-4 ring-primary-100" : ""}
              `} />
              {/* Label */}
              <p className={`text-[10px] mt-1.5 font-medium
                ${done ? "text-primary-600" : "text-slate-300"}
              `}>
                {label}
              </p>
            </div>

            {/* Connector line */}
            {idx < TIMELINE_STEPS.length - 1 && (
              <div className={`h-0.5 flex-1 mb-4 transition-all
                ${idx < activeStep ? "bg-primary-500" : "bg-slate-100"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default function RiwayatCard({ item }) {
  const cfg       = STATUS_CONFIG[item.status];
  const isSelesai = item.status === "selesai";

  return (
    <div className={`bg-white rounded-2xl border overflow-hidden transition-all
      ${isSelesai ? "border-primary-100" : "border-slate-100"}
    `}>

      {/* Top accent bar */}
      <div className={`h-1 w-full ${
        item.status === "selesai"  ? "bg-primary-500" :
        item.status === "diproses" ? "bg-blue-400"    :
        "bg-amber-300"
      }`} />

      <div className="px-5 pt-4 pb-5">

        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-800 leading-snug">
              {item.jenis}
            </p>
            <p className="text-[11px] text-slate-400 font-normal mt-0.5">
              {item.kode} - {
                item.status === "selesai" && item.tanggal_selesai
                  ? `Selesai ${formatTanggal(item.tanggal_selesai)}`
                  : `Diajukan ${formatTanggal(item.created_at)}`
              }
            </p>
          </div>

          {/* Status badge */}
          <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold
            px-2.5 py-1 rounded-full border shrink-0
            ${cfg.bg} ${cfg.text} ${cfg.border}`}>
            {STATUS_ICON[item.status]}
            {cfg.label}
          </span>
        </div>

        {/* Info row */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 bg-slate-50 rounded-xl px-3.5 py-2.5">
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide mb-0.5">
              Keperluan
            </p>
            <p className="text-xs font-semibold text-slate-700">{item.keperluan}</p>
          </div>

          {item.nama_pemohon && (
            <div className="flex-1 bg-slate-50 rounded-xl px-3.5 py-2.5">
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide mb-0.5">
                Pemohon
              </p>
              <p className="text-xs font-semibold text-slate-700">{item.nama_pemohon}</p>
            </div>
          )}
        </div>

        {/* Timeline */}
        <Timeline status={item.status} />

        {/* Notif selesai */}
        {item.status === "selesai" && (
          <div className="mt-3 flex items-center gap-2 bg-primary-50 border border-primary-100 rounded-xl px-3.5 py-2.5">
            <FiCheckCircle className="w-3.5 h-3.5 text-primary-600 shrink-0" />
            <p className="text-[11px] text-primary-700 font-medium">
              Surat sudah selesai. Silakan ambil ke pengurus RT.
            </p>
          </div>
        )}

        {/* Notif diproses */}
        {item.status === "diproses" && (
          <div className="mt-3 flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-3.5 py-2.5">
            <FiRefreshCw className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <p className="text-[11px] text-blue-600 font-medium">
              Surat sedang diproses oleh pengurus RT.
            </p>
          </div>
        )}

        {/* Notif menunggu */}
        {item.status === "menunggu" && (
          <div className="mt-3 flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-xl px-3.5 py-2.5">
            <FiClock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <p className="text-[11px] text-amber-600 font-medium">
              Menunggu dikonfirmasi pengurus RT.
            </p>
          </div>
        )}

        {/* Catatan jika ada */}
        {item.keterangan && (
          <div className="mt-2 px-3.5 py-2.5 bg-slate-50 rounded-xl">
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide mb-0.5">
              Catatan
            </p>
            <p className="text-xs text-slate-600">{item.keterangan}</p>
          </div>
        )}

      </div>
    </div>
  );
}