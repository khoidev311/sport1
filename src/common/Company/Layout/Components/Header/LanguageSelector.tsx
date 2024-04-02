import { memo, useCallback, useEffect, useState } from "react";

import { DEFAULT_PAGE_LANGUAGE } from "../../../../../app/Constants";
import { DataStatusEnum } from "../../../../../app/Enums";
import { languageService } from "../../../../../app/Services";
import { commonSlice } from "../../../../../app/Slices";
import { LoadingSkeleton, OptionLegacy, SelectLegacy } from "../../../Components";
import { useDispatch, useSelector } from "../../../Hooks";

const HeaderLanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(DEFAULT_PAGE_LANGUAGE);
  const [isLoading, setIsLoading] = useState(false);

  const { languages } = useSelector((state) => state.common);

  const dispatch = useDispatch();

  const handChangeLanguage = (newLanguage: string) => {
    setSelectedLanguage(newLanguage);
    languageService.setPageLanguage(newLanguage).then(() => {
      window.location.reload();
    });
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data } = await languageService.getLanguages();
      dispatch(commonSlice.setLanguage(data));
    } catch (error) {
      // TODO: handle error
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    setSelectedLanguage(languageService.getPageLanguage());
    fetchData();
  }, [fetchData]);

  if (isLoading) return <LoadingSkeleton className="h-6 w-20 hidden" />;

  if (!isLoading && !languages.length) return null;

  return (
    <SelectLegacy
      className="mr-8"
      defaultValue={selectedLanguage}
      onChange={(value) => handChangeLanguage(value)}
    >
      {languages.map((item) => {
        if (item.status === DataStatusEnum.DISABLED) return <div key={item.code} />;
        return (
          <OptionLegacy value={item.code} className="flex" key={item.code}>
            <div className="mr-4 h-6 w-8 bg-gray-100">
              {!item.flag ? (
                <LoadingSkeleton className="h-full w-full" />
              ) : (
                <img
                  src={item.flag}
                  alt={item.name}
                  className="h-full w-full border-2 border-gray-100 object-cover object-center"
                />
              )}
            </div>
            {item.name}
          </OptionLegacy>
        );
      })}
    </SelectLegacy>
  );
};

export default memo(HeaderLanguageSelector);
