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

  const [isSending, setIsSending] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value} = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("details", form.details);
    
    try {
      const res = await fetch("api/sendCustomOrder", { method: "POST", body: formData });
      if (res.ok) {
        setForm({ name: "", email: "", details: "", date: ""});
        setNotification({ type: "success", message: t("customOrdersPage.bookingSuccess") });
      } else {
        setNotification({ type: "error", message: t("customOrdersPage.bookingError") });
      } 
    } catch (err) {
      console.error(err);
      setNotification({ type: "error", message: t("customOrdersPage.bookingError") });
    } finally {
      setIsSending(false);
    }
  }

  return (
    <main className="min-h-screen bg-[var(--custom-orders-page-background)] flex justify-center px-6 py-20">

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
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--custom-orders-page-name-label-outline)]"
            />
          </div>

          {/* Contact Info */}
          <div>
            <label className="block mb-1 font-medium">
              {t("customOrdersPage.contactInformation")}
            </label>
            <input
              name="email"
              type="text"
              onChange={handleChange}
              value={form.email}
              placeholder={t("customOrdersPage.contactInformationPlaceholder")}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--custom-orders-page-contact-information-label-outline)]"
            />
          </div>

            <div>
            <label className="block mb-1 font-bold">{t("bookingPage.date")}</label>
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          {/* Custom Order Details */}
          <div>
            <label className="block mb-1 font-medium">
              {t("customOrdersPage.orderDetails")}
            </label>
            <textarea
              name="details"
              value={form.details}
              onChange={handleChange}
              placeholder={t("customOrdersPage.orderDetailsPlaceholder")}
              className="w-full border rounded-lg px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-[var(--custom-orders-page-order-details-label-outline)]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSending}
            className={`w-full py-3 rounded-lg transition ${isSending ? "bg-[var(--custom-orders-page-submit-button-disabled)] cursor-not-allowed" : "bg-[var(--custom-orders-page-submit-button-background)] text-[var(--custom-orders-page-submit-button-normal-state-text)] hover:bg-[var(--custom-orders-page-submit-button-hover-background)]"}`}
          >
            {t("bookingPage.requestBooking")}
          </button>
        </form>

        {/* Sending email modal */}
        {isSending && (
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="bg-white p-6 rounded-lg shadow-lg border pointer-events-auto">
              <p className="text-lg font-medium">{t("bookingPage.sendingEmail")}</p>
            </div>
            <div className="fixed inset-0 bg-[var(--custom-orders-page-email-modal-background)] opacity-20"></div>
          </div>
        )}

        {/* Notification */}
        {notification && (
          <div
            className={`fixed top-4 right-4 z-50 px-4 py-3 rounded shadow-lg text-[var(--custom-orders-page-notification-text)] transition
              ${notification.type === "success" ? "bg-[var(--custom-orders-page-notification-success)]" : "bg-[var(--custom-orders-page-notification-error)]"}`}
          >
            {notification.message}
          </div>
        )}
      </div>
    </main>
  );
}