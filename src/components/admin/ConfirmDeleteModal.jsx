import { FiAlertTriangle } from "react-icons/fi";
import Modal from "../common/Modal";

const ConfirmDeleteModal = ({ hapusId, setHapusId, handleHapus }) => {
  if (!hapusId) return null;

  return (
    <Modal onClose={() => setHapusId(null)} maxWidth="max-w-xs">
      <div className="text-center">
        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiAlertTriangle className="w-6 h-6 text-red-500" />
        </div>

        <p className="font-bold text-slate-900 text-sm mb-1">
          Hapus warga ini?
        </p>

        <p className="text-slate-400 text-xs mb-5">
          Data warga dan semua riwayat suratnya akan terhapus.
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setHapusId(null)}
            className="flex-1 border border-slate-200 text-slate-600 text-sm py-2.5 rounded-xl hover:bg-slate-50"
          >
            Batal
          </button>

          <button
            onClick={handleHapus}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-2.5 rounded-xl"
          >
            Hapus
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;