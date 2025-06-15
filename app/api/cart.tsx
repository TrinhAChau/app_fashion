import BASE_URL from "./Header";

// Thêm sản phẩm vào giỏ hàng
const postCart = async (id: number | string) => {
  const response = await BASE_URL.post("/cart/add-cart");
  return response.data;
};

// Lấy danh sách sản phẩm có trong giỏ hàng
const getCart = async (token: string) => {
  const response = await BASE_URL.post("/cart", token);
  return response.data;
};

export { getCart, postCart };
