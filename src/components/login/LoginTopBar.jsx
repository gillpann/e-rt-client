import { useNavigate } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";

export default function LoginTopBar() {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b border-slate-100 px-6 py-3 flex items-center gap-3">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-slate-500 hover:text-primary-700 text-sm transition-colors"
      >
        <FiChevronLeft className="w-4 h-4" />
        Kembali
      </button>

      <div className="h-4 w-px bg-slate-200" />

      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-primary-700 flex items-center justify-center">
          <span className="text-white font-bold text-[9px]">RT</span>
        </div>
        <span className="text-slate-700 font-semibold text-sm">e-RT Warga</span>
      </div>
    </div>
  );
}