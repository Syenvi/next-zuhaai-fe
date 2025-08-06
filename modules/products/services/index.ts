import { axiosInstance } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const endpoint = `/products`;

export const useGetProducts = (
  page: string | number,
  sort: string | number,
  s_name: string
) => {
  return useQuery({
    queryKey: ["products", page, sort, s_name],
    queryFn: async () => {
      try {
        const getResponse = await axiosInstance.get(`${endpoint}`, {
          params: {
            page,
            sort,
            s_name,
          },
        });
        return getResponse.data.data;
      } catch (error) {
        const axiosError = error as AxiosError;
        throw new Error(axiosError.message);
      }
    },
  });
};

export const useCreateProduct = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (err: AxiosError) => void;
}) => {
  return useMutation({
    mutationFn: async (body: FormData) => {
      const createResopnse = await axiosInstance.post(`${endpoint}`, body);
      return createResopnse.data.data;
    },
    onSuccess,
    onError,
  });
};

export const useUpdateProduct = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (err: AxiosError) => void;
}) => {
  return useMutation({
    mutationFn: async ({
      body,
      product_id,
    }: {
      body: FormData;
      product_id: string;
    }) => {
      const createResopnse = await axiosInstance.patch(
        `${endpoint}/${product_id}`,
        body
      );
      return createResopnse.data.data;
    },
    onSuccess,
    onError,
  });
};

export const useDeleteProduct = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (err: AxiosError) => void;
}) => {
  return useMutation({
    mutationFn: async (product_id: string) => {
      const createResopnse = await axiosInstance.delete(
        `${endpoint}/${product_id}`
      );
      return createResopnse.data.data;
    },
    onSuccess,
    onError,
  });
};
