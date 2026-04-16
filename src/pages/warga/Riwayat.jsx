import { useState, useEffect } from "react";
import api from "../../api/axios";
import { FiLoader, FiChevronDown, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

const STATUS_CONFIG = {
  menunggu: { label: "Menunggu", bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-100",   dot: "bg-amber-500" },
  diproses: { label: "Diproses", bg: "bg-blue-50",    text: "text-blue-700",    border: "border-blue-100",    dot: "bg-blue-500" },
  selesai:  { label: "Selesai",  bg: "bg-primary-50", text: "text-primary-700", border: "border-primary-100", dot: "bg-primary-600" },
  ditolak:  { label: "Ditolak",  bg: "bg-red-50",     text: "text-red-600",     border: "border-red-100",     dot: "bg-red-500" },
};

const FILTERS = ["Semua", "Menunggu", "Diproses", "Selesai", "Ditolak"];

export default function Riwayat() {
  const [data, setData]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState("Semua");
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get("/surat/saya");
        setData(res.data.surat);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const filtered = data.filter((d) =>
    filter === "Semua" ? true : d.status === filter.toLowerCase()
  );

  const toggle = (id) => setExpanded((prev) => (prev === id ? null : id));

  const formatTanggal = (iso) =>
    new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-7"><h1 className="font-bold text-slate-900 text-xl">Riwayat Surat</h1></div>
        <div className="flex items-center justify-center py-20">
          <FiLoader className="w-6 h-6 animate-spin text-primary-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-7">
        <h1 className="font-bold text-slate-900 text-xl">Riwayat Surat</h1>
        <p className="text-slate-400 text-sm font-normal mt-1">Pantau status semua pengajuan suratmu di sini.</p>
      </div>

      <div className="flex gap-2 flex-wrap mb-5">
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`text-xs font-medium px-3.5 py-1.5 rounded-full border transition-all
              ${filter === f ? "bg-primary-700 text-white border-primary-700" : "bg-white text-slate-500 border-slate-200 hover:border-primary-300 hover:text-primary-700"}`}>
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl py-14 text-center">
          <p className="text-slate-400 text-sm font-normal">
            {data.length === 0 ? "Kamu belum pernah mengajukan surat." : "Tidak ada pengajuan untuk filter ini."}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((item) => {
            const cfg = STATUS_CONFIG[item.status];
            const isOpen = expanded === item.id;
            return (
              <div key={item.id} className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
                <button
                  onClick={() => toggle(item.id)}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-slate-50 transition-colors"
                >
                  <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${cfg.dot}`} />

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{item.jenis}</p>
                    <p className="text-xs text-slate-400 font-normal mt-0.5">
                      {item.kode} · {formatTanggal(item.created_at)}
                    </p>
                  </div>

                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border shrink-0 ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                    {cfg.label}
                  </span>

                  <FiChevronDown
                    className={`w-4 h-4 text-slate-300 shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 px-5 py-4 bg-slate-50">
                    <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                      <div><p className="text-slate-400 font-normal">Keperluan</p><p className="text-slate-700 font-medium mt-0.5">{item.keperluan}</p></div>
                      <div><p className="text-slate-400 font-normal">Tanggal Pengajuan</p><p className="text-slate-700 font-medium mt-0.5">{formatTanggal(item.created_at)}</p></div>
                      {item.keterangan && (
                        <div className="col-span-2"><p className="text-slate-400 font-normal">Keterangan</p><p className="text-slate-700 font-medium mt-0.5">{item.keterangan}</p></div>
                      )}
                    </div>

                    {/* Progress bar */}
                    <div className="flex items-center gap-1.5 mt-3">
                      {["menunggu", "diproses", "selesai"].map((s, idx) => {
                        const steps  = ["menunggu", "diproses", "selesai"];
                        const curIdx = steps.indexOf(item.status);
                        const isDone = item.status === "ditolak" ? s === "menunggu" : idx <= curIdx;
                        return <div key={s} className={`h-1.5 rounded-full flex-1 transition-colors ${isDone ? "bg-primary-500" : "bg-slate-200"}`} />;
                      })}
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-normal">
                      <span>Diterima</span><span>Diproses</span><span>Selesai</span>
                    </div>

                    {item.status === "ditolak" && item.catatan && (
                      <div className="mt-3 flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl px-3 py-2.5">
                        <FiAlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-red-600 font-normal">{item.catatan}</p>
                      </div>
                    )}
                    {item.status === "selesai" && (
                      <div className="mt-3 flex items-start gap-2 bg-primary-50 border border-primary-100 rounded-xl px-3 py-2.5">
                        <FiCheckCircle className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
                        <p className="text-xs text-primary-700 font-normal">
                          Surat sudah selesai. Silakan ambil ke pengurus RT.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <p className="text-center text-xs text-slate-400 font-normal mt-6">
        Menampilkan {filtered.length} dari {data.length} pengajuan
      </p>
    </div>
  );
}