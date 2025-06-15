import BASE_URL from ".";

// Lấy danh sách hóa đơn
const GetListOrder = async (token: string) => {
  const response = await BASE_URL.get("/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Cập nhật trạng thái hóa đơn
const UpdateStatusOrder = async (
  status_id: string,
  id: string,
  token: string
) => {
  const response = await BASE_URL.put(`orders/status/${id}`, status_id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export { GetListOrder, UpdateStatusOrder };
