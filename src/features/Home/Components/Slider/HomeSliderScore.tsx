import { memo, useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import { ScoreDataType } from "@interfaces/Common/scoreType";
import { getScores } from "@services/App/scoreService";

import HomeSliderScoreItem from "./HomeSliderScoreItem";
import HomeSliderScoreItemSkeleton from "./HomeSliderScoreItemSkeleton";

const HomeSliderScore = () => {
  const [scores, setScores] = useState<ScoreDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await getScores();
      setScores(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="w-full h-fit xs:px-6 sm:px-10 md:px-12 xl:px-40 py-6">
      {isLoading && (
        <div className="overflow-y-hidden xs:h-32 md:h-28 xl:h-36">
          <div className="grid xs:grid-cols-1 md:grid-cols-3 xl:grid-cols-4 h-fit gap-x-6">
            {Array.from({ length: 4 }).map((_1, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <HomeSliderScoreItemSkeleton key={index} />
            ))}
          </div>
        </div>
      )}
      {!isLoading && (
        <Swiper
          spaceBetween={36}
          slidesPerView={4}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            568: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1248: {
              slidesPerView: 4,
            },
          }}
        >
          {scores?.map((item) => (
            <SwiperSlide key={item._id}>
              <HomeSliderScoreItem score={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};
export default memo(HomeSliderScore);
