import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { PiSmileySad } from "react-icons/pi";

import { Modal } from "@components/Modal";
import useDispatch from "@hooks/useDispatch";
import useSelector from "@hooks/useSelector";
import useWatchParam from "@hooks/useWatchParam";
import { hideTimeoutModal } from "@slices/commonSlice";

import { Button } from "../Button";

const AxiosTimeoutModal = () => {
  const { t } = useTranslation("company");

  const isShow = useSelector((state) => state.common.isOpenTimeoutModal);
  const [refreshParam, setRefreshParam] = useWatchParam("refresh");

  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(hideTimeoutModal());
  }, [dispatch]);

  const handleClickTryAgain = useCallback(() => {
    if (refreshParam) {
      return;
    }

    setRefreshParam("1");
    handleClose();
  }, [refreshParam, setRefreshParam, handleClose]);

  return (
    <Modal isOpen={isShow} isShowHeader={false} isShowFooter={false} onClose={handleClose}>
      <div className="flex flex-col items-center justify-center pb-4 pt-4 lg:pb-5">
        <PiSmileySad size={64} className="mb-4 text-primary-700" />
        <div className="mb-1 text-center font-bold">Ooops!</div>
        <div className="text-center">{t("weCannotHandleYourRequest")}</div>
      </div>
      <Button
        type="button"
        className="w-full"
        disabled={!!refreshParam}
        isLoading={!!refreshParam}
        onClick={handleClickTryAgain}
      >
        {!refreshParam && t("tryAgain")}
        {!!refreshParam && `${t("tryingAgain")}...`}
      </Button>
    </Modal>
  );
};

export default memo(AxiosTimeoutModal);
