"use client"

import { useTranslation } from "react-i18next";

export default function BookingPage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-[var(--booking-page-background)] flex justify-center px-6 py-20">
      <div className="max-w-3xl w-full bg-[var(--booking-page-form-background)] rounded-2xl shadow-lg p-10">
        <h1 className="text-4xl italic text-center mb-10">
          {t("bookingPage.bookAnAppointment")}
        </h1>

        <form className="space-y-6">

          <div>
            <label className="block mb-1 font-medium">
              {t("bookingPage.name")}
            </label>
            <input
              type="text"
              placeholder={t("bookingPage.namePlaceholder")}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              {t("bookingPage.email")}
            </label>
            <input
              type="email"
              placeholder={t("bookingPage.emailPlaceholder")}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              {t('bookingPage.service')}
            </label>
            <select className="w-full border rounded-lg px-4 py-2">
              <option>{t('bookingPage.service1')}</option>
              <option>{t('bookingPage.service2')}</option>
              <option>{t('bookingPage.service3')}</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">
              {t('bookingPage.date')}
            </label>
            <input
              type="date"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              {t('bookingPage.message')}
            </label>
            <textarea
              placeholder={t('bookingPage.messagePlaceholder')}
              className="w-full border rounded-lg px-4 py-2 h-28"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-black transition"
          >
            {/* TODO: Will need to add functionality here to send email off to the right person when this button is clicked */}
            {t('bookingPage.requestBooking')}
          </button>

        </form>

      </div>

    </main>
  )
}