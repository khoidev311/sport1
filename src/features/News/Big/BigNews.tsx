import { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay } from "swiper/modules";

import { getBigNews } from "@services/App/newsServive";
import { NewsDataType } from "@interfaces/Common/newsType";
import { LoadingSkeleton } from "@components/Loading";

import BigNewsItem from "./BigNewsItem";

const BigNews = () => {
  const { t } = useTranslation();
  const [bigNews, setBigNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await getBigNews();
      setBigNews(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="xs:col-span-3 xl:col-span-2 h-fit  rounded-md">
      <div className="w-full h-10 font-bold text-2xl rounded-md mb-2">{t("bigNews")}</div>
      {!isLoading && (
        <Swiper
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          {bigNews?.map((item) => (
            <SwiperSlide key={item._id}>
              <BigNewsItem news={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {isLoading && <LoadingSkeleton className="w-full bg-white h-[480px] rounded-md" />}
    </div>
  );
};
export default memo(BigNews);
