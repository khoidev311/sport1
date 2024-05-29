import { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { first } from "lodash";

import { NewsDataType } from "@interfaces/Common/newsType";
import { getTransferNews } from "@services/App/newsServive";
import { NewsItemLayoutEnum } from "@enums/commonEnum";
import { LoadingSkeleton } from "@components/Loading";

import NewsItem from "../Components/NewsItem";

const TransferNews = () => {
  const { t } = useTranslation();
  const [transferNews, setTransferNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await getTransferNews();
      setTransferNews(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="col-span-2 h-fit mt-6 rounded-md">
      <div className="w-full h-10 font-bold text-2xl rounded-md mb-2">{t("transferNews")}</div>
      <div className="w-full h-fit relative rounded-md mb-6">
        {!isLoading && (
          <>
            <img
              className="w-full h-72 object-cover object-center rounded-md"
              alt="big-new"
              src={first(transferNews)?.img}
            />
            <div className="h-fit break-before-auto text-2xl font-semibold absolute top-8 left-8 z-10 w-2/3 text-white drop-shadow">
              {first(transferNews)?.title}
            </div>
          </>
        )}
        {isLoading && <LoadingSkeleton className="col-span-1 bg-white h-72 rounded-md" />}
      </div>
      <div className="w-full h-fit pb-2">
        <Swiper
          spaceBetween={24}
          slidesPerView={4}
          modules={[Navigation]}
          wrapperClass="pb-0.5"
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            568: {
              slidesPerView: 3,
            },
            1248: {
              slidesPerView: 4,
            },
          }}
        >
          {!isLoading &&
            transferNews?.map((item) => (
              <SwiperSlide key={item._id}>
                <NewsItem key={item._id} type={NewsItemLayoutEnum.COLUMN} news={item} />
              </SwiperSlide>
            ))}
        </Swiper>
        {isLoading && (
          <div className="w-full h-fit grid-cols-4 grid gap-x-6">
            {Array.from({ length: 4 }).map((_1, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <LoadingSkeleton key={index} className="col-span-1 bg-white h-72 rounded-md" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default memo(TransferNews);
