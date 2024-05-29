import { Key, memo, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { LayoutContentWrapper } from "@common/Layout";
import { ConfirmationModal } from "@components/Modal";
import { BaseListQueryType, ResponseMetaType } from "@interfaces/Common";
import { createFixture, deleteFixture, editFixture, getFixtures } from "@services/App/fixtureService";
import { FixtureDataType } from "@interfaces/Common/fixrureType";

import AdminFixtureTable from "./Components/Table";
import AdminFixtureModificationModal from "./Components/ModificationModal";
import AdminFixtureHeaderAction from "./Components/HeaderAction";

const AdminFixtureManagement = () => {
  const { t } = useTranslation();

  const [fixtureData, setFixtureData] = useState<FixtureDataType[]>([]);
  const [meta, setMeta] = useState<ResponseMetaType | null>(null);
  const [queryParams, setQueryParams] = useState<BaseListQueryType | undefined>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isShowModificationModal, setIsShowModificationModal] = useState<boolean>(false);
  const [selectedFixtureId, setSelectedFixtureId] = useState<Key | null>(null);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);

  const selectedFixture = useMemo(() => {
    return fixtureData?.find((item) => item._id === selectedFixtureId) ?? null;
  }, [selectedFixtureId, fixtureData]);

  const handleClickAddButton = useCallback(() => {
    setIsShowModificationModal(true);
  }, []);

  const handleClickEditButton = useCallback((id?: Key) => {
    setSelectedFixtureId(id ?? null);
    setIsShowModificationModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsShowModificationModal(false);
    setIsShowDeleteModal(false);
    setSelectedFixtureId(null);
  }, []);

  const handleClickDeleteButton = useCallback((id?: Key) => {
    setSelectedFixtureId(id ?? null);
    setIsShowDeleteModal(true);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const { data, meta: metaData } = await getFixtures(queryParams);
      setFixtureData(data);
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
      await deleteFixture(selectedFixtureId as number);
    } finally {
      fetchData();
    }
  }, [selectedFixtureId, fetchData]);

  return (
    <LayoutContentWrapper
      title={t("fixtureManagement")}
      action={<AdminFixtureHeaderAction onClickAdd={handleClickAddButton} />}
    >
      <AdminFixtureTable
        data={fixtureData}
        meta={meta}
        isLoading={isLoading}
        onClickEdit={handleClickEditButton}
        onClickDelete={handleClickDeleteButton}
        onChangeState={setQueryParams}
        onGetAll={getFixtures}
      />
      <AdminFixtureModificationModal
        isOpen={isShowModificationModal}
        fixtureData={selectedFixture}
        onCreate={createFixture}
        onCreated={fetchData}
        onEdit={editFixture}
        onEdited={fetchData}
        onClose={handleCloseModal}
      />
      <ConfirmationModal
        title={t("deleteFixture")}
        message={t("deleteMessage")}
        isOpen={isShowDeleteModal}
        status="danger"
        onClose={handleCloseModal}
        onConfirm={handleDelete}
      />
    </LayoutContentWrapper>
  );
};
export default memo(AdminFixtureManagement);
