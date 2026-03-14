"use client"

import { useTranslation } from "react-i18next";
export default function CustomOrdersPage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-[var(--custom-orders-page-background)] flex justify-center px-6 py-20">

      <div className="w-full max-w-3xl bg-[var(--custom-orders-page-form-background)] rounded-2xl shadow-lg p-10">

        {/* Title */}
        <h1 className="text-4xl italic text-center mb-10">
          {t("customOrdersPage.title")}
        </h1>

        {/* Form */}
        <form className="space-y-6">

          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">
              {t("customOrdersPage.name")}
            </label>
            <input
              type="text"
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
              type="text"
              placeholder={t("customOrdersPage.contactInformationPlaceholder")}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--custom-orders-page-contact-information-label-outline)]"
            />
          </div>

          {/* Custom Order Details */}
          <div>
            <label className="block mb-1 font-medium">
              {t("customOrdersPage.orderDetails")}
            </label>
            <textarea
              placeholder={t("customOrdersPage.orderDetailsPlaceholder")}
              className="w-full border rounded-lg px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-[var(--custom-orders-page-order-details-label-outline)]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[var(--custom-orders-page-submit-button-background)] text-[var(--custom-orders-page-submit-button-text)] py-3 rounded-lg hover:bg-[var(--custom-orders-page-submit-button-hover)] transition"
          >
            {t("customOrdersPage.submitRequest")}
          </button>

        </form>

      </div>

    </main>
  );
}