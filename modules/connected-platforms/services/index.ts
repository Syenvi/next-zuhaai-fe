import { axiosInstance } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ConnectedPlatformType, PlatformType } from "../types";

const endpoint = `/connected-platforms`;

export const useGetPlatforms = () => {
  return useQuery({
    queryKey: ["platforms"],
    queryFn: async () => {
      try {
        const getResponse = await axiosInstance.get(`/platforms`);
        return getResponse.data.data as PlatformType[];
      } catch (error) {
        const axiosError = error as AxiosError;
        throw new Error(axiosError.message);
      }
    },
  });
};

export const useGetConnectedPlatforms = () => {
  return useQuery({
    queryKey: ["connected_platforms"],
    queryFn: async () => {
      try {
        const getResponse = await axiosInstance.get(`${endpoint}`);
        return getResponse.data.data as ConnectedPlatformType[];
      } catch (error) {
        const axiosError = error as AxiosError;
        throw new Error(axiosError.message);
      }
    },
  });
};

export const useGetDetailConnectedPlatform = (id: string) => {
  return useQuery({
    queryKey: ["connected_platform"],
    queryFn: async () => {
      try {
        const getResponse = await axiosInstance.get(`${endpoint}/${id}`);
        return getResponse.data.data as ConnectedPlatformType;
      } catch (error) {
        const axiosError = error as AxiosError;
        throw new Error(axiosError.message);
      }
    },
    enabled: !!id,
  });
};

export const useCreateConnectedPlatform = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (err: AxiosError<{ message: string }>) => void;
}) => {
  return useMutation({
    mutationFn: async (body: ConnectedPlatformType) => {
      const createResopnse = await axiosInstance.post(`${endpoint}`, body);
      return createResopnse.data.data;
    },
    onSuccess,
    onError,
  });
};

export const useUpdateConnectedPlatform = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (err: AxiosError<{ message: string }>) => void;
}) => {
  return useMutation({
    mutationFn: async ({
      body,
      connected_platform_id,
    }: {
      body: ConnectedPlatformType;
      connected_platform_id: string;
    }) => {
      const updateResponse = await axiosInstance.patch(
        `${endpoint}/${connected_platform_id}`,
        body
      );
      return updateResponse.data.data;
    },
    onSuccess,
    onError,
  });
};

export const useDeleteConnectedPlatform = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (err: AxiosError) => void;
}) => {
  return useMutation({
    mutationFn: async (connected_platform_id: string) => {
      const createResopnse = await axiosInstance.delete(
        `${endpoint}/${connected_platform_id}`
      );
      return createResopnse.data.data;
    },
    onSuccess,
    onError,
  });
};

export const useConnectConnectedPlatform = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: {
    status: boolean;
    message: string;
    qr: string;
    data: ConnectedPlatformType;
  }) => void;
  onError: (err: AxiosError) => void;
}) => {
  return useMutation({
    mutationFn: async (connected_platform_id: string) => {
      const createResopnse = await axiosInstance.post(
        `${endpoint}/connect/${connected_platform_id}`
      );
      return createResopnse.data as {
        status: boolean;
        message: string;
        qr: string;
        data: ConnectedPlatformType;
      };
    },
    onSuccess,
    onError,
  });
};
