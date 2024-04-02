import { AxiosError } from "axios";
import { memo, useCallback } from "react";

import useDispatch from "@hooks/useDispatch";
import { showTimeoutModal } from "@slices/commonSlice";
import { Axios } from "@utils/index";

import AxiosTimeoutModal from "./AxiosTimeoutModal";

const AxiosProvider = () => {
  const dispatch = useDispatch();

  const handleUnknownError = useCallback(
    (error: AxiosError) => {
      const { message } = error;

      if (message.includes("timeout")) {
        dispatch(showTimeoutModal());
      }
    },
    [dispatch],
  );

  Axios.createInstance(handleUnknownError);

  return <AxiosTimeoutModal />;
};

export default memo(AxiosProvider);
