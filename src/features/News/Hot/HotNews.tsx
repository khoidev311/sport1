import { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { getHotNews } from "@services/App/newsServive";
import { NewsDataType } from "@interfaces/Common/newsType";
import { NewsItemLayoutEnum } from "@enums/commonEnum";
import { LoadingSkeleton } from "@components/Loading";

import NewsItem from "../Components/NewsItem";

const HotNews = () => {
  const { t } = useTranslation();
  const [hotNews, setHotNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await getHotNews();
      setHotNews(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="w-full h-fit rounded-md">
      <div className="w-full h-10 font-bold text-2xl rounded-md mb-2">{t("hotNews")}</div>
      <div className="w-full h-fit grid-cols-4 grid gap-x-6">
        {!isLoading &&
          hotNews.map((item) => <NewsItem key={item.uuid} type={NewsItemLayoutEnum.COLUMN} news={item} />)}
        {isLoading &&
          Array.from({ length: 4 }).map((_1, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <LoadingSkeleton key={index} className="col-span-1 bg-white h-72 rounded-md" />
          ))}
      </div>
    </div>
  );
};
export default memo(HotNews);
