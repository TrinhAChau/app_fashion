import { User } from "../screens/types/user.type";
import BASE_URL from "./Header";

// Đăng Kí tài khoản

const RegisterAccount = async (data: User) => {
  const response = await BASE_URL.post("/users/register", data);
  return response.data;
};

// Đăng nhập tài khoản
const LoginAccount = async (data: object) => {
  const response = await BASE_URL.post("/users/login", data);
  return response.data;
};

// Đăng xuất tài khoản
const LogoutAccount = async (token: string) => {
  const response = await BASE_URL.post("/users/logout", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

// Kiểm tra email
const checkEmail = async (email: object) => {
  const response = await BASE_URL.post("/users/check-email", email);
  return response;
};

// Đổi mật khẩu mới

const newPasswordAccont = async (data: object) => {
  const response = await BASE_URL.post("/users/reset-password", data);
  return response;
};

// Cập nhật thông tin user
const updateUser = (values: object, token: string) => {
  const response = BASE_URL.put(`/users/profile`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

// Lấy thông tin cá nhân

const getProfile = async (values: object, token: string) => {
  const response = await BASE_URL.post("/users/profile", values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export {
  checkEmail,
  getProfile,
  LoginAccount,
  LogoutAccount,
  newPasswordAccont,
  RegisterAccount,
  updateUser,
};
