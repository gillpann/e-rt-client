import { useState, useEffect } from "react";
import { FiLoader } from "react-icons/fi";
import { usePengajuan } from "../../hooks/usePengajuan";

import StatCards      from "../../components/admin/StatCards";
import FilterButtons  from "../../components/admin/FilterButtons";
import PengajuanTable from "../../components/admin/PengajuanTable";
import DetailModal    from "../../components/admin/DetailModal";
import Pagination     from "../../components/admin/Pagination";

const ITEMS_PER_PAGE = 5;

export default function AdminPengajuan() {
  const {
    data,
    loading,
    selected,
    catatan,
    setCatatan,
    updating,
    openDetail,
    closeDetail,
    updateStatus,
  } = usePengajuan();

  const [filter, setFilter]         = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => { setCurrentPage(1); }, [filter]);

  const filtered = data.filter((d) =>
    filter === "Semua" ? true : d.status === filter.toLowerCase()
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const counts = {
    menunggu: data.filter((d) => d.status === "menunggu").length,
    diproses: data.filter((d) => d.status === "diproses").length,
    selesai:  data.filter((d) => d.status === "selesai").length,
    ditolak:  data.filter((d) => d.status === "ditolak").length,
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="font-bold text-slate-900 text-xl">Kelola Pengajuan</h1>
        </div>
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
        <p className="text-slate-400 text-sm font-normal mt-1">
          Review dan proses pengajuan surat dari warga.
        </p>
      </div>

      <StatCards counts={counts} setFilter={setFilter} />

      <FilterButtons filter={filter} setFilter={setFilter} />

      <PengajuanTable data={paginated} onDetail={openDetail} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <DetailModal
        selected={selected}
        setSelected={closeDetail}
        catatan={catatan}
        setCatatan={setCatatan}
        updateStatus={updateStatus}
        updating={updating}
      />
    </div>
  );
}