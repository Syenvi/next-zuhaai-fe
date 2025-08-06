import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetMe = (run: boolean) => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      try {
        const getResponse = await axiosInstance.get(`/auth/me`);
        return getResponse.data.data;
      } catch (error) {
        const axiosError = error as AxiosError;
        throw new Error(axiosError.message);
      }
    },
    enabled: !!run,
  });
};
