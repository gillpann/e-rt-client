import { FiCheckCircle } from "react-icons/fi";

const SuccessMessage = ({ reset }) => {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-10 text-center">
      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-5">
        <FiCheckCircle className="w-8 h-8 text-primary-700" />
      </div>

      <h2 className="font-bold text-slate-900 text-lg mb-2">
        Pengajuan Terkirim!
      </h2>

      <p className="text-slate-400 text-sm font-normal max-w-xs mx-auto leading-relaxed mb-2">
        Pengajuan surat kamu sudah diterima dan sedang menunggu diproses oleh pengurus RT.
      </p>

      <p className="text-xs text-slate-400 mb-7 font-normal">
        Pantau statusnya di tab{" "}
        <span className="font-semibold text-slate-600">
          Riwayat Surat
        </span>.
      </p>

      <button
        onClick={reset}
        className="border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium px-6 py-2.5 rounded-xl transition-all"
      >
        Ajukan Surat Lain
      </button>
    </div>
  );
};

export default SuccessMessage;