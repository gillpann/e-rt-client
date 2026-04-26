import { FiChevronDown, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { formatTanggal } from "../../utils/format";
import { STATUS_CONFIG } from "../../utils/Status";
import StatusBadge from "../common/StatusBadge";

const PROGRESS_STEPS = ["menunggu", "diproses", "selesai"];

function ProgressBar({ status }) {
  const curIdx = PROGRESS_STEPS.indexOf(status);

  return (
    <div className="mt-3">
      <div className="flex items-center gap-1.5">
        {PROGRESS_STEPS.map((step, idx) => {
          const isDone = status === "ditolak" ? step === "menunggu" : idx <= curIdx;
          return (
            <div
              key={step}
              className={`h-1.5 rounded-full flex-1 transition-colors ${
                isDone ? "bg-primary-500" : "bg-slate-200"
              }`}
            />
          );
        })}
      </div>
      <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-normal">
        <span>Diterima</span>
        <span>Diproses</span>
        <span>Selesai</span>
      </div>
    </div>
  );
}

function StatusNotification({ status, catatan }) {
  if (status === "ditolak" && catatan) {
    return (
      <div className="mt-3 flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl px-3 py-2.5">
        <FiAlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
        <p className="text-xs text-red-600 font-normal">{catatan}</p>
      </div>
    );
  }

  if (status === "selesai") {
    return (
      <div className="mt-3 flex items-start gap-2 bg-primary-50 border border-primary-100 rounded-xl px-3 py-2.5">
        <FiCheckCircle className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
        <p className="text-xs text-primary-700 font-normal">
          Surat sudah selesai. Silakan ambil ke pengurus RT.
        </p>
      </div>
    );
  }

  return null;
}

export default function RiwayatCard({ item, isOpen, toggle }) {
  const cfg = STATUS_CONFIG[item.status];

  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">

      {/* ── Header (tombol toggle) ── */}
      <button
        onClick={() => toggle(item.id)}
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

      {isOpen && (
        <div className="border-t border-slate-100 px-5 py-4 bg-slate-50">

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-3 text-xs mb-3">
            <div>
              <p className="text-slate-400 font-normal">Keperluan</p>
              <p className="text-slate-700 font-medium mt-0.5">{item.keperluan}</p>
            </div>
            <div>
              <p className="text-slate-400 font-normal">Tanggal Pengajuan</p>
              <p className="text-slate-700 font-medium mt-0.5">
                {formatTanggal(item.created_at)}
              </p>
            </div>
            {item.keterangan && (
              <div className="col-span-2">
                <p className="text-slate-400 font-normal">Keterangan</p>
                <p className="text-slate-700 font-medium mt-0.5">{item.keterangan}</p>
              </div>
            )}
          </div>

          <ProgressBar status={item.status} />
          <StatusNotification status={item.status} catatan={item.catatan} />

        </div>
      )}
    </div>
  );
}