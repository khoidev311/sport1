import { memo, useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { isNull } from "lodash";

import { NewsDataType } from "@interfaces/Common/newsType";
import { getNewsById } from "@services/App/newsServive";
import { LoadingSkeleton } from "@components/Loading";

import RelatedNews from "./Detail/RelatedNews";

const NewsDetail = () => {
  const location = useLocation();
  const path = location.pathname;
  const [news, setNews] = useState<NewsDataType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      if (isNull(path)) return;
      const dataNews = await getNewsById(Number(path.split("/").at(-1)));
      setNews(dataNews);
    } finally {
      setIsLoading(false);
    }
  }, [path]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="w-full h-fit px-40 bg-gray-50 py-8">
      <div className="w-full h-full grid grid-cols-3 gap-x-6 mb-6">
        {!isLoading && (
          <div
            className="col-span-2"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: news?.content || "" }}
          />
        )}
        {isLoading && (
          <div className="col-span-2 h-auto">
            <LoadingSkeleton className="w-full h-full rounded-md bg-white" />
          </div>
        )}
        <RelatedNews />
      </div>
    </div>
  );
};
export default memo(NewsDetail);
