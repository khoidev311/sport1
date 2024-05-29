import { Key, memo, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { LayoutContentWrapper } from "@common/Layout";
import { ConfirmationModal } from "@components/Modal";
import { BaseListQueryType, ResponseMetaType } from "@interfaces/Common";
import { ScoreDataType } from "@interfaces/Common/scoreType";
import { createScore, deleteScore, editScore, getScores } from "@services/App/scoreService";

import AdminScoreTable from "./Components/Table";
import AdminScoreModificationModal from "./Components/ModificationModal";
import AdminScoreHeaderAction from "./Components/HeaderAction";

const AdminScoreManagement = () => {
  const { t } = useTranslation();

  const [scoreData, setScoreData] = useState<ScoreDataType[]>([]);
  const [meta, setMeta] = useState<ResponseMetaType | null>(null);
  const [queryParams, setQueryParams] = useState<BaseListQueryType | undefined>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isShowModificationModal, setIsShowModificationModal] = useState<boolean>(false);
  const [selectedScoreId, setSelectedScoreId] = useState<Key | null>(null);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);

  const selectedScore = useMemo(() => {
    return scoreData?.find((item) => item._id === selectedScoreId) ?? null;
  }, [selectedScoreId, scoreData]);

  const handleClickAddButton = useCallback(() => {
    setIsShowModificationModal(true);
  }, []);

  const handleClickEditButton = useCallback((id?: Key) => {
    setSelectedScoreId(id ?? null);
    setIsShowModificationModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsShowModificationModal(false);
    setIsShowDeleteModal(false);
    setSelectedScoreId(null);
  }, []);

  const handleClickDeleteButton = useCallback((id?: Key) => {
    setSelectedScoreId(id ?? null);
    setIsShowDeleteModal(true);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const { data, meta: metaData } = await getScores(queryParams);
      setScoreData(data);
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
      await deleteScore(selectedScoreId as number);
    } finally {
      fetchData();
    }
  }, [selectedScoreId, fetchData]);

  return (
    <LayoutContentWrapper
      title={t("scoreManagement")}
      action={<AdminScoreHeaderAction onClickAdd={handleClickAddButton} />}
    >
      <AdminScoreTable
        data={scoreData}
        meta={meta}
        isLoading={isLoading}
        onClickEdit={handleClickEditButton}
        onClickDelete={handleClickDeleteButton}
        onChangeState={setQueryParams}
        onGetAll={getScores}
      />
      <AdminScoreModificationModal
        isOpen={isShowModificationModal}
        scoreData={selectedScore}
        onCreate={createScore}
        onCreated={fetchData}
        onEdit={editScore}
        onEdited={fetchData}
        onClose={handleCloseModal}
      />
      <ConfirmationModal
        title={t("deleteScore")}
        message={t("deleteMessage")}
        isOpen={isShowDeleteModal}
        status="danger"
        onClose={handleCloseModal}
        onConfirm={handleDelete}
      />
    </LayoutContentWrapper>
  );
};
export default memo(AdminScoreManagement);
