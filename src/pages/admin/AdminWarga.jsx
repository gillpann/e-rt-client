import { useState, useEffect } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { FiLoader, FiPlus, FiSearch, FiX, FiAlertTriangle } from "react-icons/fi";

const EMPTY_FORM = { nama: "", nik: "", no_hp: "", alamat: "", password: "", status: "aktif" };

export default function AdminWarga() {
  const [warga, setWarga]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");
  const [showForm, setShowForm]   = useState(false);
  const [editData, setEditData]   = useState(null);
  const [form, setForm]           = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [hapusId, setHapusId]     = useState(null);

  const fetchWarga = async () => {
    try {
      const res = await api.get("/warga");
      setWarga(res.data.warga);
    } catch (err) {
      toast.error("Gagal memuat data warga.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchWarga(); }, []);

  const filtered = warga.filter((w) =>
    w.nama.toLowerCase().includes(search.toLowerCase()) || w.nik.includes(search)
  );

  const openTambah = () => { setEditData(null); setForm(EMPTY_FORM); setFormError(""); setShowForm(true); };
  const openEdit   = (w) => { setEditData(w); setForm({ nama: w.nama, nik: w.nik, no_hp: w.no_hp || "", alamat: w.alamat || "", password: "", status: w.status }); setFormError(""); setShowForm(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!form.nama)
      return setFormError("Nama wajib diisi.");
    if (form.nik.length !== 16) 
      return setFormError("NIK harus 16 digit.");
    if (!editData && !form.password) 
      return setFormError("Password wajib diisi untuk warga baru.");

    setSubmitting(true);
    try {
      if (editData) {
        await api.put(`/warga/${editData.id}`, form);
        toast.success("Data warga berhasil diupdate.");
      } else {
        await api.post("/warga", form);
        toast.success("Warga baru berhasil ditambahkan.");
      }
      setShowForm(false);
      fetchWarga();
    } catch (err) {
      setFormError(err.response?.data?.message || "Terjadi kesalahan.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleHapus = async () => {
    try {
      await api.delete(`/warga/${hapusId}`);
      toast.success("Warga berhasil dihapus.");
      setHapusId(null);
      fetchWarga();
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal menghapus warga.");
      setHapusId(null);
    }
  };

  const formatTanggal = (iso) =>
    new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6"><h1 className="font-bold text-slate-900 text-xl">Data Warga</h1></div>
        <div className="flex items-center justify-center py-20">
          <FiLoader className="w-6 h-6 animate-spin text-primary-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-bold text-slate-900 text-xl">Data Warga</h1>
          <p className="text-slate-400 text-sm font-normal mt-1">Kelola daftar warga terdaftar di RT 03 / RW 08.</p>
        </div>
        <button
          onClick={openTambah}
          className="bg-primary-700 hover:bg-primary-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shrink-0"
        >
          <FiPlus className="w-4 h-4" />
          Tambah Warga
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-white border border-slate-100 rounded-2xl p-4 text-center">
          <p className="font-bold text-2xl text-slate-800">{warga.length}</p>
          <p className="text-xs text-slate-400 font-normal mt-0.5">Total Warga</p>
        </div>
        <div className="bg-primary-50 border border-primary-100 rounded-2xl p-4 text-center">
          <p className="font-bold text-2xl text-primary-700">{warga.filter((w) => w.status === "aktif").length}</p>
          <p className="text-xs text-primary-600 font-normal mt-0.5">Aktif</p>
        </div>
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
          <p className="font-bold text-2xl text-slate-500">{warga.filter((w) => w.status === "nonaktif").length}</p>
          <p className="text-xs text-slate-400 font-normal mt-0.5">Nonaktif</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama atau NIK..."
          className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left text-xs font-semibold text-slate-400 px-5 py-3">Nama</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-5 py-3">NIK</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-5 py-3 hidden md:table-cell">Alamat</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-5 py-3 hidden sm:table-cell">Terdaftar</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-5 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-5 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="text-center text-slate-400 text-xs py-10 font-normal">Warga tidak ditemukan.</td></tr>
              ) : filtered.map((w) => (
                <tr key={w.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                        <span className="text-primary-700 font-semibold text-xs">{w.nama.charAt(0)}</span>
                      </div>
                      <p className="font-semibold text-slate-800 text-sm">{w.nama}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-slate-500 font-normal">{w.nik}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-500 font-normal hidden md:table-cell">{w.alamat || "-"}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-500 font-normal hidden sm:table-cell whitespace-nowrap">{formatTanggal(w.created_at)}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border
                      ${w.status === "aktif" ? "bg-primary-50 text-primary-700 border-primary-100" : "bg-slate-100 text-slate-500 border-slate-200"}`}>
                      {w.status === "aktif" ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <button onClick={() => openEdit(w)} className="text-xs font-medium text-primary-700 hover:underline">Edit</button>
                      <button onClick={() => setHapusId(w.id)} className="text-xs font-medium text-red-400 hover:underline">Hapus</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100">
          <p className="text-[11px] text-slate-400 font-normal">Menampilkan {filtered.length} dari {warga.length} warga</p>
        </div>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <p className="font-bold text-slate-900 text-base">{editData ? "Edit Data Warga" : "Tambah Warga Baru"}</p>
              <button
                onClick={() => setShowForm(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              {[
                { label: "Nama Lengkap", field: "nama",   placeholder: "Contoh: Budi Santoso" },
                { label: "NIK (16 digit)", field: "nik",  placeholder: "16 digit NIK", maxLen: 16, numeric: true },
                { label: "Alamat",        field: "alamat", placeholder: "Jl. Contoh No. 1" },
                { label: "No. HP",        field: "no_hp",  placeholder: "08xxxxxxxxxx" },
              ].map((f) => (
                <div key={f.field}>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">{f.label}</label>
                  <input type="text" value={form[f.field]} maxLength={f.maxLen}
                    onChange={(e) => { const v = f.numeric ? e.target.value.replace(/\D/g, "") : e.target.value; setForm((p) => ({ ...p, [f.field]: v })); }}
                    placeholder={f.placeholder}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
              ))}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Password {editData && <span className="text-slate-300 font-normal">(kosongkan jika tidak diganti)</span>}
                </label>
                <input type="password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                  placeholder={editData ? "Isi jika ingin ganti password" : "Password untuk login"}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Status</label>
                <div className="grid grid-cols-2 gap-2">
                  {["aktif", "nonaktif"].map((s) => (
                    <button key={s} type="button" onClick={() => setForm((p) => ({ ...p, status: s }))}
                      className={`py-2 rounded-xl text-xs font-semibold border transition-all
                        ${form.status === s ? s === "aktif" ? "bg-primary-700 text-white border-primary-700" : "bg-slate-600 text-white border-slate-600" : "border-slate-200 text-slate-500 hover:bg-slate-50"}`}>
                      {s === "aktif" ? "Aktif" : "Nonaktif"}
                    </button>
                  ))}
                </div>
              </div>

              {formError && <p className="text-xs text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded-xl">{formError}</p>}

              <button type="submit" disabled={submitting}
                className="w-full bg-primary-700 hover:bg-primary-800 disabled:opacity-60 text-white font-semibold text-sm py-3 rounded-xl transition-all mt-1">
                {submitting ? "Menyimpan..." : editData ? "Simpan Perubahan" : "Tambah Warga"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Konfirmasi Hapus */}
      {hapusId && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4" onClick={() => setHapusId(null)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xs p-6 text-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiAlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <p className="font-bold text-slate-900 text-sm mb-1">Hapus warga ini?</p>
            <p className="text-slate-400 text-xs font-normal mb-5">Data warga dan semua riwayat suratnya akan terhapus.</p>
            <div className="flex gap-2">
              <button onClick={() => setHapusId(null)} className="flex-1 border border-slate-200 text-slate-600 text-sm font-medium py-2.5 rounded-xl hover:bg-slate-50">Batal</button>
              <button onClick={handleHapus} className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-all">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}