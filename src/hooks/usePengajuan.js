import { useState, useEffect, useCallback } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

export function usePengajuan() {
  const [data, setData]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState(null);
  const [updating, setUpdating] = useState(false);

  // ── Search + debounce 
  const [search, setSearch]                   = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

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

  const openDetail  = (item) => setSelected(item);
  const closeDetail = ()     => setSelected(null);

  const updateStatus = async (newStatus) => {
    setUpdating(true);
    try {
      await api.patch(`/surat/${selected.id}`, { status: newStatus });
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
    // search
    search,
    setSearch,
    debouncedSearch,
    // detail modal
    selected,
    updating,
    openDetail,
    closeDetail,
    updateStatus,
  };
}