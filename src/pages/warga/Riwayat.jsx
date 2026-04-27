import { useState, useEffect } from "react";
import api from "../../api/axios";
import { FiLoader } from "react-icons/fi";
import RiwayatFilter from "../../components/warga/RiwayatFilter";
import RiwayatEmpty  from "../../components/warga/RiwayatEmpty";
import RiwayatCard   from "../../components/warga/RiwayatCard";

const FILTERS = ["Semua", "Menunggu", "Diproses", "Selesai"];

export default function Riwayat() {
  const [data, setData]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState("Semua");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/surat/saya");
        setData(res.data.surat);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = data.filter((d) =>
    filter === "Semua" ? true : d.status === filter.toLowerCase()
  );

  const counts = {
    menunggu: data.filter((d) => d.status === "menunggu").length,
    diproses: data.filter((d) => d.status === "diproses").length,
    selesai:  data.filter((d) => d.status === "selesai").length,
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-7">
          <h1 className="font-bold text-slate-900 text-xl">Riwayat Surat</h1>
        </div>
        <div className="flex items-center justify-center py-20">
          <FiLoader className="w-6 h-6 animate-spin text-primary-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="font-bold text-slate-900 text-xl">Riwayat Surat</h1>
        <p className="text-slate-400 text-sm font-normal mt-1">
          Pantau status semua pengajuan suratmu di sini.
        </p>
      </div>

      <RiwayatFilter
        filter={filter}
        setFilter={setFilter}
        filters={FILTERS}
        counts={counts}
      />

      {filtered.length === 0 ? (
        <RiwayatEmpty dataLength={data.length} />
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((item) => (
            <RiwayatCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {data.length > 0 && (
        <p className="text-center text-xs text-slate-300 font-normal mt-6">
          Menampilkan {filtered.length} dari {data.length} pengajuan
        </p>
      )}
    </div>
  );
}