import { AxiosError } from "axios";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Input, Select } from "@components/Form";
import { Modal } from "@components/Modal";
import { ModalProps } from "@components/Modal/interface";
import useToast from "@hooks/useToast";
import { setFormError } from "@utils/Helpers/errorHelper";
import { TeamDataType } from "@interfaces/Common/teamType";
import { getTeams } from "@services/App/teamService";
import { LeagueDataType } from "@interfaces/Common/leagueType";
import { getLeagues } from "@services/App/leagueService";
import { RankDataType, RankFormDataType } from "@interfaces/Common/rankType";

interface AdminRankModificationModalProps extends ModalProps {
  rankData: RankDataType | null;
  onCreate: (rank: RankFormDataType) => Promise<void>;
  onCreated: () => void;
  onEdit: (id: number, rank: RankFormDataType) => Promise<void>;
  onEdited: () => void;
}

const DEFAULT_VALUE: RankFormDataType = {
  league: "",
  team: "",
  draw: 0,
  efficiency: 0,
  goal: 0,
  lost: 0,
  point: 0,
  rank: 0,
  total_match: 0,
  win: 0,
};

const AdminRankModificationModal = ({
  isOpen,
  rankData: rank,
  onClose,
  onCreate,
  onCreated,
  onEdit,
  onEdited,
  ...props
}: AdminRankModificationModalProps) => {
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
  } = useForm<RankFormDataType>({
    // resolver: yupResolver(adminModificationFormSchema(t)),
    defaultValues: DEFAULT_VALUE,
  });

  const handleCreateRank = useCallback(
    async (formData: RankFormDataType) => {
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

  const handleEditRank = useCallback(
    async (formData: RankFormDataType) => {
      if (!rank) return;
      try {
        await onEdit(rank._id as number, formData);
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
    [handleUnknownError, methods.setError, onClose, onEdit, onEdited, t, toast, rank],
  );

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);

    if (!rank) {
      handleCreateRank(formData);

      return;
    }

    handleEditRank(formData);
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

    if (rank) {
      reset({
        ...rank,
        team: rank.team._id,
        league: rank.league._id,
      });
      return;
    }

    reset(DEFAULT_VALUE);
  }, [isOpen, reset, rank]);

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
      title={rank ? t("editRank") : t("addRank")}
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
        name="team"
        className="w-full"
        control={control}
        options={teamOption}
        placeholder={t("team")}
      />
      <div className="grid grid-cols-3 gap-x-6">
        <Input
          className="block col-span-1"
          control={control}
          disabled={isSubmitting}
          label={t("win")}
          name="win"
          type="number"
        />
        <Input
          className="block col-span-1"
          control={control}
          disabled={isSubmitting}
          label={t("lost")}
          name="lost"
          type="number"
        />
        <Input
          className="block col-span-1"
          control={control}
          disabled={isSubmitting}
          label={t("draw")}
          name="draw"
          type="number"
        />
      </div>
      <div className="grid grid-cols-3 gap-x-6">
        <Input
          className="block col-span-1"
          control={control}
          disabled={isSubmitting}
          label={t("totalMatch")}
          name="total_match"
          type="number"
        />
        <Input
          className="block col-span-1"
          control={control}
          disabled={isSubmitting}
          label={t("goal")}
          name="goal"
          type="number"
        />
        <Input
          className="block col-span-1"
          control={control}
          disabled={isSubmitting}
          label={t("efficiency")}
          name="efficiency"
          type="number"
        />
      </div>
      <div className="grid grid-cols-2 gap-x-6">
        <Input
          className="block col-span-1"
          control={control}
          disabled={isSubmitting}
          label={t("point")}
          name="point"
          type="number"
        />
        <Input
          className="block col-span-1"
          control={control}
          disabled={isSubmitting}
          label={t("rank")}
          name="rank"
          type="number"
        />
      </div>
    </Modal>
  );
};

export default memo(AdminRankModificationModal);
