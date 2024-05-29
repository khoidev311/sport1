import { Key, memo, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { LayoutContentWrapper } from "@common/Layout";
import { ConfirmationModal } from "@components/Modal";
import { BaseListQueryType, ResponseMetaType } from "@interfaces/Common";
import { RankDataType } from "@interfaces/Common/rankType";
import { createRank, deleteRank, editRank, getRanks } from "@services/App/rankService";

import AdminRankTable from "./Components/Table";
import AdminRankModificationModal from "./Components/ModificationModal";
import AdminRankHeaderAction from "./Components/HeaderAction";

const AdminRankManagement = () => {
  const { t } = useTranslation();

  const [rankData, setRankData] = useState<RankDataType[]>([]);
  const [meta, setMeta] = useState<ResponseMetaType | null>(null);
  const [queryParams, setQueryParams] = useState<BaseListQueryType | undefined>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isShowModificationModal, setIsShowModificationModal] = useState<boolean>(false);
  const [selectedRankId, setSelectedRankId] = useState<Key | null>(null);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);

  const selectedRank = useMemo(() => {
    return rankData?.find((item) => item._id === selectedRankId) ?? null;
  }, [selectedRankId, rankData]);

  const handleClickAddButton = useCallback(() => {
    setIsShowModificationModal(true);
  }, []);

  const handleClickEditButton = useCallback((id?: Key) => {
    setSelectedRankId(id ?? null);
    setIsShowModificationModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsShowModificationModal(false);
    setIsShowDeleteModal(false);
    setSelectedRankId(null);
  }, []);

  const handleClickDeleteButton = useCallback((id?: Key) => {
    setSelectedRankId(id ?? null);
    setIsShowDeleteModal(true);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const { data, meta: metaData } = await getRanks(queryParams);
      setRankData(data);
      setMeta(metaData);
    } finally {
      setIsLoading(false);
    }
  }, [queryParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = useCallback(async () => {
    try {
      await deleteRank(selectedRankId as number);
    } finally {
      fetchData();
    }
  }, [selectedRankId, fetchData]);

  return (
    <LayoutContentWrapper
      title={t("rankManagement")}
      action={<AdminRankHeaderAction onClickAdd={handleClickAddButton} />}
    >
      <AdminRankTable
        data={rankData}
        meta={meta}
        isLoading={isLoading}
        onClickEdit={handleClickEditButton}
        onClickDelete={handleClickDeleteButton}
        onChangeState={setQueryParams}
        onGetAll={getRanks}
      />
      <AdminRankModificationModal
        isOpen={isShowModificationModal}
        rankData={selectedRank}
        onCreate={createRank}
        onCreated={fetchData}
        onEdit={editRank}
        onEdited={fetchData}
        onClose={handleCloseModal}
      />
      <ConfirmationModal
        title={t("deleteRank")}
        message={t("deleteMessage")}
        isOpen={isShowDeleteModal}
        status="danger"
        onClose={handleCloseModal}
        onConfirm={handleDelete}
      />
    </LayoutContentWrapper>
  );
};
export default memo(AdminRankManagement);
