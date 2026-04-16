import { useState, useEffect } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { FiLoader, FiX } from 'react-icons/fi';

const STATUS_CONFIG = {
  menunggu: { label: "Menunggu", bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-100",   dot: "bg-amber-500" },
  diproses: { label: "Diproses", bg: "bg-blue-50",    text: "text-blue-700",    border: "border-blue-100",    dot: "bg-blue-500" },
  selesai:  { label: "Selesai",  bg: "bg-primary-50", text: "text-primary-700", border: "border-primary-100", dot: "bg-primary-600" },
  ditolak:  { label: "Ditolak",  bg: "bg-red-50",     text: "text-red-600",     border: "border-red-100",     dot: "bg-red-500" },
};

const FILTERS = ["Semua", "Menunggu", "Diproses", "Selesai", "Ditolak"];

export default function AdminPengajuan() {
  const [data, setData]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState("Semua");
  const [selected, setSelected] = useState(null);
  const [catatan, setCatatan]   = useState("");
  const [updating, setUpdating] = useState(false);

  const fetchData = async () => {
    try {
      const res = await api.get("/surat");
      setData(res.data.surat);
    } catch (err) {
      toast.error("Gagal memuat data pengajuan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const filtered = data.filter((d) =>
    filter === "Semua" ? true : d.status === filter.toLowerCase()
  );

  const counts = {
    menunggu: data.filter((d) => d.status === "menunggu").length,
    diproses: data.filter((d) => d.status === "diproses").length,
    selesai:  data.filter((d) => d.status === "selesai").length,
    ditolak:  data.filter((d) => d.status === "ditolak").length,
  };

  const openDetail = (item) => { setSelected(item); setCatatan(item.catatan || ""); };

  const updateStatus = async (newStatus) => {
    if (newStatus === "ditolak" && !catatan.trim()) {
      toast.error("Catatan wajib diisi jika ditolak.");
      return;
    }
    setUpdating(true);
    try {
      await api.patch(`/surat/${selected.id}`, { status: newStatus, catatan: catatan || undefined });
      toast.success("Status berhasil diupdate.");
      setSelected(null);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal update status.");
    } finally {
      setUpdating(false);
    }
  };

  const formatTanggal = (iso) =>
    new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6"><h1 className="font-bold text-slate-900 text-xl">Kelola Pengajuan</h1></div>
        <div className="flex items-center justify-center py-20">
          <FiLoader className="w-6 h-6 animate-spin text-primary-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="font-bold text-slate-900 text-xl">Kelola Pengajuan</h1>
        <p className="text-slate-400 text-sm font-normal mt-1">Review dan proses pengajuan surat dari warga.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { key: "menunggu", label: "Menunggu", color: "text-amber-600",   bg: "bg-amber-50",   border: "border-amber-100" },
          { key: "diproses", label: "Diproses", color: "text-blue-600",    bg: "bg-blue-50",    border: "border-blue-100" },
          { key: "selesai",  label: "Selesai",  color: "text-primary-700", bg: "bg-primary-50", border: "border-primary-100" },
          { key: "ditolak",  label: "Ditolak",  color: "text-red-600",     bg: "bg-red-50",     border: "border-red-100" },
        ].map((s) => (
          <button key={s.key} onClick={() => setFilter(s.label)}
            className={`${s.bg} border ${s.border} rounded-2xl p-4 text-left hover:opacity-80 transition-opacity`}>
            <p className={`font-bold text-2xl ${s.color}`}>{counts[s.key]}</p>
            <p className={`text-xs font-medium ${s.color} opacity-80 mt-0.5`}>{s.label}</p>
          </button>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap mb-4">
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`text-xs font-medium px-3.5 py-1.5 rounded-full border transition-all
              ${filter === f ? "bg-primary-700 text-white border-primary-700" : "bg-white text-slate-500 border-slate-200 hover:border-primary-300 hover:text-primary-700"}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left text-xs font-semibold text-slate-400 px-5 py-3">ID</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-5 py-3">Nama Warga</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-5 py-3 hidden md:table-cell">Jenis Surat</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-5 py-3 hidden sm:table-cell">Tanggal</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-5 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-5 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="text-center text-slate-400 text-xs py-10 font-normal">Tidak ada pengajuan.</td></tr>
              ) : filtered.map((item) => {
                const cfg = STATUS_CONFIG[item.status];
                return (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5 text-xs text-slate-400 font-normal whitespace-nowrap">{item.kode}</td>
                    <td className="px-5 py-3.5">
                      <p className="font-semibold text-slate-800 text-sm">{item.nama}</p>
                      <p className="text-[11px] text-slate-400 font-normal">{item.nik}</p>
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell max-w-[180px]">
                      <p className="text-xs text-slate-600 truncate">{item.jenis}</p>
                      <p className="text-[11px] text-slate-400 truncate">{item.keperluan}</p>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-400 font-normal hidden sm:table-cell whitespace-nowrap">{formatTanggal(item.created_at)}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap ${cfg.bg} ${cfg.text} ${cfg.border}`}>{cfg.label}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <button onClick={() => openDetail(item)} className="text-xs font-medium text-primary-700 hover:underline whitespace-nowrap">Detail →</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detail */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="font-bold text-slate-900 text-base">{selected.nama}</p>
                <p className="text-xs text-slate-400 font-normal">{selected.kode} · {formatTanggal(selected.created_at)}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 mb-4 grid grid-cols-2 gap-3 text-xs">
              <div><p className="text-slate-400">NIK</p><p className="font-medium text-slate-700 mt-0.5">{selected.nik}</p></div>
              <div><p className="text-slate-400">Status</p>
                <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full border mt-0.5 ${STATUS_CONFIG[selected.status].bg} ${STATUS_CONFIG[selected.status].text} ${STATUS_CONFIG[selected.status].border}`}>
                  {STATUS_CONFIG[selected.status].label}
                </span>
              </div>
              <div className="col-span-2"><p className="text-slate-400">Jenis Surat</p><p className="font-medium text-slate-700 mt-0.5">{selected.jenis}</p></div>
              <div className="col-span-2"><p className="text-slate-400">Keperluan</p><p className="font-medium text-slate-700 mt-0.5">{selected.keperluan}</p></div>
              {selected.keterangan && (
                <div className="col-span-2"><p className="text-slate-400">Keterangan</p><p className="font-medium text-slate-700 mt-0.5">{selected.keterangan}</p></div>
              )}
            </div>

            {(selected.status === "menunggu" || selected.status === "diproses") && (
              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Catatan (wajib jika ditolak)</label>
                <textarea value={catatan} onChange={(e) => setCatatan(e.target.value)} rows={2}
                  placeholder="Alasan penolakan..."
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none" />
              </div>
            )}

            <div className="flex flex-col gap-2">
              {selected.status === "menunggu" && (
                <>
                  <button onClick={() => updateStatus("diproses")} disabled={updating}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-sm py-2.5 rounded-xl transition-all">
                    {updating ? "Memproses..." : "Proses Pengajuan"}
                  </button>
                  <button onClick={() => updateStatus("ditolak")} disabled={updating}
                    className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-sm py-2.5 rounded-xl border border-red-100 transition-all">
                    Tolak
                  </button>
                </>
              )}
              {selected.status === "diproses" && (
                <>
                  <button onClick={() => updateStatus("selesai")} disabled={updating}
                    className="w-full bg-primary-700 hover:bg-primary-800 disabled:opacity-60 text-white font-semibold text-sm py-2.5 rounded-xl transition-all">
                    {updating ? "Menyimpan..." : "Tandai Selesai"}
                  </button>
                  <button onClick={() => updateStatus("ditolak")} disabled={updating}
                    className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-sm py-2.5 rounded-xl border border-red-100 transition-all">
                    Tolak
                  </button>
                </>
              )}
              {(selected.status === "selesai" || selected.status === "ditolak") && (
                <p className="text-center text-xs text-slate-400 py-2 font-normal">Pengajuan ini sudah {STATUS_CONFIG[selected.status].label.toLowerCase()}.</p>
              )}
              <button onClick={() => setSelected(null)}
                className="w-full border border-slate-200 text-slate-500 hover:bg-slate-50 font-medium text-sm py-2.5 rounded-xl transition-all">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}