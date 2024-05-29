import { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { NewsItemLayoutEnum } from "@enums/commonEnum";
import { LoadingSkeleton } from "@components/Loading";
import { NewsDataType } from "@interfaces/Common/newsType";

import NewsItem from "../Components/NewsItem";
import { getRelatedNews } from "../../../app/Services/App/newsServive";

const RelatedNews = () => {
  const { t } = useTranslation();
  const [relatedNews, setRelatedNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await getRelatedNews();
      setRelatedNews(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="xs:col-span-3 xl:col-span-1">
      {isLoading ? (
        <LoadingSkeleton className="w-full h-10 bg-white mb-6" />
      ) : (
        <div className="w-full h-10 font-bold text-2xl rounded-md xs:mt-4 xl:mt-0 mb-2 flex items-start">
          {t("relatedNews")}
        </div>
      )}
      <div className="h-fit overflow-y-clip flex flex-wrap gap-y-6">
        {!isLoading &&
          relatedNews.map((item) => <NewsItem key={item._id} type={NewsItemLayoutEnum.ROW} news={item} />)}
        {isLoading &&
          Array.from({ length: 3 }).map((_1, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <LoadingSkeleton key={index} className="w-full bg-white h-36 rounded-md" />
          ))}
      </div>
    </div>
  );
};
export default memo(RelatedNews);
