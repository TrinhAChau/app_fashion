import BASE_URL from "./Header";

const searchCategry = async (category_id: string) => {
  const response = await BASE_URL.get("/products/search", {
    params: {
      category_id,
    },
  });
  return response?.data;
};

export { searchCategry };
