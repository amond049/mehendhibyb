"use client"

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function CustomOrdersPage() {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    details: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSending, setIsSending] = useState(false);

  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string
  } | null>(null);

  // ✅ VALIDATION (all required, plain English)
  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.name) newErrors.name = "This field is required";
    if (!form.email) newErrors.email = "This field is required";
    if (!form.date) newErrors.date = "This field is required";
    if (!form.details) newErrors.details = "This field is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    // clear error on type
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // ✅ Toast auto-dismiss
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
    formData.append("date", form.date);
    formData.append("details", form.details);

    try {
      const res = await fetch("api/sendCustomOrder", {
        method: "POST",
        body: formData
      });

      if (res.ok) {
        setForm({ name: "", email: "", date: "", details: "" });
        setNotification({ type: "success", message: "Request sent successfully!" });
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
    <main className="min-h-screen bg-[var(--custom-orders-page-background)] flex justify-center px-6 py-20 relative">

      {/* ✅ Toast Notification */}
      {notification && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg
            transition-all duration-300
            ${notification.type === "success"
              ? "bg-[var(--custom-orders-page-notification-success)] text-white"
              : "bg-[var(--custom-orders-page-notification-error)] text-white"
            }`}
        >
          <span className="text-lg">
            {notification.type === "success" ? "✔" : "⚠"}
          </span>

          <p className="text-sm font-medium">{notification.message}</p>

          <button
            onClick={() => setNotification(null)}
            className="ml-2 text-white/80 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      <div className="w-full max-w-3xl bg-[var(--custom-orders-page-form-background)] rounded-2xl shadow-lg p-10">

        {/* Title */}
        <h1 className="text-4xl italic text-center mb-10">
          {t("customOrdersPage.title")}
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">
              {t("customOrdersPage.name")}
            </label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder={t("customOrdersPage.namePlaceholder")}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--custom-orders-page-name-label-outline)]
                ${errors.name && "border-red-500"}`}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">
              {t("customOrdersPage.contactInformation")}
            </label>
            <input
              name="email"
              type="text"
              value={form.email}
              onChange={handleChange}
              placeholder={t("customOrdersPage.contactInformationPlaceholder")}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--custom-orders-page-contact-information-label-outline)]
                ${errors.email && "border-red-500"}`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Date */}
          <div>
            <label className="block mb-1 font-bold">
              {t("bookingPage.date")}
            </label>
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-2
                ${errors.date && "border-red-500"}`}
            />
            {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
          </div>

          {/* Details */}
          <div>
            <label className="block mb-1 font-medium">
              {t("customOrdersPage.orderDetails")}
            </label>
            <textarea
              name="details"
              value={form.details}
              onChange={handleChange}
              placeholder={t("customOrdersPage.orderDetailsPlaceholder")}
              className={`w-full border rounded-lg px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-[var(--custom-orders-page-order-details-label-outline)]
                ${errors.details && "border-red-500"}`}
            />
            {errors.details && <p className="text-red-500 text-sm">{errors.details}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSending}
            className="w-full py-3 rounded-lg font-semibold transition-all duration-200
              bg-[var(--custom-orders-page-submit-button-background)]
              text-[var(--custom-orders-page-submit-button-normal-state-text)]
              hover:bg-[var(--custom-orders-page-submit-button-hover-background)]
              shadow-md hover:shadow-lg
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? "Sending..." : t("bookingPage.requestBooking")}
          </button>
        </form>

        {/* Sending modal */}
        {isSending && (
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="bg-white p-6 rounded-lg shadow-lg border pointer-events-auto">
              <p className="text-lg font-medium">
                {t("bookingPage.sendingEmail")}
              </p>
            </div>
            <div className="fixed inset-0 bg-[var(--custom-orders-page-email-modal-background)] opacity-20"></div>
          </div>
        )}

      </div>
    </main>
  );
}