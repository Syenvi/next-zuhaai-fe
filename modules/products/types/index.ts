export type ProductPayloadType = {
  id: string;
  name: string;
  image?: File;
  images: {
    url: string;
  }[];
  price: string;
  description?: string;
  stock: string;
  created_at: string;
};
