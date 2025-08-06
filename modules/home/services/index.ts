import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { createBusinessPayload } from "../types";

const endpoint = "/business";

export const useCreateBusiness = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (err: AxiosError) => void;
}) => {
  return useMutation({
    mutationFn: async (body: createBusinessPayload) => {
      const createResponse = await axiosInstance.post(`${endpoint}`, body);
      return createResponse.data.data;
    },
    onSuccess,
    onError,
  });
};
