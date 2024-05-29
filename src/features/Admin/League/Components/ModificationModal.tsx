import { AxiosError } from "axios";
import { memo, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Input } from "@components/Form";
import { Modal } from "@components/Modal";
import { ModalProps } from "@components/Modal/interface";
import useToast from "@hooks/useToast";
import { setFormError } from "@utils/Helpers/errorHelper";
import { LeagueDataType, LeagueFormDataType } from "@interfaces/Common/leagueType";
import UploadInput from "@components/Form/UploadInput/UploadInput";

interface AdminLeagueModificationModalProps extends ModalProps {
  leagueData: LeagueDataType | null;
  onCreate: (league: LeagueFormDataType) => Promise<void>;
  onCreated: () => void;
  onEdit: (id: number, league: LeagueFormDataType) => Promise<void>;
  onEdited: () => void;
}

const DEFAULT_VALUE: LeagueFormDataType = {
  name: "",
  logo: "",
};

const AdminLeagueModificationModal = ({
  isOpen,
  leagueData: league,
  onClose,
  onCreate,
  onCreated,
  onEdit,
  onEdited,
  ...props
}: AdminLeagueModificationModalProps) => {
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
  } = useForm<LeagueFormDataType>({
    // resolver: yupResolver(adminModificationFormSchema(t)),
    defaultValues: DEFAULT_VALUE,
  });

  const handleCreateLeague = useCallback(
    async (formData: LeagueFormDataType) => {
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

  const handleEditLeague = useCallback(
    async (formData: LeagueFormDataType) => {
      if (!league) return;
      try {
        await onEdit(league._id as number, formData);
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
    [handleUnknownError, methods.setError, onClose, onEdit, onEdited, t, toast, league],
  );

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);

    if (!league) {
      handleCreateLeague(formData);

      return;
    }

    handleEditLeague(formData);
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setIsSubmitting(false);

    if (league) {
      reset(league);
      return;
    }

    reset(DEFAULT_VALUE);
  }, [isOpen, reset, league]);

  return (
    <Modal
      isLoading={isSubmitting}
      isOpen={isOpen}
      isFormModal
      title={league ? t("editLeague") : t("addLeague")}
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
      <UploadInput
        name="logo"
        control={control}
        disabled={isSubmitting}
        multiple={false}
        label={t("logo")}
        placeholder={t("chooseLogo")}
        inputString
      />
    </Modal>
  );
};

export default memo(AdminLeagueModificationModal);
