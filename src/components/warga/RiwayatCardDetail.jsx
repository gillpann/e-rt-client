import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { formatTanggal } from "../../utils/format";

const STEPS = ["menunggu", "diproses", "selesai"];

export default function RiwayatCardDetail({ item }) {
  const curIdx = STEPS.indexOf(item.status);

  return (
    <div className="border-t border-slate-100 px-5 py-4 bg-slate-50">

      {/* Info grid */}
      <div className="grid grid-cols-2 gap-3 text-xs mb-3">
        <div>
          <p className="text-slate-400 font-normal">Keperluan</p>
          <p className="text-slate-700 font-medium mt-0.5">{item.keperluan}</p>
        </div>
        <div>
          <p className="text-slate-400 font-normal">Tanggal Pengajuan</p>
          <p className="text-slate-700 font-medium mt-0.5">{formatTanggal(item.created_at)}</p>
        </div>
        {item.keterangan && (
          <div className="col-span-2">
            <p className="text-slate-400 font-normal">Keterangan</p>
            <p className="text-slate-700 font-medium mt-0.5">{item.keterangan}</p>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-1.5 mt-3">
        {STEPS.map((s, idx) => {
          const isDone = item.status === "ditolak" ? s === "menunggu" : idx <= curIdx;
          return (
            <div
              key={s}
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

      {/* Ditolak */}
      {item.status === "ditolak" && item.catatan && (
        <div className="mt-3 flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl px-3 py-2.5">
          <FiAlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <p className="text-xs text-red-600 font-normal">{item.catatan}</p>
        </div>
      )}

      {/* Selesai */}
      {item.status === "selesai" && (
        <div className="mt-3 flex items-start gap-2 bg-primary-50 border border-primary-100 rounded-xl px-3 py-2.5">
          <FiCheckCircle className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
          <p className="text-xs text-primary-700 font-normal">
            Surat sudah selesai. Silakan ambil ke pengurus RT.
          </p>
        </div>
      )}
    </div>
  );
}