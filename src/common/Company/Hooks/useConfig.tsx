import _ from "lodash";
import { useCallback } from "react";

import { ConfigKeyEnum } from "@enums/configEnum";

import useSelector from "./useSelector";

const useConfig = () => {
  const configs = useSelector((state) => state.common.configs);
  const getConfig = useCallback(
    (configKey: ConfigKeyEnum) => {
      if (!_.isArray(configs)) {
        return undefined;
      }
      const config = configs.find((item) => item.key === configKey);
      if (config) {
        return config.value;
      }
      return undefined;
    },
    [configs],
  );

  return getConfig;
};

export default useConfig;
