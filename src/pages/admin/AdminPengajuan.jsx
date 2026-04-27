import { useState, useEffect } from "react";
import { FiLoader } from "react-icons/fi";
import { usePengajuan } from "../../hooks/usePengajuan";

import StatCards      from "../../components/admin/StatCards";
import FilterButtons  from "../../components/admin/FilterButtons";
import PengajuanTable from "../../components/admin/PengajuanTable";
import DetailModal    from "../../components/admin/DetailModal";
import Pagination     from "../../components/admin/Pagination";
import SearchInput from "../../components/admin/SearchInput";

const ITEMS_PER_PAGE = 5;

export default function AdminPengajuan() {
  const {
    data,
    loading,
    search,
    setSearch,
    debouncedSearch,
    selected,
    updating,
    openDetail,
    closeDetail,
    updateStatus,
  } = usePengajuan();

  const [filter, setFilter]           = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => { setCurrentPage(1); }, [filter, debouncedSearch]);

  const filtered = data.filter((d) => {
    const matchFilter =
      filter === "Semua" ? true : d.status === filter.toLowerCase();
    const keyword = debouncedSearch.toLowerCase();
    const matchSearch =
      keyword === "" ? true :
      (d.nama_pemohon || "").toLowerCase().includes(keyword) ||
      (d.nama || "").toLowerCase().includes(keyword) ||
      (d.kode || "").toLowerCase().includes(keyword);
    return matchFilter && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const counts = {
    menunggu: data.filter((d) => d.status === "menunggu").length,
    diproses: data.filter((d) => d.status === "diproses").length,
    selesai:  data.filter((d) => d.status === "selesai").length,
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto">
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
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="font-bold text-slate-900 text-xl">Kelola Pengajuan</h1>
        <p className="text-slate-400 text-sm font-normal mt-1">
          Kelola semua pengajuan surat warga.
        </p>
      </div>

      <StatCards counts={counts} setFilter={setFilter} />
      <FilterButtons filter={filter} setFilter={setFilter} />

      <SearchInput
        search={search}
        setSearch={setSearch}
        placeholder="Cari nama pemohon atau kode surat..."
      />

      <PengajuanTable data={paginated} onDetail={openDetail} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <DetailModal
        selected={selected}
        setSelected={closeDetail}
        updateStatus={updateStatus}
        updating={updating}
      />
    </div>
  );
}