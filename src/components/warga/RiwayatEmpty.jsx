import { FiFileText } from "react-icons/fi";

export default function RiwayatEmpty({ dataLength }) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl py-16 text-center">
      <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
        <FiFileText className="w-5 h-5 text-slate-300" />
      </div>
      <p className="text-slate-500 text-sm font-medium">
        {dataLength === 0 ? "Belum ada pengajuan surat" : "Tidak ada hasil untuk filter ini"}
      </p>
      <p className="text-slate-300 text-xs font-normal mt-1">
        {dataLength === 0 ? "Ajukan surat pertamamu sekarang." : "Coba pilih filter yang lain."}
      </p>
    </div>
  );
}