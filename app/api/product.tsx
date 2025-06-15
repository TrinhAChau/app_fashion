import BASE_URL from ".";

// Lấy danh sách sản phẩm
const GetListProduct = async () => {
  const response = await BASE_URL.get("/products");
  return response.data;
};

// Thêm sản phẩm
const CreateProduct = async (values: object, token: string) => {
  const response = await BASE_URL.post("/products", values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Sửa sản phẩm
const UpdateProduct = async (values: object, id: string, token: string) => {
  const response = await BASE_URL.put(`/products/${id}`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Xóa sản phẩm
const DeteleProduct = async (id: string, token: string) => {
  const response = await BASE_URL.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Tìm kiếm theo tên sản phẩm
const SearchProduct = async (name: string) => {
  const response = await BASE_URL.get("/products/search", {
    params: {
      name,
    },
  });
  return response.data;
};

export {
  CreateProduct,
  DeteleProduct,
  GetListProduct,
  SearchProduct,
  UpdateProduct,
};
