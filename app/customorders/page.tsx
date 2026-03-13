export default function CustomOrdersPage() {
  return (
    <main className="min-h-screen bg-neutral-200 flex justify-center px-6 py-20">

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-10">

        {/* Title */}
        <h1 className="text-4xl italic text-center mb-10">
          Custom Orders
        </h1>

        {/* Form */}
        <form className="space-y-6">

          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">
              Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Contact Info */}
          <div>
            <label className="block mb-1 font-medium">
              Contact Information
            </label>
            <input
              type="text"
              placeholder="Email or phone number"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Custom Order Details */}
          <div>
            <label className="block mb-1 font-medium">
              Order Details
            </label>
            <textarea
              placeholder="Describe what you would like..."
              className="w-full border rounded-lg px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-black transition"
          >
            Submit Request
          </button>

        </form>

      </div>

    </main>
  );
}