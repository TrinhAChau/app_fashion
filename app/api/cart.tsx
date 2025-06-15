import BASE_URL from ".";

// Lấy danh sách giỏ hàng
const GetListCart = async (token: string) => {
  const response = await BASE_URL.post(
    "/cart",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Xóa giỏ hàng
const DeteleCart = async (id: string, token: string) => {
  const response = await BASE_URL.delete(`/cart/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Cập nhật số lượng sản phẩm

const UpdateQuantily = async (quantity: string, id: string, token: string) => {
  const response = await BASE_URL.put(`/cart/${id}`, quantity, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export { DeteleCart, GetListCart, UpdateQuantily };
