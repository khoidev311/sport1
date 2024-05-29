import { memo } from "react";
import { useTranslation } from "react-i18next";
import { TbPointFilled } from "react-icons/tb";
import { Link } from "react-router-dom";

import { NewsDataType } from "@interfaces/Common/newsType";
import { NewsItemLayoutEnum } from "@enums/commonEnum";

interface NewsItemProps {
  type: NewsItemLayoutEnum;
  news: NewsDataType;
}

const NewsItem = ({ type, news }: NewsItemProps) => {
  const { t } = useTranslation();
  return (
    <>
      {type === NewsItemLayoutEnum.COLUMN && (
        <Link className="xs:col-span-4 md:col-span-2 xl:col-span-1" to={`/news/${news._id}`}>
          <div className="w-full hover:scale-[1.01] bg-white rounded-md h-fit drop-shadow-md group">
            <div className="w-full h-36">
              <img
                className="w-full h-full object-cover object-center rounded-t-md"
                alt="lastest-new"
                src={news.img}
              />
            </div>
            <div className="px-3 py-2">
              <div className="w-full h-6 flex gap-x-2 items-center">
                <div className="w-6 flex items-center justify-center h-6 rounded-full bg-app font-bold text-white">
                  S
                </div>
                <span className=" text-sm font-semibold">SPORT1</span>
                <TbPointFilled size={8} />
                <div className="text-xs">3 hour ago</div>
              </div>
              <div className="font-bold hover-group-app  mt-2 text-sm max-h-12 text-ellipsis break-all line-clamp-2">
                {news.title}
              </div>
              <div className="text-xs line-clamp-3 my-1 max-h-16 text-ellipsis break-all">
                {news.description}
              </div>
              <div className="w-full h-fit flex gap-x-2 items-center justify-start">
                <div className="text-xs font-semibold text-app">{t("hotNews")}</div>
                <TbPointFilled size={8} />
                <div className="text-xs">5 min read</div>
              </div>
            </div>
          </div>
        </Link>
      )}
      {type === NewsItemLayoutEnum.ROW && (
        <Link to={`/news/${news._id}`}>
          <div className="w-full grid group hover:scale-[1.01] grid-cols-5 bg-white rounded-md h-36 drop-shadow-md">
            <div className="col-span-2">
              <img
                className="w-full h-full object-cover object-center rounded-l-md"
                alt="lastest-new"
                src={news.img}
              />
            </div>
            <div className="col-span-3 px-3 py-1.5">
              <div className="font-bold hover-group-app  text-sm max-h-12 text-ellipsis break-all line-clamp-2">
                {news.title}
              </div>
              <div className="text-xs  h-14 py-1 text-ellipsis break-all line-clamp-3">
                {news.description}
              </div>
              <div className="w-full h-8 pt-2 flex gap-x-2 items-center">
                <div className="w-6 flex items-center justify-center h-6 rounded-full bg-app font-bold text-white">
                  S
                </div>
                <span className=" text-sm font-semibold">SPORT1</span>
                <TbPointFilled size={8} />
                <div className="text-xs">3 hour ago</div>
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};
export default memo(NewsItem);
