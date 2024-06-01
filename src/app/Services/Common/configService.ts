import { CONFIG_API_PATH } from "@constants/apiConstant";
import { BaseListQueryType, ConfigDataType, ConfigFormDataType, ResponseDataType } from "@interfaces/Common";
import { axiosInstance } from "@utils/Axios";

const fakeConfigData: ConfigDataType[] = [
  {
    _id: 1,
    key: "site-description",
    value: "Website news for football",
  },
  {
    _id: 2,
    key: "footer-facebook",
    value: "https://www.facebook.com",
  },
  {
    _id: 3,
    key: "footer-twitter",
    value: "https://www.twitter.com",
  },
  {
    _id: 4,
    key: "footer-instagram",
    value: "https://www.instagram.com",
  },
  {
    _id: 10,
    key: "footer-linkedin",
    value: "https://www.linkedin.com",
  },
  {
    _id: 11,
    key: "footer-phone",
    value: "0999999999",
  },
  {
    _id: 12,
    key: "footer-email",
    value: "contact@gmail.com",
  },
  {
    _id: 4,
    key: "site-name",
    value: "SPORT1",
  },
  {
    _id: 26,
    key: "pagination-trigger-percent",
    value: "70",
  },
  {
    _id: 25,
    key: "pagination-page-size",
    value: "10",
  },
];

const getPublicConfigs = async (): Promise<ConfigDataType[]> => {
  return Promise.resolve(fakeConfigData);
};

const getConfigs = async (params?: BaseListQueryType): Promise<ResponseDataType<ConfigDataType[]>> => {
  const response = await axiosInstance.get(CONFIG_API_PATH.CONFIGS, { params });
  return {
    data: response.data.data,
    meta: response.data.meta,
  };
};

const createConfig = async (data: ConfigFormDataType) => {
  await axiosInstance.post(CONFIG_API_PATH.CONFIGS, data);
};

const editConfig = async (id: number, data: ConfigFormDataType) => {
  await axiosInstance.put(CONFIG_API_PATH.CONFIGS_ID(id), data);
};

const deleteConfig = async (id: number) => {
  await axiosInstance.delete(CONFIG_API_PATH.CONFIGS_ID(id));
};

export { getConfigs, createConfig, editConfig, deleteConfig, getPublicConfigs };
