import { FiInfo, FiLoader } from "react-icons/fi";

const AGAMA_OPTIONS = ["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"];

const FormPengajuan = ({
  form,
  handleChange,
  handleSubmit,
  loading,
  setStep,
  selectedKeperluan,
  alamat,
}) => {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-5 border-b border-slate-100">
        <div>
          <p className="text-xs text-slate-400 font-normal">Jenis surat dipilih</p>
          <p className="text-sm font-semibold text-slate-800 mt-0.5">{form.jenis}</p>
        </div>
        <button onClick={() => setStep(1)} className="text-xs text-primary-700 hover:underline font-medium">
          Ganti
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        {/* ── SECTION: Data Diri ── */}
        <div>
          <p className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wide">
            Data Diri Pemohon
          </p>

          <div className="flex flex-col gap-4">

            {/* Nama Pemohon */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Nama Lengkap <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={form.nama_pemohon}
                onChange={(e) => handleChange("nama_pemohon", e.target.value)}
                placeholder="Masukkan nama sesuai KTP"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
              />
            </div>

            {/* Tempat / Tanggal Lahir */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Tempat / Tanggal Lahir <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={form.ttl}
                onChange={(e) => handleChange("ttl", e.target.value)}
                placeholder="Contoh: Jakarta, 01 Januari 1990"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
              />
            </div>

            {/* Jenis Kelamin */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Jenis Kelamin <span className="text-red-400">*</span>
              </label>
              <select
                required
                value={form.jenis_kelamin}
                onChange={(e) => handleChange("jenis_kelamin", e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition bg-white"
              >
                <option value="">-- Pilih jenis kelamin --</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            {/* Agama */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Agama <span className="text-red-400">*</span>
              </label>
              <select
                required
                value={form.agama}
                onChange={(e) => handleChange("agama", e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition bg-white"
              >
                <option value="">-- Pilih agama --</option>
                {AGAMA_OPTIONS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            {/* Pekerjaan */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Pekerjaan <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={form.pekerjaan}
                onChange={(e) => handleChange("pekerjaan", e.target.value)}
                placeholder="Contoh: Karyawan Swasta, Wiraswasta, dll."
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
              />
            </div>

            {/* Alamat — otomatis dari akun */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Alamat / Domisili
              </label>
              <div className="w-full border border-slate-100 bg-slate-50 rounded-xl px-4 py-2.5 text-sm text-slate-500">
                {alamat}
              </div>
              <p className="text-[11px] text-slate-400 mt-1 font-normal">
                Alamat otomatis dari data akun
              </p>
            </div>

            {/* Nama Kepala Keluarga */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Nama Kepala Keluarga{" "}
                <span className="text-slate-300 font-normal">(opsional)</span>
              </label>
              <input
                type="text"
                value={form.nama_kepala_keluarga}
                onChange={(e) => handleChange("nama_kepala_keluarga", e.target.value)}
                placeholder="Isi jika berbeda dengan pemohon"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
              />
            </div>

          </div>
        </div>

        {/* ── SECTION: Keperluan ── */}
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
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
        </div>

        {/* ── SECTION: Keterangan ── */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Catatan Tambahan{" "}
            <span className="text-slate-300 font-normal">(opsional)</span>
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

        {/* Tombol */}
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