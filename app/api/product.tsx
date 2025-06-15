import BASE_URL from "./Header";

// Lấy danh sách tất cả các sản phẩm
const getProduct = async () => {
  const response = await BASE_URL.get("/products");
  return response.data;
};

// Lấy danh sách có phân loại

const getProductType = async () => {
  const response = await BASE_URL.get("/products/products_category");
  return response.data;
};

// Lấy chi tiết sản phẩm theo ID
const getDetailProduct = async (id: number | string) => {
  const response = await BASE_URL.get(`/products/${id}`);
  return response.data;
};

// Tìm kiếm sản phẩm
const searchProduct = async (name: string) => {
  const response = await BASE_URL.get(`/products/search`, {
    params: {
      name,
    },
  });

  return response?.data?.data ?? [];
};

export { getDetailProduct, getProduct, getProductType, searchProduct };
