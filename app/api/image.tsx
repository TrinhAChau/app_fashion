import BASE_URL from ".";

// Tải ảnh sản phẩm lên
const UploadImage = async (image: File, token: string) => {
  const response = await BASE_URL.post("/upload", image, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export { UploadImage };
