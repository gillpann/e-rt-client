import { FiX } from "react-icons/fi";
import { STATUS_CONFIG } from "../../utils/Status";
import { formatTanggal } from "../../utils/format";
import Modal from './../common/Modal';

const DetailModal = ({
  selected,
  setSelected,
  catatan,
  setCatatan,
  updateStatus,
  updating,
}) => {
  if (!selected) return null;

  return (
      <Modal onClose={() => setSelected(null)} maxWidth="max-w-md">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="font-bold text-slate-900 text-base">
              {selected.nama}
            </p>
            <p className="text-xs text-slate-400 font-normal">
              {selected.kode} · {formatTanggal(selected.created_at)}
            </p>
          </div>

          <button
            onClick={() => setSelected(null)}
            className="text-slate-400 hover:text-slate-600"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 mb-4 grid grid-cols-2 gap-3 text-xs">
          <div>
            <p className="text-slate-400">NIK</p>
            <p className="font-medium text-slate-700 mt-0.5">
              {selected.nik}
            </p>
          </div>

          <div>
            <p className="text-slate-400">Status</p>
            <span
              className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full border mt-0.5 ${STATUS_CONFIG[selected.status].bg} ${STATUS_CONFIG[selected.status].text} ${STATUS_CONFIG[selected.status].border}`}
            >
              {STATUS_CONFIG[selected.status].label}
            </span>
          </div>

          <div className="col-span-2">
            <p className="text-slate-400">Jenis Surat</p>
            <p className="font-medium text-slate-700 mt-0.5">
              {selected.jenis}
            </p>
          </div>

          <div className="col-span-2">
            <p className="text-slate-400">Keperluan</p>
            <p className="font-medium text-slate-700 mt-0.5">
              {selected.keperluan}
            </p>
          </div>

          {selected.keterangan && (
            <div className="col-span-2">
              <p className="text-slate-400">Keterangan</p>
              <p className="font-medium text-slate-700 mt-0.5">
                {selected.keterangan}
              </p>
            </div>
          )}
        </div>

        {(selected.status === "menunggu" ||
          selected.status === "diproses") && (
          <div className="mb-4">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Catatan (wajib jika ditolak)
            </label>

            <textarea
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              rows={2}
              placeholder="Alasan penolakan..."
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          {selected.status === "menunggu" && (
            <>
              <button
                onClick={() => updateStatus("diproses")}
                disabled={updating}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-sm py-2.5 rounded-xl transition-all"
              >
                {updating ? "Memproses..." : "Proses Pengajuan"}
              </button>

              <button
                onClick={() => updateStatus("ditolak")}
                disabled={updating}
                className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-sm py-2.5 rounded-xl border border-red-100 transition-all"
              >
                Tolak
              </button>
            </>
          )}

          {selected.status === "diproses" && (
            <>
              <button
                onClick={() => updateStatus("selesai")}
                disabled={updating}
                className="w-full bg-primary-700 hover:bg-primary-800 disabled:opacity-60 text-white font-semibold text-sm py-2.5 rounded-xl transition-all"
              >
                {updating ? "Menyimpan..." : "Tandai Selesai"}
              </button>

              <button
                onClick={() => updateStatus("ditolak")}
                disabled={updating}
                className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-sm py-2.5 rounded-xl border border-red-100 transition-all"
              >
                Tolak
              </button>
            </>
          )}

          {(selected.status === "selesai" ||
            selected.status === "ditolak") && (
            <p className="text-center text-xs text-slate-400 py-2 font-normal">
              Pengajuan ini sudah{" "}
              {STATUS_CONFIG[selected.status].label.toLowerCase()}.
            </p>
          )}

          <button
            onClick={() => setSelected(null)}
            className="w-full border border-slate-200 text-slate-500 hover:bg-slate-50 font-medium text-sm py-2.5 rounded-xl transition-all"
          >
            Tutup
          </button>
        </div>
      </Modal>
  );
};

export default DetailModal;