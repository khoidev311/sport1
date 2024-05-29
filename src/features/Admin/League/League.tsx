import { Key, memo, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { LayoutContentWrapper } from "@common/Layout";
import { ConfirmationModal } from "@components/Modal";
import { BaseListQueryType, ResponseMetaType } from "@interfaces/Common";
import { LeagueDataType } from "@interfaces/Common/leagueType";
import { createLeague, deleteLeague, editLeague, getLeagues } from "@services/App/leagueService";

import AdminLeagueTable from "./Components/Table";
import AdminLeagueModificationModal from "./Components/ModificationModal";
import AdminLeagueHeaderAction from "./Components/HeaderAction";

const AdminLeagueManagement = () => {
  const { t } = useTranslation();

  const [leagueData, setLeagueData] = useState<LeagueDataType[]>([]);
  const [meta, setMeta] = useState<ResponseMetaType | null>(null);
  const [queryParams, setQueryParams] = useState<BaseListQueryType | undefined>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isShowModificationModal, setIsShowModificationModal] = useState<boolean>(false);
  const [selectedLeagueId, setSelectedLeagueId] = useState<Key | null>(null);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);

  const selectedLeague = useMemo(() => {
    return leagueData?.find((item) => item._id === selectedLeagueId) ?? null;
  }, [selectedLeagueId, leagueData]);

  const handleClickAddButton = useCallback(() => {
    setIsShowModificationModal(true);
  }, []);

  const handleClickEditButton = useCallback((id?: Key) => {
    setSelectedLeagueId(id ?? null);
    setIsShowModificationModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsShowModificationModal(false);
    setIsShowDeleteModal(false);
    setSelectedLeagueId(null);
  }, []);

  const handleClickDeleteButton = useCallback((id?: Key) => {
    setSelectedLeagueId(id ?? null);
    setIsShowDeleteModal(true);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const { data, meta: metaData } = await getLeagues(queryParams);
      setLeagueData(data);
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
      await deleteLeague(selectedLeagueId as number);
    } finally {
      fetchData();
    }
  }, [selectedLeagueId, fetchData]);

  return (
    <LayoutContentWrapper
      title={t("leagueManagement")}
      action={<AdminLeagueHeaderAction onClickAdd={handleClickAddButton} />}
    >
      <AdminLeagueTable
        data={leagueData}
        meta={meta}
        isLoading={isLoading}
        onClickEdit={handleClickEditButton}
        onClickDelete={handleClickDeleteButton}
        onChangeState={setQueryParams}
        onGetAll={getLeagues}
      />
      <AdminLeagueModificationModal
        isOpen={isShowModificationModal}
        leagueData={selectedLeague}
        onCreate={createLeague}
        onCreated={fetchData}
        onEdit={editLeague}
        onEdited={fetchData}
        onClose={handleCloseModal}
      />
      <ConfirmationModal
        title={t("deleteLeague")}
        message={t("deleteMessage")}
        isOpen={isShowDeleteModal}
        status="danger"
        onClose={handleCloseModal}
        onConfirm={handleDelete}
      />
    </LayoutContentWrapper>
  );
};
export default memo(AdminLeagueManagement);
