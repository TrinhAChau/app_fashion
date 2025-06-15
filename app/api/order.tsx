import BASE_URL from "./Header";

const orderCancel = async (values: object, token: string, id: string) => {
  const response = await BASE_URL.put(`orders/status/${id}`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export { orderCancel };
