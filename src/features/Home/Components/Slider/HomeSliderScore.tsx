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
    <div className="w-full h-fit px-40 py-6">
      {isLoading && (
        <div className="flex justify-center items-center h-fit gap-x-6">
          {Array.from({ length: 4 }).map((_1, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <HomeSliderScoreItemSkeleton key={index} />
          ))}
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
        >
          {scores?.map((item) => (
            <SwiperSlide key={item.uuid}>
              <HomeSliderScoreItem score={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};
export default memo(HomeSliderScore);
