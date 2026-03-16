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

  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "people" ? Number(value) : value,
    }));
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
          finalFile = new File(
            [blob as Blob],
            file.name.replace(/\.heic$/i, ".jpg"),
            { type: "image/jpeg" }
          );
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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
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

  const removeImage = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const previews = useMemo(() => files.map((file) => URL.createObjectURL(file)), [files]);

  useEffect(() => {
    return () => previews.forEach((url) => URL.revokeObjectURL(url));
  }, [previews]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000); // hide after 4s
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
        setNotification({ type: "success", message: t("bookingPage.bookingSuccess") });
      } else {
        setNotification({ type: "error", message: t("bookingPage.bookingError") });
      }
    } catch (err) {
      console.error(err);
      setNotification({ type: "error", message: t("bookingPage.bookingError") });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--booking-page-background)] flex justify-center px-6 py-20 relative">
      <div className="max-w-3xl w-full bg-[var(--booking-page-form-background)] rounded-2xl shadow-lg p-10 relative">
        <h1 className="font-bold text-4xl italic text-center mb-10 text-[var(--booking-page-title-color)]">
          {t("bookingPage.bookAnAppointment")}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <p className="mb-1 text-[var(--booking-page-text-color)]">
              {t("bookingPage.description")}
            </p>
            <p className="mb-2 font-bold text-[var(--booking-page-text-color)]">
              {t("bookingPage.instagramNotice")}
            </p>
          </div>

          {/* Name */}
          <div>
            <label className="block mb-1 font-bold text-[var(--booking-page-label-color)]">
              {t("bookingPage.name")}
            </label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder={t("bookingPage.namePlaceholder")}
              className="w-full border rounded-lg px-4 py-2 border-[var(--booking-page-input-border)] bg-[var(--booking-page-input-background)] text-[var(--booking-page-input-text)]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-bold text-[var(--booking-page-label-color)]">
              {t("bookingPage.email")}
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder={t("bookingPage.emailPlaceholder")}
              className="w-full border rounded-lg px-4 py-2 border-[var(--booking-page-input-border)] bg-[var(--booking-page-input-background)] text-[var(--booking-page-input-text)]"
            />
          </div>

          {/* Service */}
          <div>
            <label className="block mb-1 font-bold text-[var(--booking-page-label-color)]">
              {t("bookingPage.service")}
            </label>
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 border-[var(--booking-page-input-border)] bg-[var(--booking-page-input-background)] text-[var(--booking-page-input-text)]"
            >
              <option value="">{t("bookingPage.service")}</option>
              <option value="service1">{t("bookingPage.service1")}</option>
              <option value="service2">{t("bookingPage.service2")}</option>
              <option value="service3">{t("bookingPage.service3")}</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block mb-1 font-bold text-[var(--booking-page-label-color)]">
              {t("bookingPage.date")}
            </label>
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 border-[var(--booking-page-input-border)] bg-[var(--booking-page-input-background)] text-[var(--booking-page-input-text)]"
            />
          </div>

          {/* Number of People */}
          <div>
            <label className="block mb-1 font-bold text-[var(--booking-page-label-color)]">
              {t("bookingPage.numberOfPeople")}
            </label>
            <input
              name="people"
              type="number"
              min={1}
              value={form.people}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 border-[var(--booking-page-input-border)] bg-[var(--booking-page-input-background)] text-[var(--booking-page-input-text)]"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block mb-1 font-bold text-[var(--booking-page-label-color)]">
              {t("bookingPage.message")}
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder={t("bookingPage.messagePlaceholder")}
              className="w-full border rounded-lg px-4 py-2 h-28 border-[var(--booking-page-input-border)] bg-[var(--booking-page-input-background)] text-[var(--booking-page-input-text)]"
            />
          </div>

          {/* Multi-image Dropzone */}
          <div>
            <label className="block mb-1 font-bold text-[var(--booking-page-label-color)]">
              {t("bookingPage.uploadImages")}
            </label>
            <div
              {...getRootProps()}
              className={`border-dashed border-2 rounded-lg p-6 text-center cursor-pointer transition
                ${isDragActive ? "border-[var(--booking-page-dropzone-active-border)] bg-[var(--booking-page-dropzone-active-background)]"
                               : "border-[var(--booking-page-dropzone-border)] bg-[var(--booking-page-dropzone-background)]"}`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-[var(--booking-page-text-color)]">{t("bookingPage.dragImagesActive")}</p>
              ) : (
                <p className="text-[var(--booking-page-text-color)]">{t("bookingPage.dragImagesInactive")}</p>
              )}
            </div>

            {/* Previews with remove button */}
            {files.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-4">
                {files.map((file, index) => (
                  <div key={file.name + index} className="relative w-20 h-20">
                    <img
                      src={previews[index]}
                      alt={`preview-${index}`}
                      className="w-20 h-20 object-cover rounded-lg border-[var(--booking-page-preview-border)]"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 rounded-full w-5 h-5 flex items-center justify-center text-xs bg-[var(--booking-page-remove-button-bg)] text-[var(--booking-page-remove-button-text)] hover:bg-[var(--booking-page-remove-button-hover)]"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSending}
            className={`w-full py-3 rounded-lg transition bg-[var(--booking-page-submit-bg)] text-[var(--booking-page-submit-text)] hover:bg-[var(--booking-page-submit-hover)] disabled:bg-[var(--booking-page-submit-disabled)] disabled:cursor-not-allowed`}
          >
            {t("bookingPage.requestBooking")}
          </button>
        </form>

        {/* Uploading Modal */}
        {isUploading && (
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="bg-[var(--booking-page-modal-bg)] p-6 rounded-lg shadow-lg border pointer-events-auto">
              <p className="text-lg font-medium text-[var(--booking-page-modal-text)]">
                {t("bookingPage.processingImages")}
              </p>
            </div>
            <div className="fixed inset-0 bg-[var(--booking-page-modal-overlay)]"></div>
          </div>
        )}

        {/* Sending Modal */}
        {isSending && (
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="bg-[var(--booking-page-modal-bg)] p-6 rounded-lg shadow-lg border pointer-events-auto">
              <p className="text-lg font-medium text-[var(--booking-page-modal-text)]">
                {t("bookingPage.sendingEmail")}
              </p>
            </div>
            <div className="fixed inset-0 bg-[var(--booking-page-modal-overlay)]"></div>
          </div>
        )}

        {/* Notification */}
        {notification && (
          <div
            className={`fixed top-4 right-4 z-50 px-4 py-3 rounded shadow-lg text-[var(--booking-page-notification-text)] transition-all duration-300 transform ${
              notification.type === "success"
                ? "bg-[var(--booking-page-notification-success)]"
                : "bg-[var(--booking-page-notification-error)]"
            } animate-slide-in`}
          >
            {notification.message}
          </div>
        )}
      </div>
    </main>
  );
}