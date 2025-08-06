export const handleLogin = () => {
  window.location.href = `${process.env.NEXT_PUBLIC_SERVER_API_URL}/auth/google`;
};
