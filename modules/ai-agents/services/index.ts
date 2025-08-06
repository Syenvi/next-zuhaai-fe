import { axiosInstance } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AgentPayloadType } from "../types";

const endpoint = "/agents";

export const useGetAgents = () => {
  return useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      try {
        const getResponse = await axiosInstance.get(`${endpoint}`);
        return getResponse.data.data;
      } catch (error) {
        const axiosError = error as AxiosError;
        throw new Error(axiosError.message);
      }
    },
  });
};

export const useCreateAgent = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (err: AxiosError) => void;
}) => {
  return useMutation({
    mutationFn: async (body: AgentPayloadType) => {
      const createResopnse = await axiosInstance.post(`${endpoint}`, body);
      return createResopnse.data.data;
    },
    onSuccess,
    onError,
  });
};

export const useDeleteAgent = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (err: AxiosError) => void;
}) => {
  return useMutation({
    mutationFn: async (agent_id: string) => {
      const deleteResponse = await axiosInstance.delete(
        `${endpoint}/${agent_id}`
      );
      return deleteResponse.data.data;
    },
    onSuccess,
    onError,
  });
};
