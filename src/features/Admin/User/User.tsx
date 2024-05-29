import { Key, memo, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { LayoutContentWrapper } from "@common/Layout";
import { ConfirmationModal } from "@components/Modal";
import { BaseListQueryType, ResponseMetaType, UserDataType } from "@interfaces/Common";
import { adminUserService } from "@services/index";
import { createUser, deleteUser, editUser, getUsers } from "@services/App/userService";

import AdminUserHeaderAction from "./Components/HeaderAction";
import AdminUserModificationModal from "./Components/ModificationModal";
import AdminUserTable from "./Components/Table";

const AdminUserManagement = () => {
  const { t } = useTranslation();

  const [userData, setUserData] = useState<UserDataType[]>([]);
  const [meta, setMeta] = useState<ResponseMetaType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowModificationModal, setIsShowModificationModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<Key | null>(null);
  const [queryParams, setQueryParams] = useState<BaseListQueryType | undefined>({});

  const selectedUser = useMemo(() => {
    return userData?.find((item) => item._id === selectedUserId) ?? null;
  }, [selectedUserId, userData]);

  const handleClickAddButton = useCallback(() => {
    setIsShowModificationModal(true);
  }, []);

  const handleClickEditButton = useCallback((id?: Key) => {
    setSelectedUserId(id ?? null);
    setIsShowModificationModal(true);
  }, []);

  const handleClickDeleteButton = useCallback((id?: Key) => {
    setSelectedUserId(id ?? null);
    setIsShowDeleteModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsShowModificationModal(false);
    setIsShowDeleteModal(false);
    setSelectedUserId(null);
  }, []);

  const fetchData = useCallback(async () => {
    if (!queryParams) return;
    setIsLoading(true);
    try {
      const { data, meta: metaData } = await getUsers(queryParams);
      setUserData(data);
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
      await deleteUser(selectedUserId as number);
    } finally {
      fetchData();
    }
  }, [selectedUserId, fetchData]);

  return (
    <LayoutContentWrapper
      title={t("userManagement")}
      action={<AdminUserHeaderAction onClickAdd={handleClickAddButton} />}
    >
      <AdminUserTable
        data={userData}
        meta={meta}
        isLoading={isLoading}
        onGetAll={adminUserService.getUsers}
        onClickEdit={handleClickEditButton}
        onClickDelete={handleClickDeleteButton}
        onChangeState={setQueryParams}
      />
      <ConfirmationModal
        title={t("deleteUser", { name: selectedUser?.fullname })}
        message={t("deleteMessage")}
        isOpen={isShowDeleteModal}
        status="danger"
        onClose={handleCloseModal}
        onConfirm={handleDelete}
      />
      <AdminUserModificationModal
        isOpen={isShowModificationModal}
        user={selectedUser}
        onCreate={createUser}
        onCreated={fetchData}
        onEdit={editUser}
        onEdited={fetchData}
        onClose={handleCloseModal}
      />
    </LayoutContentWrapper>
  );
};

export default memo(AdminUserManagement);
