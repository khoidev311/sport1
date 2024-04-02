import { ConfigStatusEnum, ConfigTypeEnum } from "@enums/configEnum";
import { ConfigDataType } from "@interfaces/Common";

const fakeConfigData: ConfigDataType[] = [
  {
    id: 1,
    key: "site-description",
    value: "Website news for football",
    type: ConfigTypeEnum.STRING,
    status: ConfigStatusEnum.PUBLIC,
    group_id: 4,
  },
  {
    id: 2,
    key: "footer-facebook",
    value: "https://www.facebook.com",
    type: ConfigTypeEnum.STRING,
    status: ConfigStatusEnum.PUBLIC,
    group_id: 1,
  },
  {
    id: 3,
    key: "footer-twitter",
    value: "https://www.twitter.com",
    type: ConfigTypeEnum.STRING,
    status: ConfigStatusEnum.PUBLIC,
    group_id: 1,
  },
  {
    id: 4,
    key: "footer-instagram",
    value: "https://www.instagram.com",
    type: ConfigTypeEnum.STRING,
    status: ConfigStatusEnum.PUBLIC,
    group_id: 1,
  },
  {
    id: 10,
    key: "footer-linkedin",
    value: "https://www.linkedin.com",
    type: ConfigTypeEnum.STRING,
    status: ConfigStatusEnum.PUBLIC,
    group_id: 1,
  },
  {
    id: 11,
    key: "footer-phone",
    value: "0989999999",
    type: ConfigTypeEnum.STRING,
    status: ConfigStatusEnum.PUBLIC,
    group_id: 1,
  },
  {
    id: 12,
    key: "footer-email",
    value: "contact@gmail.com",
    type: ConfigTypeEnum.STRING,
    status: ConfigStatusEnum.PUBLIC,
    group_id: 1,
  },
  {
    id: 4,
    key: "site-name",
    value: "SPORT1",
    type: ConfigTypeEnum.STRING,
    status: ConfigStatusEnum.PUBLIC,
    group_id: 4,
  },
  {
    id: 6,
    key: "cover-image-default",
    value:
      "https://media.techupcorp.com/agolf-system/public/img/GUYTI3BY8FjxENR-Great_Waters_at_Reynolds_Lake_Oconee_-_Oct_2019.jpg",
    type: ConfigTypeEnum.IMAGE,
    status: ConfigStatusEnum.PUBLIC,
    group_id: 1,
  },
  {
    id: 3,
    key: "site-logo",
    value: "https://media.techupcorp.com/agolf-system/public/img/c0V4RoBF7USpNOA-FullLogo_Transparent.png",
    type: ConfigTypeEnum.IMAGE,
    status: ConfigStatusEnum.PUBLIC,
    group_id: 4,
  },
  {
    id: 24,
    key: "site-icon",
    value: "https://media.techupcorp.com/agolf-system/public/img/gbnBKg67sMYUOtA-agolf-favo-icon.png",
    type: ConfigTypeEnum.IMAGE,
    status: ConfigStatusEnum.PUBLIC,
    group_id: 4,
  },
  {
    id: 26,
    key: "pagination-trigger-percent",
    value: "70",
    type: ConfigTypeEnum.NUMBER,
    status: ConfigStatusEnum.PUBLIC,
    group_id: 4,
  },
  {
    id: 25,
    key: "pagination-page-size",
    value: "60",
    type: ConfigTypeEnum.NUMBER,
    status: ConfigStatusEnum.PUBLIC,
    group_id: 4,
  },
];

const getPublicConfigs = async (): Promise<ConfigDataType[]> => {
  // const response = await Axios.instance.get(CONFIG_API_PATH.CONFIGS, {
  //   params: {
  //     pageSize: 99,
  //   },
  // });

  // return response.data.data;

  return Promise.resolve(fakeConfigData);
};

export { getPublicConfigs };
