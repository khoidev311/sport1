import { AxiosError } from "axios";
import { memo, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Input } from "@components/Form";
import { Modal } from "@components/Modal";
import { ModalProps } from "@components/Modal/interface";
import useToast from "@hooks/useToast";
import { setFormError } from "@utils/Helpers/errorHelper";
import { ConfigDataType, ConfigFormDataType } from "@interfaces/Common";

interface AdminConfigModificationModalProps extends ModalProps {
  configData: ConfigDataType | null;
  onCreate: (config: ConfigFormDataType) => Promise<void>;
  onCreated: () => void;
  onEdit: (id: number, config: ConfigFormDataType) => Promise<void>;
  onEdited: () => void;
}

const DEFAULT_VALUE: ConfigFormDataType = {
  key: "",
  value: "",
};

const AdminConfigModificationModal = ({
  isOpen,
  configData: config,
  onClose,
  onCreate,
  onCreated,
  onEdit,
  onEdited,
  ...props
}: AdminConfigModificationModalProps) => {
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
  } = useForm<ConfigFormDataType>({
    // resolver: yupResolver(adminUserModificationFormSchema(t)),
    defaultValues: DEFAULT_VALUE,
  });

  const handleCreateConfig = useCallback(
    async (formData: ConfigFormDataType) => {
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

  const handleEditConfig = useCallback(
    async (formData: ConfigFormDataType) => {
      if (!config) return;
      try {
        await onEdit(config._id as number, formData);
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
    [handleUnknownError, methods.setError, onClose, onEdit, onEdited, t, toast, config],
  );

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);

    if (!config) {
      handleCreateConfig(formData);

      return;
    }

    handleEditConfig(formData);
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setIsSubmitting(false);

    if (config) {
      reset(config);
      return;
    }

    reset(DEFAULT_VALUE);
  }, [isOpen, reset, config]);

  return (
    <Modal
      isLoading={isSubmitting}
      isOpen={isOpen}
      isFormModal
      title={config ? t("editConfig") : t("addConfig")}
      onClose={onClose}
      onConfirm={handleSubmit}
      {...props}
    >
      <Input className="block w-full" control={control} disabled={isSubmitting} label={t("key")} name="key" />
      <Input
        className="block w-full"
        control={control}
        disabled={isSubmitting}
        label={t("value")}
        name="value"
      />
    </Modal>
  );
};

export default memo(AdminConfigModificationModal);
