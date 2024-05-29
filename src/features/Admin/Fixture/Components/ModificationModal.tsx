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
import { FixtureDataType, FixtureFormDataType } from "@interfaces/Common/fixrureType";

interface AdminFixtureModificationModalProps extends ModalProps {
  fixtureData: FixtureDataType | null;
  onCreate: (fixture: FixtureFormDataType) => Promise<void>;
  onCreated: () => void;
  onEdit: (id: number, fixture: FixtureFormDataType) => Promise<void>;
  onEdited: () => void;
}

const DEFAULT_VALUE: FixtureFormDataType = {
  host_team: "",
  guest_team: "",
  start_time: "",
  league: "",
};

const AdminFixtureModificationModal = ({
  isOpen,
  fixtureData: fixture,
  onClose,
  onCreate,
  onCreated,
  onEdit,
  onEdited,
  ...props
}: AdminFixtureModificationModalProps) => {
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
  } = useForm<FixtureFormDataType>({
    // resolver: yupResolver(adminModificationFormSchema(t)),
    defaultValues: DEFAULT_VALUE,
  });

  const handleCreateFixture = useCallback(
    async (formData: FixtureFormDataType) => {
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

  const handleEditFixture = useCallback(
    async (formData: FixtureFormDataType) => {
      if (!fixture) return;
      try {
        await onEdit(fixture._id as number, formData);
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
    [handleUnknownError, methods.setError, onClose, onEdit, onEdited, t, toast, fixture],
  );

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);

    if (!fixture) {
      handleCreateFixture(formData);

      return;
    }

    handleEditFixture(formData);
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

    if (fixture) {
      reset({
        ...fixture,
        host_team: fixture.host_team._id,
        guest_team: fixture.guest_team._id,
        league: fixture.league._id,
      });
      return;
    }

    reset(DEFAULT_VALUE);
  }, [isOpen, reset, fixture]);

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
      title={fixture ? t("editFixture") : t("addFixture")}
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
        label={t("startTime")}
        name="start_time"
        type="date"
      />
    </Modal>
  );
};

export default memo(AdminFixtureModificationModal);
