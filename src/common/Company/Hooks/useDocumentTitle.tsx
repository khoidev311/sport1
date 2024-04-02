import { ReactNode, useEffect } from "react";

import { appNameConfigSelector } from "../../../app/Selectors/commonSelector";
import useSelector from "./useSelector";

const useDocumentTitle = (title: ReactNode, isScrollToTop = true) => {
  const appName = useSelector(appNameConfigSelector);

  useEffect(() => {
    if (typeof title !== "string" || !isScrollToTop) {
      return;
    }

    window.document.title = `${title} | ${appName}`;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [appName, title, isScrollToTop]);
};

export default useDocumentTitle;
