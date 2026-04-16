// ===== VALIDASI FORM WARGA =====
export const validateWargaForm = (form, editData) => {
  const nama = form.nama?.trim();
  const nik = form.nik?.trim();
  const password = form.password?.trim();

  if (!nama) return "Nama wajib diisi.";

  if (!/^\d{16}$/.test(nik)) {
    return "NIK harus 16 digit angka.";
  }

  if (form.no_hp && !/^08\d{8,11}$/.test(form.no_hp)) {
    return "Format nomor HP tidak valid.";
  }

  if (!editData && !password) {
    return "Password wajib diisi untuk warga baru.";
  }

  if (password && password.length < 6) {
    return "Password minimal 6 karakter.";
  }

  return null;
};