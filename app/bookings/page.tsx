"use client"

import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function BookingPage() {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    date: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      service: formData.get("service"),
      date: formData.get("date"),
      message: formData.get("message"),
    };

    const res = await fetch("/api/sendBooking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert("Booking request sent!");
    } else {
      alert("Failed to send booking request.");
    }
  };

  return (
    <main className="min-h-screen bg-[var(--booking-page-background)] flex justify-center px-6 py-20">
      <div className="max-w-3xl w-full bg-[var(--booking-page-form-background)] rounded-2xl shadow-lg p-10">

        <h1 className="text-4xl italic text-center mb-10">
          {t("bookingPage.bookAnAppointment")}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">
              {t("bookingPage.name")}
            </label>

            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder={t("bookingPage.namePlaceholder")}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">
              {t("bookingPage.email")}
            </label>

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder={t("bookingPage.emailPlaceholder")}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          {/* Service */}
          <div>
            <label className="block mb-1 font-medium">
              {t("bookingPage.service")}
            </label>

            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">
                {t("bookingPage.selectService")}
              </option>
              <option value="service1">
                {t("bookingPage.service1")}
              </option>
              <option value="service2">
                {t("bookingPage.service2")}
              </option>
              <option value="service3">
                {t("bookingPage.service3")}
              </option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block mb-1 font-medium">
              {t("bookingPage.date")}
            </label>

            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block mb-1 font-medium">
              {t("bookingPage.message")}
            </label>

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder={t("bookingPage.messagePlaceholder")}
              className="w-full border rounded-lg px-4 py-2 h-28"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-black transition"
          >
            {t("bookingPage.requestBooking")}
          </button>

        </form>
      </div>
    </main>
  );
}