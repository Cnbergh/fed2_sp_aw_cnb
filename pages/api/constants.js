export const API_URL =
  process.env.NEXT_PUBLIC_NOROFF_API_URL ||
  "https://api.noroff.dev/api/v1/auction";

// auth endpoints
export const Login_URL = `${API_URL}/auth/login`;
export const SignUp_URL = `${API_URL}/auth/register`;
