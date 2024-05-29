import { useTranslation } from "react-i18next";
import { memo, useCallback, useEffect, useState } from "react";

import useDocumentTitle from "@hooks/useDocumentTitle";
import useWatchParam from "@hooks/useWatchParam";
import { ScoreDataType } from "@interfaces/Common/scoreType";
import { TableContentBodyEmptyItem } from "@components/Table";
import { getScoreById } from "@services/App/scoreService";

import MatchHeader from "./Components/MatchHeader";

const Match = () => {
  const { t } = useTranslation();
  useDocumentTitle(t("match"));
  const [fromMatchId] = useWatchParam("from_match");
  const [score, setScores] = useState<ScoreDataType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!fromMatchId) return;
    setIsLoading(true);
    try {
      const data = await getScoreById(String(fromMatchId));
      setScores(data);
    } finally {
      setIsLoading(false);
    }
  }, [fromMatchId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="h-fit w-full bg-gray-50">
      <div className="w-full h-fit flex justify-center pt-8 pb-4">
        <MatchHeader score={score} isLoading={isLoading} />
      </div>
      <div className="w-full h-fit flex justify-center pb-8">
        <div className="w-150 h-96 bg-white rounded-lg border">
          <TableContentBodyEmptyItem className="h-96" />
        </div>
      </div>
    </div>
  );
};

export default memo(Match);
