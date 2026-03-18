"use client";

import { useTranslation } from "react-i18next";
import { useState, useCallback, useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";

export default function BookingPage() {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    date: "",
    message: "",
    people: 1,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // VALIDATION
  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name) newErrors.name = "This field is required";
    if (!form.email) newErrors.email = "This field is required";
    if (!form.service) newErrors.service = "This field is required";
    if (!form.date) newErrors.date = "This field is required";
    if (!form.people || form.people < 1) newErrors.people = "Must be at least 1";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "people" ? Number(value) : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const heic2any = (await import("heic2any")).default;
    setIsUploading(true);

    const newFiles: File[] = [];

    for (const file of acceptedFiles) {
      let finalFile = file;
      if (file.type === "image/heic" || file.name.toLowerCase().endsWith(".heic")) {
        try {
          const blob = await heic2any({ blob: file, toType: "image/jpeg" });
          finalFile = new File([blob as Blob], file.name.replace(/\.heic$/i, ".jpg"), { type: "image/jpeg" });
        } catch (err) {
          console.error("HEIC conversion failed:", err);
          continue;
        }
      }
      newFiles.push(finalFile);
    }

    setFiles((prev) => [...prev, ...newFiles]);
    setIsUploading(false);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/gif": [],
      "image/webp": [],
      "image/heic": [],
    },
    multiple: true,
  });

  const previews = useMemo(() => files.map((file) => URL.createObjectURL(file)), [files]);
  useEffect(() => () => previews.forEach((url) => URL.revokeObjectURL(url)), [previews]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSending(true);
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("service", form.service);
    formData.append("date", form.date);
    formData.append("message", form.message);
    formData.append("people", form.people.toString());
    files.forEach((file) => formData.append("files", file));

    try {
      const res = await fetch("/api/sendBooking", { method: "POST", body: formData });
      if (res.ok) {
        setForm({ name: "", email: "", service: "", date: "", message: "", people: 1 });
        setFiles([]);
        setNotification({ type: "success", message: "Booking request sent!" });
      } else {
        setNotification({ type: "error", message: "Something went wrong." });
      }
    } catch (err) {
      console.error(err);
      setNotification({ type: "error", message: "Something went wrong." });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-start py-20 px-6 bg-gradient-to-b from-[#F4F6ED] to-[#E8F0D7]">
      
      {/* Toast */}
      {notification && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg transition-all duration-300 ${
            notification.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          <span className="text-lg">{notification.type === "success" ? "✔" : "⚠"}</span>
          <p className="text-sm font-medium">{notification.message}</p>
          <button onClick={() => setNotification(null)} className="ml-2 text-white/80 hover:text-white">✕</button>
        </div>
      )}

      <div className="max-w-3xl w-full bg-[#FDFBF4] rounded-3xl shadow-xl p-10 flex flex-col gap-6">
        <h1 className="text-4xl font-bold italic text-center text-[#3A3D2A] mb-8">
          {t("bookingPage.bookAnAppointment")}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-2 text-[#3A3D2A] bg-white placeholder-[#6B7B55] focus:outline-none focus:ring-2 focus:ring-[#FDE47C] ${errors.name ? "border-red-500" : "border-[#6B7B55]"}`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-2 text-[#3A3D2A] bg-white placeholder-[#6B7B55] focus:outline-none focus:ring-2 focus:ring-[#FDE47C] ${errors.email ? "border-red-500" : "border-[#6B7B55]"}`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-2 text-[#3A3D2A] bg-white focus:outline-none focus:ring-2 focus:ring-[#FDE47C] ${errors.service ? "border-red-500" : "border-[#6B7B55]"}`}
          >
            <option value="" disabled hidden defaultValue={"Select a saervice"}>Select a service</option>
            <option value="service1">{t('bookingPage.service1')}</option>
            <option value="service2">{t('bookingPage.service2')}</option>
            <option value="service3">{t('bookingPage.service3')}</option>
          </select>
          {errors.service && <p className="text-red-500 text-sm">{errors.service}</p>}

          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-2 text-[#3A3D2A] bg-white focus:outline-none focus:ring-2 focus:ring-[#FDE47C] ${errors.date ? "border-red-500" : "border-[#6B7B55]"}`}
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}

          <input
            name="people"
            type="number"
            min={1}
            value={form.people}
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-2 text-[#3A3D2A] bg-white focus:outline-none focus:ring-2 focus:ring-[#FDE47C] ${errors.people ? "border-red-500" : "border-[#6B7B55]"}`}
          />
          {errors.people && <p className="text-red-500 text-sm">{errors.people}</p>}

          <textarea
            name="message"
            placeholder="Message (optional)"
            value={form.message}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 text-[#3A3D2A] bg-white h-28 focus:outline-none focus:ring-2 focus:ring-[#FDE47C] border-[#6B7B55]"
          />

          <div {...getRootProps()} className="border-2 border-dashed border-[#6B7B55] rounded-lg p-6 text-center cursor-pointer hover:bg-[#E6F0D8] transition-colors">
            <input {...getInputProps()} />
            <p className="text-[#3A3D2A]">Drag & drop images here, or click to upload</p>
          </div>

          <button
            type="submit"
            disabled={isSending}
            className="w-full py-3 rounded-lg font-semibold text-[#FDFBF4] bg-[#6B7B55] hover:bg-[#5C6B4B] transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? "Sending..." : "Request Booking"}
          </button>
        </form>
      </div>
    </main>
  );
}