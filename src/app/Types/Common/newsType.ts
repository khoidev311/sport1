import { NewsCategoryEnum } from "@enums/commonEnum";

import { BaseDataType } from "./commonType";

export interface NewsDataType extends BaseDataType {
  img: string;
  title: string;
  description: string;
  category: NewsCategoryEnum;
  content: string;
}
