import { useState, useEffect, useCallback } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

/**
 * usePengajuan
 * Mengelola fetch data surat pengajuan + update status oleh admin.
 *
 * Returns:
 *  - data        : semua surat (raw, belum difilter)
 *  - loading     : boolean saat pertama kali fetch
 *  - refetch     : fungsi untuk reload data (dipanggil setelah update)
 *  - selected    : item surat yang sedang dibuka di modal
 *  - catatan     : isi textarea catatan penolakan
 *  - updating    : boolean saat PATCH sedang berjalan
 *  - openDetail  : buka modal + isi catatan dari data item
 *  - closeDetail : tutup modal + reset catatan
 *  - setCatatan  : setter untuk textarea catatan
 *  - updateStatus: PATCH status ke API, lalu refetch
 */
export function usePengajuan() {
  const [data, setData]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState(null);
  const [catatan, setCatatan]   = useState("");
  const [updating, setUpdating] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await api.get("/surat");
      setData(res.data.surat);
    } catch {
      toast.error("Gagal memuat data pengajuan.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openDetail = (item) => {
    setSelected(item);
    setCatatan(item.catatan || "");
  };

  const closeDetail = () => {
    setSelected(null);
    setCatatan("");
  };

  const updateStatus = async (newStatus) => {
    if (newStatus === "ditolak" && !catatan.trim()) {
      toast.error("Catatan wajib diisi jika ditolak.");
      return;
    }
    setUpdating(true);
    try {
      await api.patch(`/surat/${selected.id}`, {
        status:  newStatus,
        catatan: catatan.trim() || undefined,
      });
      toast.success("Status berhasil diupdate.");
      closeDetail();
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal update status.");
    } finally {
      setUpdating(false);
    }
  };

  return {
    data,
    loading,
    refetch: fetchData,
    selected,
    catatan,
    setCatatan,
    updating,
    openDetail,
    closeDetail,
    updateStatus,
  };
}