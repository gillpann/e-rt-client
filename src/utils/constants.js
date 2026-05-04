import { FiHome, FiCreditCard, FiTruck, FiClock, FiLoader, FiCheck } from "react-icons/fi";
import { MdOutlineVolunteerActivism, MdOutlineStorefront, MdOutlineArticle } from "react-icons/md";



export const AGAMA_OPTIONS = [
  "Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu",
];

export const STAT_CARDS = [
  {
    key: "menunggu",
    label: "Menunggu",
    bg: "bg-amber-50",
    border: "border-amber-300",
    color: "text-amber-800",
    labelColor: "text-amber-600",
    iconBg: "bg-amber-200",
    iconColor: "text-amber-800",
    Icon: FiClock,
  },
  {
    key: "diproses",
    label: "Diproses",
    bg: "bg-blue-50",
    border: "border-blue-300",
    color: "text-blue-800",
    labelColor: "text-blue-500",
    iconBg: "bg-blue-200",
    iconColor: "text-blue-800",
    Icon: FiLoader,
  },
  {
    key: "selesai",
    label: "Selesai",
    bg: "bg-green-50",
    border: "border-green-300",
    color: "text-green-800",
    labelColor: "text-green-600",
    iconBg: "bg-green-200",
    iconColor: "text-green-800",
    Icon: FiCheck,
  },
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