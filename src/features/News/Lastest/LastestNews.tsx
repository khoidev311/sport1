import { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { getLastestNews } from "@services/App/newsServive";
import { NewsDataType } from "@interfaces/Common/newsType";
import { NewsItemLayoutEnum } from "@enums/commonEnum";
import { LoadingSkeleton } from "@components/Loading";

import NewsItem from "../Components/NewsItem";

const LastestNews = () => {
  const { t } = useTranslation();
  const [lastestNews, setLastestNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await getLastestNews();
      setLastestNews(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="xs:col-span-3 xl:col-span-1">
      <div className="w-full h-10 font-bold text-2xl rounded-md xl:mt-0 xs:mt-4 mb-2">{t("lastestNews")}</div>
      <div className="h-[480px] overflow-y-clip flex flex-wrap gap-y-6">
        {!isLoading &&
          lastestNews.map((item) => <NewsItem key={item._id} type={NewsItemLayoutEnum.ROW} news={item} />)}

        {isLoading &&
          Array.from({ length: 3 }).map((_1, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <LoadingSkeleton key={index} className="w-full bg-white h-36 rounded-md" />
          ))}
      </div>
    </div>
  );
};
export default memo(LastestNews);
