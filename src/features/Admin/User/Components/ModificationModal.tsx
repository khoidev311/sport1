import { AxiosError } from "axios";
import { memo, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Input } from "@components/Form";
import UploadInput from "@components/Form/UploadInput/UploadInput";
import { Modal } from "@components/Modal";
import { ModalProps } from "@components/Modal/interface";
import useToast from "@hooks/useToast";
import { UserDataType, UserFormDataType } from "@interfaces/Common";
import { setFormError } from "@utils/Helpers/errorHelper";

interface AdminUserModificationModalProps extends ModalProps {
  user: UserDataType | null;
  onCreate: (user: UserFormDataType) => Promise<UserFormDataType>;
  onCreated: () => void;
  onEdit: (id: number, user: UserFormDataType) => Promise<UserFormDataType>;
  onEdited: () => void;
}

const DEFAULT_VALUE: UserFormDataType = {
  email: "",
  phone: "",
  password: "",
  fullName: "",
};

const AdminUserModificationModal = ({
  isOpen,
  user,
  onClose,
  onCreate,
  onCreated,
  onEdit,
  onEdited,
  ...props
}: AdminUserModificationModalProps) => {
  const { t } = useTranslation("admin");
  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUnknownError = useCallback(() => {
    toast.error(t("unknown"));
  }, [t, toast]);

  const {
    control,
    reset,
    handleSubmit: useFormSubmit,
    ...methods
  } = useForm<UserFormDataType>({
    // resolver: yupResolver(adminUserModificationFormSchema(t)),
    defaultValues: DEFAULT_VALUE,
  });

  const handleCreateUser = useCallback(
    async (formData: UserFormDataType) => {
      try {
        await onCreate(formData);
        toast.success(t("addUserSuccessfully"));
        onCreated();
        onClose();
      } catch (error) {
        if (error instanceof AxiosError) {
          setFormError(error, methods.setError, null, handleUnknownError);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [handleUnknownError, methods.setError, onClose, onCreate, onCreated, t, toast],
  );

  const handleEditUser = useCallback(
    async (formData: UserFormDataType) => {
      if (!user) return;
      try {
        await onEdit(user.id as number, formData);
        toast.success(t("edit"));
        onEdited();
        onClose();
      } catch (error) {
        if (error instanceof AxiosError) {
          setFormError(error, methods.setError, null, handleUnknownError);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [handleUnknownError, methods.setError, onClose, onEdit, onEdited, t, toast, user],
  );

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);

    if (!user) {
      handleCreateUser(formData);

      return;
    }

    handleEditUser(formData);
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setIsSubmitting(false);

    if (user) {
      reset({ ...user, password: "" });
      return;
    }

    reset(DEFAULT_VALUE);
  }, [isOpen, reset, user]);

  return (
    <Modal
      isLoading={isSubmitting}
      isOpen={isOpen}
      isFormModal
      title={user ? t("editUser") : t("addUser")}
      onClose={onClose}
      onConfirm={handleSubmit}
      {...props}
    >
      <Input className="block" control={control} disabled={isSubmitting} label={t("email")} name="email" />
      <Input
        className="block"
        control={control}
        disabled={isSubmitting}
        label={t("password")}
        name="password"
        type="password"
        autoSave="off"
      />
      <Input className="block" control={control} disabled={isSubmitting} label={t("phone")} name="phone" />
      <Input
        className="block"
        control={control}
        disabled={isSubmitting}
        label={t("fullName")}
        name="fullName"
      />
      <UploadInput
        name="avatar"
        control={control}
        disabled={isSubmitting}
        multiple={false}
        label={t("avatar")}
        placeholder={t("chooseAvatar")}
      />
    </Modal>
  );
};

export default memo(AdminUserModificationModal);
