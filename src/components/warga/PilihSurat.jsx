import { FiFileText } from "react-icons/fi";

const PilihSurat = ({ JENIS_SURAT, handleChange, setStep }) => {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6">
      <p className="text-sm font-semibold text-slate-700 mb-4">
        Pilih jenis surat yang dibutuhkan:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {JENIS_SURAT.map((s) => (
          <button
            key={s.value}
            onClick={() => {
              handleChange("jenis", s.value);
              setStep(2);
            }}
            className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 hover:border-primary-300 hover:bg-primary-50 text-left transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-50 group-hover:bg-primary-100 border border-slate-100 flex items-center justify-center shrink-0 transition-all">
              <FiFileText className="w-4 h-4 text-slate-400 group-hover:text-primary-700 transition-colors" />
            </div>

            <span className="text-sm font-medium text-slate-700 group-hover:text-primary-800 leading-snug">
              {s.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PilihSurat;