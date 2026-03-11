export default function WelcomeSection() {
  return (
    <section
      id="welcome"
      className="scroll-mt-32 w-full flex justify-center px-6 py-16"
    >
      <div className="max-w-6xl w-full">

        {/* Divider */}
        <div className="flex items-center mb-10">
          <div className="flex-grow border-t border-gray-400"></div>
          <div className="mx-4 text-gray-500 text-xl">✿</div>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

        <h2 className="text-center text-5xl italic font-semibold mb-10">
          Welcome
        </h2>

        <div className="text-gray-800 leading-relaxed max-w-3xl mx-auto">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

      </div>
    </section>
  )
}