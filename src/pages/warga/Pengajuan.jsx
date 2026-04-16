import { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { FiCheck, FiFileText, FiInfo, FiLoader, FiCheckCircle } from "react-icons/fi";

const JENIS_SURAT = [
  { value: "Surat Keterangan Domisili",        label: "Surat Keterangan Domisili" },
  { value: "Surat Pengantar KTP / KK",         label: "Surat Pengantar KTP / KK" },
  { value: "Surat Keterangan Tidak Mampu",     label: "Surat Keterangan Tidak Mampu" },
  { value: "Surat Keterangan Usaha",           label: "Surat Keterangan Usaha" },
  { value: "Surat Keterangan Berkelakuan Baik",label: "Surat Keterangan Berkelakuan Baik" },
  { value: "Surat Keterangan Pindah",          label: "Surat Keterangan Pindah" },
];

const KEPERLUAN_OPTIONS = {
  "Surat Keterangan Domisili":        ["Pembukaan rekening bank", "Pendaftaran sekolah / kampus", "Melamar pekerjaan", "Lainnya"],
  "Surat Pengantar KTP / KK":         ["KTP baru", "Perpanjangan KTP", "Kartu Keluarga baru", "Perubahan data KK"],
  "Surat Keterangan Tidak Mampu":     ["Beasiswa", "Keringanan biaya RS", "Bantuan sosial", "Lainnya"],
  "Surat Keterangan Usaha":           ["SIUP / izin usaha", "Perbankan", "Lainnya"],
  "Surat Keterangan Berkelakuan Baik":["Melamar pekerjaan", "Keperluan hukum", "Lainnya"],
  "Surat Keterangan Pindah":          ["Pindah domisili", "Pindah sekolah", "Lainnya"],
};

export default function Pengajuan() {
  const [step, setStep]       = useState(1);
  const [form, setForm]       = useState({ jenis: "", keperluan: "", keterangan: "" });
  const [loading, setLoading] = useState(false);
  const userName = localStorage.getItem("userName") || "-";

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value, ...(field === "jenis" ? { keperluan: "" } : {}) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/surat", { jenis: form.jenis, keperluan: form.keperluan, keterangan: form.keterangan || undefined });
      toast.success("Pengajuan berhasil dikirim!");
      setStep(3);
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal mengirim pengajuan.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setForm({ jenis: "", keperluan: "", keterangan: "" }); setStep(1); };
  const selectedKeperluan = form.jenis ? KEPERLUAN_OPTIONS[form.jenis] : [];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-7">
        <h1 className="font-bold text-slate-900 text-xl">Pengajuan Surat</h1>
        <p className="text-slate-400 text-sm font-normal mt-1">Ajukan surat keterangan secara online. Surat siap diambil ke pengurus RT.</p>
      </div>

      {step < 3 && (
        <div className="flex items-center gap-2 mb-7">
          {[{ n: 1, label: "Pilih Surat" }, { n: 2, label: "Isi Data" }].map((s, idx) => (
            <div key={s.n} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 ${step === s.n ? "" : "opacity-50"}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  step > s.n || step === s.n
                    ? "bg-primary-700 text-white"
                    : "bg-slate-200 text-slate-500"
                }`}>
                  {step > s.n ? (
                    <FiCheck className="w-3.5 h-3.5" />
                  ) : (
                    s.n
                  )}
                </div>
                <span className={`text-xs font-medium ${step === s.n ? "text-slate-700" : "text-slate-400"}`}>{s.label}</span>
              </div>
              {idx < 1 && <div className="w-10 h-px bg-slate-200 mx-1" />}
            </div>
          ))}
        </div>
      )}

      {step === 1 && (
        <div className="bg-white border border-slate-100 rounded-2xl p-6">
          <p className="text-sm font-semibold text-slate-700 mb-4">Pilih jenis surat yang dibutuhkan:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {JENIS_SURAT.map((s) => (
              <button key={s.value} onClick={() => { handleChange("jenis", s.value); setStep(2); }}
                className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 hover:border-primary-300 hover:bg-primary-50 text-left transition-all group">
                <div className="w-9 h-9 rounded-lg bg-slate-50 group-hover:bg-primary-100 border border-slate-100 flex items-center justify-center shrink-0 transition-all">
                  <FiFileText className="w-4 h-4 text-slate-400 group-hover:text-primary-700 transition-colors" />
                </div>
                <span className="text-sm font-medium text-slate-700 group-hover:text-primary-800 leading-snug">{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white border border-slate-100 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6 pb-5 border-b border-slate-100">
            <div>
              <p className="text-xs text-slate-400 font-normal">Jenis surat dipilih</p>
              <p className="text-sm font-semibold text-slate-800 mt-0.5">{form.jenis}</p>
            </div>
            <button onClick={() => setStep(1)} className="text-xs text-primary-700 hover:underline font-medium">Ganti</button>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
              <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">Data Diri (otomatis dari akun)</p>
              <p className="text-[10px] text-slate-400 font-normal">Nama Lengkap</p>
              <p className="text-sm font-medium text-slate-700 mt-0.5">{userName}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Keperluan <span className="text-red-400">*</span></label>
              <select required value={form.keperluan} onChange={(e) => handleChange("keperluan", e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition bg-white">
                <option value="">-- Pilih keperluan --</option>
                {selectedKeperluan.map((k) => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Keterangan Tambahan <span className="text-slate-300 font-normal">(opsional)</span></label>
              <textarea value={form.keterangan} onChange={(e) => handleChange("keterangan", e.target.value)}
                rows={3} placeholder="Tuliskan informasi tambahan jika diperlukan..."
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500 transition resize-none" />
            </div>
            <div className="flex items-start gap-2 bg-primary-50 border border-primary-100 rounded-xl px-4 py-3">
              <FiInfo className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
              <p className="text-xs text-primary-700 font-normal leading-relaxed">
                Surat akan diproses oleh pengurus RT. Setelah selesai, ambil langsung ke rumah Pak RT.
              </p>
            </div>
            <div className="flex gap-3 pt-1">
              <button type="button" onClick={() => setStep(1)}
                className="flex-1 border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-sm py-2.5 rounded-xl transition-all">Kembali</button>
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
      )}

      {step === 3 && (
        <div className="bg-white border border-slate-100 rounded-2xl p-10 text-center">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <FiCheckCircle className="w-8 h-8 text-primary-700" />
          </div>
          <h2 className="font-bold text-slate-900 text-lg mb-2">Pengajuan Terkirim!</h2>
          <p className="text-slate-400 text-sm font-normal max-w-xs mx-auto leading-relaxed mb-2">Pengajuan surat kamu sudah diterima dan sedang menunggu diproses oleh pengurus RT.</p>
          <p className="text-xs text-slate-400 mb-7 font-normal">Pantau statusnya di tab <span className="font-semibold text-slate-600">Riwayat Surat</span>.</p>
          <button onClick={reset} className="border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium px-6 py-2.5 rounded-xl transition-all">Ajukan Surat Lain</button>
        </div>
      )}
    </div>
  );
}