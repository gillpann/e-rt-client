import { FiHome, FiCreditCard, FiTruck } from "react-icons/fi";
import { MdOutlineVolunteerActivism, MdOutlineStorefront, MdOutlineArticle } from "react-icons/md";

export const AGAMA_OPTIONS = [
  "Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu",
];

export const STAT_CARDS = [
  { key: "menunggu", label: "Menunggu", color: "text-amber-600", bg: "bg-amber-50",    border: "border-amber-100"   },
  { key: "diproses", label: "Diproses", color: "text-blue-600",  bg: "bg-blue-50",     border: "border-blue-100"    },
  { key: "selesai",  label: "Selesai",  color: "text-primary-700", bg: "bg-primary-50", border: "border-primary-100" },
];

export const FILTER_LABELS = ["Semua", "Menunggu", "Diproses", "Selesai"];

export const LAYANAN = [
  {
    icon: FiHome,
    title: "Surat Keterangan Domisili",
    desc: "Untuk keperluan pembukaan rekening, pendaftaran sekolah, melamar kerja, dan administrasi lainnya.",
  },
  {
    icon: FiCreditCard,
    title: "Surat Pengantar KTP / KK",
    desc: "Pengantar dari RT untuk pengurusan KTP baru, perpanjangan, atau pembuatan Kartu Keluarga.",
  },
  {
    icon: MdOutlineVolunteerActivism,
    title: "Surat Keterangan Tidak Mampu",
    desc: "Digunakan untuk keperluan beasiswa, keringanan biaya rumah sakit, atau bantuan sosial.",
  },
  {
    icon: MdOutlineStorefront,
    title: "Surat Keterangan Usaha",
    desc: "Menerangkan bahwa pemegang surat menjalankan usaha di wilayah RT ini.",
  },
  {
    icon: MdOutlineArticle,
    title: "Surat Keterangan Kematian",
    desc: "Untuk pengurusan akta kematian, klaim asuransi, BPJS, atau keperluan administrasi lainnya.",
  },
  {
    icon: FiTruck,
    title: "Surat Keterangan Pindah",
    desc: "Digunakan saat warga akan berpindah alamat dari wilayah RT ini ke wilayah lain.",
  },
];