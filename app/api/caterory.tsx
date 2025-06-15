import BASE_URL from ".";

// Thêm danh mục sản phẩm
const CreateCategory = async (values: object, token: string) => {
  const response = await BASE_URL.post("/categories", values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Lấy danh mục sản phẩm

const GetListCategory = async (token: string) => {
  const response = await BASE_URL.get("/categories", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Cập nhật danh mục sản phẩm
const UpdateCateGory = async (values: object, id: string, token: string) => {
  const response = await BASE_URL.put(`/categories/${id}`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Xóa danh mục sản phẩm
const DeteleCategory = async (id: string, token: string) => {
  const response = await BASE_URL.delete(`/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export { CreateCategory, DeteleCategory, GetListCategory, UpdateCateGory };
