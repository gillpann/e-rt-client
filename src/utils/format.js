// ===== FORMAT TANGGAL =====
export const formatTanggal = (iso) => {
  if (!iso) return "-";

  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};