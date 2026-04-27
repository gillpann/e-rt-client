import { FiX, FiPrinter, FiCheckCircle } from "react-icons/fi";
import { useState } from "react";
import { STATUS_CONFIG } from "../../utils/Status";
import { formatTanggal } from "../../utils/format";
import Modal from "../common/Modal";
import api from "../../api/axios";
import toast from "react-hot-toast";

const DetailModal = ({ selected, setSelected, updateStatus, updating }) => {
  const [mencetak, setMencetak]         = useState(false);
  const [konfirmSelesai, setKonfirmSelesai] = useState(false);

  if (!selected) return null;

  const handleCetak = async () => {
    setMencetak(true);
    try {
      const response = await api.get(`/surat/${selected.id}/cetak`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `surat-${selected.kode}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Surat berhasil diunduh!");
    } catch {
      toast.error("Gagal mencetak surat.");
    } finally {
      setMencetak(false);
    }
  };

  const handleKonfirmSelesai = () => {
    setKonfirmSelesai(false);
    updateStatus("selesai");
  };

  return (
    <>
      {/* ── MODAL KONFIRMASI SELESAI ── */}
      {konfirmSelesai && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={() => setKonfirmSelesai(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-xs p-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCheckCircle className="w-6 h-6 text-primary-600" />
            </div>
            <p className="font-bold text-slate-900 text-sm mb-1">
              Tandai surat ini selesai?
            </p>
            <p className="text-slate-400 text-xs mb-5 font-normal">
              Pastikan surat sudah benar-benar dicetak dan siap diambil warga.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setKonfirmSelesai(false)}
                className="flex-1 border border-slate-200 text-slate-600 text-sm py-2.5 rounded-xl hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                onClick={handleKonfirmSelesai}
                disabled={updating}
                className="flex-1 bg-primary-700 hover:bg-primary-800 disabled:opacity-60 text-white text-sm py-2.5 rounded-xl"
              >
                {updating ? "Menyimpan..." : "Ya, Selesai"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL DETAIL ── */}
      <Modal onClose={() => setSelected(null)} maxWidth="max-w-md">

        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
          <div>
            <p className="font-bold text-slate-900 text-base">
              {selected.nama_pemohon || selected.nama}
            </p>
            <p className="text-xs text-slate-400 font-normal">
              {selected.kode} · {formatTanggal(selected.created_at)}
            </p>
          </div>
          <button
            onClick={() => setSelected(null)}
            className="text-slate-400 hover:text-slate-600 shrink-0 ml-3"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto max-h-[50vh] pr-1 mb-4 custom-scroll">
          <div className="bg-slate-50 rounded-xl p-4 flex flex-col gap-3 text-xs">

            {/* Status + Tanggal */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-slate-400">Status</p>
                <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full border mt-0.5
                  ${STATUS_CONFIG[selected.status].bg}
                  ${STATUS_CONFIG[selected.status].text}
                  ${STATUS_CONFIG[selected.status].border}`}>
                  {STATUS_CONFIG[selected.status].label}
                </span>
              </div>
              <div>
                <p className="text-slate-400">Tgl Pengajuan</p>
                <p className="font-medium text-slate-700 mt-0.5">
                  {formatTanggal(selected.created_at)}
                </p>
              </div>
            </div>

            {/* Jenis */}
            <div>
              <p className="text-slate-400">Jenis Surat</p>
              <p className="font-medium text-slate-700 mt-0.5">{selected.jenis}</p>
            </div>

            {/* Data Diri */}
            <div className="border-t border-slate-200 pt-3">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-2">
                Data Diri Pemohon
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-slate-400">Nama Pemohon</p>
                  <p className="font-medium text-slate-700 mt-0.5">{selected.nama_pemohon || "-"}</p>
                </div>
                <div>
                  <p className="text-slate-400">Jenis Kelamin</p>
                  <p className="font-medium text-slate-700 mt-0.5">{selected.jenis_kelamin || "-"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-slate-400">Tempat / Tanggal Lahir</p>
                  <p className="font-medium text-slate-700 mt-0.5">{selected.ttl || "-"}</p>
                </div>
                <div>
                  <p className="text-slate-400">Agama</p>
                  <p className="font-medium text-slate-700 mt-0.5">{selected.agama || "-"}</p>
                </div>
                <div>
                  <p className="text-slate-400">Pekerjaan</p>
                  <p className="font-medium text-slate-700 mt-0.5">{selected.pekerjaan || "-"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-slate-400">Alamat / Domisili</p>
                  <p className="font-medium text-slate-700 mt-0.5">{selected.alamat || "-"}</p>
                </div>
                {selected.nama_kepala_keluarga && (
                  <div className="col-span-2">
                    <p className="text-slate-400">Nama Kepala Keluarga</p>
                    <p className="font-medium text-slate-700 mt-0.5">{selected.nama_kepala_keluarga}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Keperluan */}
            <div className="border-t border-slate-200 pt-3">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-2">
                Keperluan
              </p>
              <p className="font-medium text-slate-700">{selected.keperluan}</p>
              {selected.keterangan && (
                <div className="mt-2">
                  <p className="text-slate-400">Catatan Tambahan</p>
                  <p className="font-medium text-slate-700 mt-0.5">{selected.keterangan}</p>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Footer Tombol — fixed di bawah */}
        <div className="flex flex-col gap-2 border-t border-slate-100 pt-4">

          {selected.status === "diproses" && (
            <button
              onClick={handleCetak}
              disabled={mencetak}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-semibold text-sm py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <FiPrinter className="w-4 h-4" />
              {mencetak ? "Mengunduh PDF..." : "Cetak Surat"}
            </button>
          )}

          {selected.status === "menunggu" && (
            <button
              onClick={() => updateStatus("diproses")}
              disabled={updating}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-sm py-2.5 rounded-xl transition-all"
            >
              {updating ? "Memproses..." : "Proses Pengajuan"}
            </button>
          )}

          {selected.status === "diproses" && (
            <button
              onClick={() => setKonfirmSelesai(true)}
              disabled={updating}
              className="w-full bg-primary-700 hover:bg-primary-800 disabled:opacity-60 text-white font-semibold text-sm py-2.5 rounded-xl transition-all"
            >
              Tandai Selesai
            </button>
          )}

          {selected.status === "selesai" && (
            <p className="text-center text-xs text-slate-400 py-1 font-normal">
              Pengajuan ini sudah selesai.
            </p>
          )}

          <button
            onClick={() => setSelected(null)}
            className="w-full border border-slate-200 text-slate-500 hover:bg-slate-50 font-medium text-sm py-2.5 rounded-xl transition-all"
          >
            Tutup
          </button>
        </div>

      </Modal>
    </>
  );
};

export default DetailModal;