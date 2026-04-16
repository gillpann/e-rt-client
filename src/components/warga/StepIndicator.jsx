import { FiCheck } from "react-icons/fi";

const StepIndicator = ({ step }) => {
  return (
    <div className="flex items-center gap-2 mb-7">
      {[{ n: 1, label: "Pilih Surat" }, { n: 2, label: "Isi Data" }].map((s, idx) => (
        <div key={s.n} className="flex items-center gap-2">
          <div className={`flex items-center gap-2 ${step === s.n ? "" : "opacity-50"}`}>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                step > s.n || step === s.n
                  ? "bg-primary-700 text-white"
                  : "bg-slate-200 text-slate-500"
              }`}
            >
              {step > s.n ? (
                <FiCheck className="w-3.5 h-3.5" />
              ) : (
                s.n
              )}
            </div>

            <span
              className={`text-xs font-medium ${
                step === s.n ? "text-slate-700" : "text-slate-400"
              }`}
            >
              {s.label}
            </span>
          </div>

          {idx < 1 && <div className="w-10 h-px bg-slate-200 mx-1" />}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;