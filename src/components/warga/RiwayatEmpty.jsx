export default function RiwayatEmpty({ dataLength }) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl py-14 text-center">
      <p className="text-slate-400 text-sm font-normal">
        {dataLength === 0
          ? "Kamu belum pernah mengajukan surat."
          : "Tidak ada pengajuan untuk filter ini."}
      </p>
    </div>
  );
}