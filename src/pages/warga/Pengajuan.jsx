import { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { getUserName } from "../../utils/auth";

import StepIndicator  from "../../components/warga/StepIndicator";
import SuccessMessage from "../../components/warga/SuccessMessage";
import PilihSurat     from "../../components/warga/PilihSurat";
import FormPengajuan  from "../../components/warga/FormPengajuan";
import { JENIS_SURAT, KEPERLUAN_OPTIONS } from "../../utils/suratOptions";

export default function Pengajuan() {
  const [step, setStep]   = useState(1);
  const [form, setForm]   = useState({ jenis: "", keperluan: "", keterangan: "" });
  const [loading, setLoading] = useState(false);

  const userName = getUserName();

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "jenis" ? { keperluan: "" } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/surat", {
        jenis:      form.jenis,
        keperluan:  form.keperluan,
        keterangan: form.keterangan || undefined,
      });
      toast.success("Pengajuan berhasil dikirim!");
      setStep(3);
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal mengirim pengajuan.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setForm({ jenis: "", keperluan: "", keterangan: "" });
    setStep(1);
  };

  const selectedKeperluan = form.jenis ? KEPERLUAN_OPTIONS[form.jenis] : [];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-7">
        <h1 className="font-bold text-slate-900 text-xl">Pengajuan Surat</h1>
        <p className="text-slate-400 text-sm font-normal mt-1">
          Ajukan surat keterangan secara online. Surat siap diambil ke pengurus RT.
        </p>
      </div>

      {step < 3 && <StepIndicator step={step} />}

      {step === 1 && (
        <PilihSurat
          JENIS_SURAT={JENIS_SURAT}
          handleChange={handleChange}
          setStep={setStep}
        />
      )}

      {step === 2 && (
        <FormPengajuan
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
          setStep={setStep}
          selectedKeperluan={selectedKeperluan}
          userName={userName}
        />
      )}

      {step === 3 && <SuccessMessage reset={reset} />}
    </div>
  );
}