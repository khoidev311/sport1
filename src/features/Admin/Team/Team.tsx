import { Key, memo, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { LayoutContentWrapper } from "@common/Layout";
import { ConfirmationModal } from "@components/Modal";
import { BaseListQueryType, ResponseMetaType } from "@interfaces/Common";
import { createTeam, deleteTeam, editTeam, getTeams } from "@services/App/teamService";
import { TeamDataType } from "@interfaces/Common/teamType";

import AdminTeamTable from "./Components/Table";
import AdminTeamModificationModal from "./Components/ModificationModal";
import AdminTeamHeaderAction from "./Components/HeaderAction";

const AdminTeamManagement = () => {
  const { t } = useTranslation();

  const [teamData, setTeamData] = useState<TeamDataType[]>([]);
  const [meta, setMeta] = useState<ResponseMetaType | null>(null);
  const [queryParams, setQueryParams] = useState<BaseListQueryType | undefined>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isShowModificationModal, setIsShowModificationModal] = useState<boolean>(false);
  const [selectedTeamId, setSelectedTeamId] = useState<Key | null>(null);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);

  const selectedTeam = useMemo(() => {
    return teamData?.find((item) => item._id === selectedTeamId) ?? null;
  }, [selectedTeamId, teamData]);

  const handleClickAddButton = useCallback(() => {
    setIsShowModificationModal(true);
  }, []);

  const handleClickEditButton = useCallback((id?: Key) => {
    setSelectedTeamId(id ?? null);
    setIsShowModificationModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsShowModificationModal(false);
    setIsShowDeleteModal(false);
    setSelectedTeamId(null);
  }, []);

  const handleClickDeleteButton = useCallback((id?: Key) => {
    setSelectedTeamId(id ?? null);
    setIsShowDeleteModal(true);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const { data, meta: metaData } = await getTeams(queryParams);
      setTeamData(data);
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
      await deleteTeam(selectedTeamId as number);
    } finally {
      fetchData();
    }
  }, [selectedTeamId, fetchData]);

  return (
    <LayoutContentWrapper
      title={t("teamManagement")}
      action={<AdminTeamHeaderAction onClickAdd={handleClickAddButton} />}
    >
      <AdminTeamTable
        data={teamData}
        meta={meta}
        isLoading={isLoading}
        onClickEdit={handleClickEditButton}
        onClickDelete={handleClickDeleteButton}
        onChangeState={setQueryParams}
        onGetAll={getTeams}
      />
      <AdminTeamModificationModal
        isOpen={isShowModificationModal}
        teamData={selectedTeam}
        onCreate={createTeam}
        onCreated={fetchData}
        onEdit={editTeam}
        onEdited={fetchData}
        onClose={handleCloseModal}
      />
      <ConfirmationModal
        title={t("deleteTeam")}
        message={t("deleteMessage")}
        isOpen={isShowDeleteModal}
        status="danger"
        onClose={handleCloseModal}
        onConfirm={handleDelete}
      />
    </LayoutContentWrapper>
  );
};
export default memo(AdminTeamManagement);
