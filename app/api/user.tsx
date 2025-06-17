import BASE_URL from ".";

// Đăng nhập Admin
const LoginAdmin = async (values: object) => {
  const response = await BASE_URL.post("/users/login");
  return response.data;
};

// Lấy danh sách tài khoản
const GetListAccount = async (token: string) => {
  const response = await BASE_URL.post("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Thêm tài khoản user
const CreateUser = async (values: object) => {
  const response = await BASE_URL.post("/users/register", values);
  return response.data;
};

// Sửa thông tin user
const EditUser = async (values: object, token: string) => {
  const response = await BASE_URL.put("/users/profile", values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Xóa tài khoản user
const DeteleUser = async (id: string, token: string) => {
  const response = await BASE_URL.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export { CreateUser, DeteleUser, EditUser, GetListAccount, LoginAdmin };
