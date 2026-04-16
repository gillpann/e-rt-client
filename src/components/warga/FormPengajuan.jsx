import { FiInfo, FiLoader } from "react-icons/fi";

const FormPengajuan = ({
  form,
  handleChange,
  handleSubmit,
  loading,
  setStep,
  selectedKeperluan,
  userName,
}) => {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-5 border-b border-slate-100">
        <div>
          <p className="text-xs text-slate-400 font-normal">
            Jenis surat dipilih
          </p>
          <p className="text-sm font-semibold text-slate-800 mt-0.5">
            {form.jenis}
          </p>
        </div>

        <button
          onClick={() => setStep(1)}
          className="text-xs text-primary-700 hover:underline font-medium"
        >
          Ganti
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        {/* Data Diri */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
          <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
            Data Diri (otomatis dari akun)
          </p>

          <p className="text-[10px] text-slate-400 font-normal">
            Nama Lengkap
          </p>

          <p className="text-sm font-medium text-slate-700 mt-0.5">
            {userName}
          </p>
        </div>

        {/* Keperluan */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Keperluan <span className="text-red-400">*</span>
          </label>

          <select
            required
            value={form.keperluan}
            onChange={(e) => handleChange("keperluan", e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition bg-white"
          >
            <option value="">-- Pilih keperluan --</option>
            {selectedKeperluan.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </div>

        {/* Keterangan */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Keterangan Tambahan{" "}
            <span className="text-slate-300 font-normal">
              (opsional)
            </span>
          </label>

          <textarea
            value={form.keterangan}
            onChange={(e) => handleChange("keterangan", e.target.value)}
            rows={3}
            placeholder="Tuliskan informasi tambahan jika diperlukan..."
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500 transition resize-none"
          />
        </div>

        {/* Info */}
        <div className="flex items-start gap-2 bg-primary-50 border border-primary-100 rounded-xl px-4 py-3">
          <FiInfo className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />

          <p className="text-xs text-primary-700 font-normal leading-relaxed">
            Surat akan diproses oleh pengurus RT. Setelah selesai, ambil langsung ke rumah Pak RT.
          </p>
        </div>

        {/* Button */}
        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="flex-1 border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-sm py-2.5 rounded-xl transition-all"
          >
            Kembali
          </button>

          <button
            type="submit"
            disabled={loading || !form.keperluan}
            className="flex-[2] bg-primary-700 hover:bg-primary-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <FiLoader className="w-4 h-4 animate-spin" />
                Mengirim...
              </>
            ) : (
              "Kirim Pengajuan"
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default FormPengajuan;