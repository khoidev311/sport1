import { LANGUAGE_API_PATH } from "@constants/apiConstant";
import { DEFAULT_PAGE_LANGUAGE } from "@constants/commonConstant";
import { CURRENT_LANGUAGE_STORAGE_CODE } from "@constants/languageConstant";
import { BaseListQueryType, LanguageDataType, ResponseDataType } from "@interfaces/Common";
import { axiosInstance } from "@utils/Axios";

const setPageLanguage = async (language: string) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(language), 1000);
    localStorage.setItem(CURRENT_LANGUAGE_STORAGE_CODE, language);
  });

const getPageLanguage = () => {
  const currentLanguage = localStorage.getItem(CURRENT_LANGUAGE_STORAGE_CODE);

  if (!currentLanguage) {
    return DEFAULT_PAGE_LANGUAGE;
  }

  return currentLanguage;
};

const getLanguages = async (params?: BaseListQueryType): Promise<ResponseDataType<LanguageDataType[]>> => {
  const response = await axiosInstance.get(LANGUAGE_API_PATH.LANGUAGES, { params });

  return {
    data: response.data.data.items,
    meta: {
      total: response.data.data.total,
    },
  };
};

export { getLanguages, setPageLanguage, getPageLanguage };
