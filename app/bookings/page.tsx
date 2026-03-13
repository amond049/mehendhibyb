export default function BookingPage() {
  return (
    <main className="min-h-screen bg-neutral-200 flex justify-center px-6 py-20">

      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-10">

        <h1 className="text-4xl italic text-center mb-10">
          Book an Appointment
        </h1>

        <form className="space-y-6">

          <div>
            <label className="block mb-1 font-medium">
              Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Service
            </label>
            <select className="w-full border rounded-lg px-4 py-2">
              <option>Service 1</option>
              <option>Service 2</option>
              <option>Service 3</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Date
            </label>
            <input
              type="date"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Message
            </label>
            <textarea
              placeholder="Optional notes..."
              className="w-full border rounded-lg px-4 py-2 h-28"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-black transition"
          >
            Request Booking
          </button>

        </form>

      </div>

    </main>
  )
}