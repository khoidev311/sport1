import { AxiosError } from "axios";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Input, Select } from "@components/Form";
import { Modal } from "@components/Modal";
import { ModalProps } from "@components/Modal/interface";
import useToast from "@hooks/useToast";
import { setFormError } from "@utils/Helpers/errorHelper";
import UploadInput from "@components/Form/UploadInput/UploadInput";
import { TeamDataType, TeamFormDataType } from "@interfaces/Common/teamType";
import { LeagueDataType } from "@interfaces/Common/leagueType";
import { getLeagues } from "@services/App/leagueService";

interface AdminTeamModificationModalProps extends ModalProps {
  teamData: TeamDataType | null;
  onCreate: (team: TeamFormDataType) => Promise<void>;
  onCreated: () => void;
  onEdit: (id: number, team: TeamFormDataType) => Promise<void>;
  onEdited: () => void;
}

const DEFAULT_VALUE: TeamFormDataType = {
  name: "",
  logo: "",
  league: "",
};

const AdminTeamModificationModal = ({
  isOpen,
  teamData: team,
  onClose,
  onCreate,
  onCreated,
  onEdit,
  onEdited,
  ...props
}: AdminTeamModificationModalProps) => {
  const { t } = useTranslation();
  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leagueData, setLeagueData] = useState<LeagueDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleUnknownError = useCallback(() => {
    toast.error(t("unknown"));
  }, [t, toast]);

  const {
    control,
    reset,
    handleSubmit: useFormSubmit,
    ...methods
  } = useForm<TeamFormDataType>({
    // resolver: yupResolver(adminModificationFormSchema(t)),
    defaultValues: DEFAULT_VALUE,
  });

  const handleCreateTeam = useCallback(
    async (formData: TeamFormDataType) => {
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

  const handleEditTeam = useCallback(
    async (formData: TeamFormDataType) => {
      if (!team) return;
      try {
        await onEdit(team._id as number, formData);
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
    [handleUnknownError, methods.setError, onClose, onEdit, onEdited, t, toast, team],
  );

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);

    if (!team) {
      handleCreateTeam(formData);

      return;
    }

    handleEditTeam(formData);
  });

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await getLeagues();
      setLeagueData(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setIsSubmitting(false);

    if (team) {
      reset({
        ...team,
        league: String(team.league._id),
      });
      return;
    }

    reset(DEFAULT_VALUE);
  }, [isOpen, reset, team]);

  useEffect(() => {
    if (!isOpen) return;
    fetchData();
  }, [fetchData, isOpen]);

  const leagueOption = useMemo(
    () => leagueData?.map((item) => ({ value: item._id, label: item.name })),
    [leagueData],
  );

  return (
    <Modal
      isLoading={isSubmitting}
      isOpen={isOpen}
      isFormModal
      title={team ? t("editTeam") : t("addTeam")}
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
      <Select
        isDisabled={isLoading}
        name="league"
        className="w-full"
        control={control}
        options={leagueOption}
        placeholder={t("league")}
      />
    </Modal>
  );
};

export default memo(AdminTeamModificationModal);
