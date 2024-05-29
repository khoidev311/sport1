import { AxiosError } from "axios";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Input, Select } from "@components/Form";
import { Modal } from "@components/Modal";
import { ModalProps } from "@components/Modal/interface";
import useToast from "@hooks/useToast";
import { setFormError } from "@utils/Helpers/errorHelper";
import { ScoreDataType, ScoreFormDataType } from "@interfaces/Common/scoreType";
import { TeamDataType } from "@interfaces/Common/teamType";
import { getTeams } from "@services/App/teamService";
import { LeagueDataType } from "@interfaces/Common/leagueType";
import { getLeagues } from "@services/App/leagueService";

interface AdminScoreModificationModalProps extends ModalProps {
  scoreData: ScoreDataType | null;
  onCreate: (score: ScoreFormDataType) => Promise<void>;
  onCreated: () => void;
  onEdit: (id: number, score: ScoreFormDataType) => Promise<void>;
  onEdited: () => void;
}

const DEFAULT_VALUE: ScoreFormDataType = {
  host_team: "",
  guest_team: "",
  score: "",
  league: "",
};

const AdminScoreModificationModal = ({
  isOpen,
  scoreData: score,
  onClose,
  onCreate,
  onCreated,
  onEdit,
  onEdited,
  ...props
}: AdminScoreModificationModalProps) => {
  const { t } = useTranslation();
  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teamData, setTeamData] = useState<TeamDataType[]>([]);
  const [leagueData, setLeagueData] = useState<LeagueDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingLeague, setIsLoadingLeague] = useState(true);

  const handleUnknownError = useCallback(() => {
    toast.error(t("unknown"));
  }, [t, toast]);

  const {
    control,
    reset,
    handleSubmit: useFormSubmit,
    ...methods
  } = useForm<ScoreFormDataType>({
    // resolver: yupResolver(adminModificationFormSchema(t)),
    defaultValues: DEFAULT_VALUE,
  });

  const handleCreateScore = useCallback(
    async (formData: ScoreFormDataType) => {
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

  const handleEditScore = useCallback(
    async (formData: ScoreFormDataType) => {
      if (!score) return;
      try {
        await onEdit(score._id as number, formData);
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
    [handleUnknownError, methods.setError, onClose, onEdit, onEdited, t, toast, score],
  );

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);

    if (!score) {
      handleCreateScore(formData);

      return;
    }

    handleEditScore(formData);
  });

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await getTeams();
      setTeamData(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchDataLeague = useCallback(async () => {
    setIsLoadingLeague(true);
    try {
      const { data } = await getLeagues();
      setLeagueData(data);
    } finally {
      setIsLoadingLeague(false);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setIsSubmitting(false);

    if (score) {
      reset({
        ...score,
        host_team: score.host_team._id,
        guest_team: score.guest_team._id,
        league: score.league._id,
      });
      return;
    }

    reset(DEFAULT_VALUE);
  }, [isOpen, reset, score]);

  useEffect(() => {
    if (!isOpen) return;
    fetchData();
  }, [fetchData, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    fetchDataLeague();
  }, [fetchDataLeague, isOpen]);

  const teamOption = useMemo(
    () => teamData?.map((item) => ({ value: item._id, label: item.name })),
    [teamData],
  );

  const leagueOption = useMemo(
    () => leagueData?.map((item) => ({ value: item._id, label: item.name })),
    [leagueData],
  );

  return (
    <Modal
      isLoading={isSubmitting}
      isOpen={isOpen}
      isFormModal
      title={score ? t("editScore") : t("addScore")}
      onClose={onClose}
      onConfirm={handleSubmit}
      {...props}
    >
      <Select
        isDisabled={isLoadingLeague}
        name="league"
        className="w-full"
        control={control}
        options={leagueOption}
        placeholder={t("league")}
      />
      <Select
        isDisabled={isLoading}
        name="host_team"
        className="w-full"
        control={control}
        options={teamOption}
        placeholder={t("hostTeam")}
      />
      <Select
        isDisabled={isLoading}
        name="guest_team"
        className="w-full"
        control={control}
        options={teamOption}
        placeholder={t("guestTeam")}
      />
      <Input
        className="block w-full"
        control={control}
        disabled={isSubmitting}
        label={t("score")}
        name="score"
      />
    </Modal>
  );
};

export default memo(AdminScoreModificationModal);
