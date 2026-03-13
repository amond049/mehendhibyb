export default function WelcomeSection() {
  return (
    <section
      id="welcome"
      className="scroll-mt-32 w-full flex justify-center px-4 sm:px-6 py-12 sm:py-16"
    >
      <div className="max-w-5xl w-full">

        {/* Divider */}
        <div className="flex items-center mb-8 sm:mb-10">
          <div className="flex-grow border-t border-gray-400"></div>
          <div className="mx-3 sm:mx-4 text-gray-500 text-lg sm:text-xl">✿</div>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

        {/* Title */}
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl italic font-semibold mb-6 sm:mb-10">
          Welcome
        </h2>

        {/* Text */}
        <div className="text-gray-800 leading-relaxed max-w-2xl mx-auto text-sm sm:text-base">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Vivamus vestibulum mauris sed lobortis varius.
          </p>
        </div>

      </div>
    </section>
  )
}