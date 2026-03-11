export default function ServicesSection() {
  const images = [
    "https://picsum.photos/600/400?1",
    "https://picsum.photos/600/400?2",
    "https://picsum.photos/600/400?3",
    "https://picsum.photos/600/400?4",
    "https://picsum.photos/600/400?5",
  ];

  return (
    <section
        id="services"
        className="scroll-mt-32 w-full flex justify-center px-6 py-20"
    >
      <div className="max-w-6xl w-full">

        {/* Divider */}
        <div className="flex items-center mb-10">
          <div className="flex-grow border-t border-gray-400"></div>
          <div className="mx-4 text-gray-500">✿</div>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

        {/* Title */}
        <h2 className="text-center text-5xl italic mb-12">
          Our Services
        </h2>

        {/* Slideshow container */}
        <div className="overflow-hidden border-2 border-yellow-500 rounded-2xl p-8">

          <div className="flex animate-scroll gap-6 w-max">

            {/* Duplicate images so animation loops */}
            {[...images, ...images].map((src, i) => (
              <img
                key={i}
                src={src}
                className="w-72 h-48 object-cover rounded-xl"
                alt="service placeholder"
              />
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}