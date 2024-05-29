import { useMemo } from "react";

import { getTwScreenWidth } from "@utils/Helpers/commonHelper";

const useIsMobileDevice = () => {
  const isMobile = useMemo(() => window.innerWidth < getTwScreenWidth("lg"), []);

  return isMobile;
};

export default useIsMobileDevice;
