import { COMMON_API_PATH } from "@constants/apiConstant";
import { ImageDataType } from "@interfaces/Common";
import { axiosInstance } from "@utils/Axios";

const uploadImage = async (image: File | ImageDataType) => {
  if (image instanceof File) {
    const formData = new FormData();

    formData.append("file", image);

    const response = await axiosInstance.post(COMMON_API_PATH.UPLOAD_IMAGE, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.data;
  }

  return image;
};

export { uploadImage };
