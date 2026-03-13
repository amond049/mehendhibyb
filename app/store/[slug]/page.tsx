import AddToCartButton from "../../../components/addToCartButton";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

const products = {
  "bouquet-one": {
    name: "Bouquet One",
    price: "$25",
    description: "A beautiful handcrafted bouquet perfect for special occasions.",
    image: "https://picsum.photos/600/400?1",
  },
  "bouquet-two": {
    name: "Bouquet Two",
    price: "$30",
    description: "A vibrant arrangement of seasonal flowers.",
    image: "https://picsum.photos/600/400?2",
  },
  "bouquet-three": {
    name: "Bouquet Three",
    price: "$22",
    description: "A delicate bouquet designed for everyday beauty.",
    image: "https://picsum.photos/600/400?3",
  },
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = products[slug as keyof typeof products];

  if (!product) {
    return <div className="p-20 text-center">Product not found</div>;
  }

  return (
    <main className="min-h-screen bg-neutral-200 flex justify-center px-6 py-20">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-10 grid md:grid-cols-2 gap-10">

        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-xl object-cover"
        />

        <div className="flex flex-col justify-center">

          <h1 className="text-4xl italic mb-4">{product.name}</h1>

          <p className="text-yellow-600 text-xl font-semibold mb-6">
            {product.price}
          </p>

          <p className="text-gray-700 mb-8">
            {product.description}
          </p>

          <AddToCartButton product={product} />

        </div>
      </div>
    </main>
  );
}