import { Key, memo, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { LayoutContentWrapper } from "@common/Layout";
import { ConfirmationModal } from "@components/Modal";
import { UserDataType } from "@interfaces/Common";
import { adminUserService } from "@services/index";

import AdminUserHeaderAction from "./Components/HeaderAction";
import AdminUserModificationModal from "./Components/ModificationModal";
import AdminUserTable from "./Components/Table";

const AdminUserManagement = () => {
  const { t } = useTranslation("admin");

  const [userData, setUserData] = useState<UserDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowModificationModal, setIsShowModificationModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<Key | null>(null);

  const selectedUser = useMemo(() => {
    return userData.find((item) => item.id === selectedUserId) ?? null;
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
    adminUserService
      .getUsers()
      .then((response) => {
        setUserData(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <LayoutContentWrapper
      title={t("userManagement")}
      action={<AdminUserHeaderAction onClickAdd={handleClickAddButton} />}
    >
      <AdminUserTable
        data={userData}
        isLoading={isLoading}
        onGetAll={adminUserService.getUsers}
        onClickEdit={handleClickEditButton}
        onClickDelete={handleClickDeleteButton}
      />
      <ConfirmationModal
        title={t("deleteUser", { name: selectedUser?.fullName })}
        message='Người dùng "Nguyễn Văn A" sẽ bị xoá khỏi hệ thống. Thao tác này không thể hoàn tác.'
        isOpen={isShowDeleteModal}
        status="danger"
        onClose={() => setIsShowDeleteModal(false)}
        onConfirm={() => setIsShowDeleteModal(true)}
      />
      <AdminUserModificationModal
        isOpen={isShowModificationModal}
        user={selectedUser}
        onCreate={adminUserService.createUser}
        onCreated={fetchData}
        onEdit={adminUserService.updateUserById}
        onEdited={fetchData}
        onClose={handleCloseModal}
      />
    </LayoutContentWrapper>
  );
};

export default memo(AdminUserManagement);
