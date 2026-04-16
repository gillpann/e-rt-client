import { FiAlertTriangle } from "react-icons/fi";

const ConfirmDeleteModal = ({ hapusId, setHapusId, handleHapus }) => {
  if (!hapusId) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4"
      onClick={() => setHapusId(null)}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-xs p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiAlertTriangle className="w-6 h-6 text-red-500" />
        </div>

        <p className="font-bold text-slate-900 text-sm mb-1">
          Hapus warga ini?
        </p>

        <p className="text-slate-400 text-xs font-normal mb-5">
          Data warga dan semua riwayat suratnya akan terhapus.
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setHapusId(null)}
            className="flex-1 border border-slate-200 text-slate-600 text-sm font-medium py-2.5 rounded-xl hover:bg-slate-50"
          >
            Batal
          </button>

          <button
            onClick={handleHapus}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-all"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;