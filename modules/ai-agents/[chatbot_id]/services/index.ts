import { axiosInstance } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AgentPayloadType } from "../../types";

const endpoint = "/agents";

export const useGetAgent = (agent_id: string) => {
  return useQuery({
    queryKey: ["agent"],
    queryFn: async () => {
      try {
        const getResponse = await axiosInstance.get(`${endpoint}/${agent_id}`);
        return getResponse.data.data;
      } catch (error) {
        const axiosError = error as AxiosError;
        throw new Error(axiosError.message);
      }
    },
    enabled: !!agent_id,
  });
};

export const useUpdateAgent = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (err: AxiosError) => void;
}) => {
  return useMutation({
    mutationFn: async ({
      body,
      agent_id,
    }: {
      body: AgentPayloadType;
      agent_id: string;
    }) => {
      const updateResponse = await axiosInstance.patch(
        `${endpoint}/${agent_id}`,
        body
      );
      return updateResponse.data.data;
    },
    onSuccess,
    onError,
  });
};
