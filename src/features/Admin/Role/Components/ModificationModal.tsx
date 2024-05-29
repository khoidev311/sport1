import { AxiosError } from "axios";
import { memo, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Input } from "@components/Form";
import { Modal } from "@components/Modal";
import { ModalProps } from "@components/Modal/interface";
import useToast from "@hooks/useToast";
import { setFormError } from "@utils/Helpers/errorHelper";
import { UserRoleDataType, UserRoleFormDataType } from "@interfaces/Common";
import { UserRoleEnum } from "@enums/userEnum";

interface AdminRoleModificationModalProps extends ModalProps {
  roleData: UserRoleDataType | null;
  onCreate: (role: UserRoleFormDataType) => Promise<void>;
  onCreated: () => void;
  onEdit: (id: number, role: UserRoleFormDataType) => Promise<void>;
  onEdited: () => void;
}

const DEFAULT_VALUE: UserRoleFormDataType = {
  name: UserRoleEnum.ADMIN,
  slug: "",
};

const AdminRoleModificationModal = ({
  isOpen,
  roleData: role,
  onClose,
  onCreate,
  onCreated,
  onEdit,
  onEdited,
  ...props
}: AdminRoleModificationModalProps) => {
  const { t } = useTranslation();
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
  } = useForm<UserRoleFormDataType>({
    // resolver: yupResolver(adminUserModificationFormSchema(t)),
    defaultValues: DEFAULT_VALUE,
  });

  const handleCreateRole = useCallback(
    async (formData: UserRoleFormDataType) => {
      try {
        await onCreate(formData);
        toast.success(t("addSuccessfully"));
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

  const handleEditRole = useCallback(
    async (formData: UserRoleFormDataType) => {
      if (!role) return;
      try {
        await onEdit(role._id as number, formData);
        toast.success(t("editSuccessfully"));
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
    [handleUnknownError, methods.setError, onClose, onEdit, onEdited, t, toast, role],
  );

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);

    if (!role) {
      handleCreateRole(formData);

      return;
    }

    handleEditRole(formData);
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setIsSubmitting(false);

    if (role) {
      reset(role);
      return;
    }

    reset(DEFAULT_VALUE);
  }, [isOpen, reset, role]);

  return (
    <Modal
      isLoading={isSubmitting}
      isOpen={isOpen}
      isFormModal
      title={role ? t("editRole") : t("addRole")}
      onClose={onClose}
      onConfirm={handleSubmit}
      {...props}
    >
      <Input
        className="block w-full"
        control={control}
        disabled={isSubmitting}
        label={t("name")}
        name="name"
      />
      <Input
        className="block w-full"
        control={control}
        disabled={isSubmitting}
        label={t("slug")}
        name="slug"
      />
    </Modal>
  );
};

export default memo(AdminRoleModificationModal);
