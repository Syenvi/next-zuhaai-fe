"use client";
import axios from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_API_URL}`,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = Cookies.get("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error fetching token from cookies:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data?.message === "Unauthorized") {
      const currentPath = encodeURIComponent(window.location.pathname);
      Cookies.remove("access_token");
      window.location.href = `/login?redirect=${currentPath}`;
      return Promise.reject(new Error("Unauthorized"));
    }
    return response;
  },
  (error) => {
    if (error.response?.data?.message === "Unauthorized") {
      const currentPath = encodeURIComponent(window.location.pathname);
      Cookies.remove("access_token");
      window.location.href = `/login?redirect=${currentPath}`;
    }

    return Promise.reject(error);
  }
);
