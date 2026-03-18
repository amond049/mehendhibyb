import Image from "next/image";

export default function Banner() {
  return (
    <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8 mt-8">
      <div
        className="
          w-full
          max-w-5xl
          h-40 sm:h-56 md:h-72
          rounded-3xl
          flex
          items-center
          justify-center
          bg-gradient-to-r from-[var(--banner-background-starting-color)] to-[var(--banner-background-ending-color)]
        "
      >
        <Image
          src="/assets/logo.png" // replace with your actual image file name
          alt="Banner"
          width={550} // adjust width as needed
          height={331} // adjust height as needed
          className="object-contain"
        />
      </div>
    </div>
  );
}