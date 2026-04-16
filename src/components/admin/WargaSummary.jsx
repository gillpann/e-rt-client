const WargaSummary = ({ warga }) => {
  return (
    <div className="grid grid-cols-3 gap-3 mb-5">
      <div className="bg-white border border-slate-100 rounded-2xl p-4 text-center">
        <p className="font-bold text-2xl text-slate-800">
          {warga.length}
        </p>
        <p className="text-xs text-slate-400 font-normal mt-0.5">
          Total Warga
        </p>
      </div>

      <div className="bg-primary-50 border border-primary-100 rounded-2xl p-4 text-center">
        <p className="font-bold text-2xl text-primary-700">
          {warga.filter((w) => w.status === "aktif").length}
        </p>
        <p className="text-xs text-primary-600 font-normal mt-0.5">
          Aktif
        </p>
      </div>

      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
        <p className="font-bold text-2xl text-slate-500">
          {warga.filter((w) => w.status === "nonaktif").length}
        </p>
        <p className="text-xs text-slate-400 font-normal mt-0.5">
          Nonaktif
        </p>
      </div>
    </div>
  );
};

export default WargaSummary;