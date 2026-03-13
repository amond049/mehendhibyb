import Link from "next/link";

export default function StorePage() {
  const products = [
    {
      slug: "bouquet-one",
      name: "Bouquet One",
      price: "$25",
      image: "https://picsum.photos/400/300?1",
    },
    {
      slug: "bouquet-two",
      name: "Bouquet Two",
      price: "$30",
      image: "https://picsum.photos/400/300?2",
    },
    {
      slug: "bouquet-three",
      name: "Bouquet Three",
      price: "$22",
      image: "https://picsum.photos/400/300?3",
    },
  ];

  return (
    <main className="min-h-screen bg-neutral-200 px-6 py-20 flex justify-center">
      <div className="max-w-6xl w-full">

        <h1 className="text-4xl md:text-5xl italic text-center mb-12">
          Store
        </h1>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">

          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/store/${product.slug}`}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
            >

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4 flex justify-between items-center">
                <h2 className="font-medium text-lg">
                  {product.name}
                </h2>

                <span className="text-yellow-600 font-semibold">
                  {product.price}
                </span>
              </div>

            </Link>
          ))}

        </div>
      </div>
    </main>
  );
}