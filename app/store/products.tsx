// app/store/products.ts
export type Product = {
  slug: string;
  name: string;
  price: string;
  image: string;
  description: string;
};

export const products: Product[] = [
  {
    slug: "bouquet-one",
    name: "Bouquet One",
    price: "$25",
    image: "https://picsum.photos/seed/bouquet-one/600/400",
    description: "A beautiful handcrafted bouquet perfect for special occasions.",
  },
  {
    slug: "bouquet-two",
    name: "Bouquet Two",
    price: "$30",
    image: "https://picsum.photos/seed/bouquet-two/600/400",
    description: "Bright and cheerful flowers that bring joy to any room.",
  },
  {
    slug: "bouquet-three",
    name: "Bouquet Three",
    price: "$22",
    image: "https://picsum.photos/seed/bouquet-three/600/400",
    description: "A delicate mix of seasonal blooms for a charming gift.",
  },
];