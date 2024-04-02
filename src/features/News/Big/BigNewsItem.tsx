import { memo } from "react";
import { Link } from "react-router-dom";

import { NewsDataType } from "@interfaces/Common/newsType";

interface BigNewsItemProps {
  news: NewsDataType;
}

const BigNewsItem = ({ news }: BigNewsItemProps) => {
  return (
    <Link to={`/news/${news.uuid}`}>
      <div className="relative">
        <img
          className="w-full h-[480px] object-cover object-center rounded-md"
          alt="big-new"
          src={news.img}
        />
        <div className="absolute top-8 left-8 z-10 w-2/3 text-white">
          <div className="h-fit text-2xl font-semibold w-full  drop-shadow">{news.title}</div>
          <div className="text-sm py-2">{news.description}</div>
        </div>
      </div>
    </Link>
  );
};
export default memo(BigNewsItem);
