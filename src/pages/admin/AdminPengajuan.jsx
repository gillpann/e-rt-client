import { useState, useEffect } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { FiLoader } from 'react-icons/fi';

import StatCards from "../../components/admin/StatCards";
import FilterButtons from "../../components/admin/FilterButtons";
import PengajuanTable from "../../components/admin/PengajuanTable";
import DetailModal from "../../components/admin/DetailModal";

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
      <StatCards counts={counts} setFilter={setFilter} />

      {/* Filter */}
      <FilterButtons filter={filter} setFilter={setFilter} />

      {/* Table */}
      <PengajuanTable 
        data={filtered} 
        onDetail={openDetail} 
      />

      {/* Modal Detail */}
      <DetailModal
        selected={selected}
        setSelected={setSelected}
        catatan={catatan}
        setCatatan={setCatatan}
        updateStatus={updateStatus}
        updating={updating}
      />
    </div>
  );
}