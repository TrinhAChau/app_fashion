import BASE_URL from "./Header";

// Tạo hóa đợn sau khi thanh toán
const detailOrderPay = async (values: object, token: string | null) => {
  const response = await BASE_URL.post("/orders/add", values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

// Lấy danh sách hóa đơn sau khi tạo
const getListOrder = async (token: string | null) => {
  const response = await BASE_URL.post(
    "orders",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Lấy chi tiêt hóa đơn, kèm thông tin hóa đơn,
const getDetailOrder = async (id: string, token: string) => {
  const response = await BASE_URL.post(
    `orders/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
export { detailOrderPay, getDetailOrder, getListOrder };
