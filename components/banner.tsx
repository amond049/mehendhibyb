export default function Banner() {
  return (
    <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8 mt-8">
      <div
        className="
          w-full
          max-w-6xl
          h-40 sm:h-56 md:h-72
          rounded-3xl
          flex
          items-center
          justify-center
          bg-[#2E3022]
        "
      >
        <h1
          className="
            text-yellow-300
            font-script
            text-4xl
            sm:text-6xl
            md:text-7xl
            lg:text-8xl
          "
        >
          Logo
        </h1>
      </div>
    </div>
  );
}