import { memo, useMemo } from "react";
import { Helmet } from "react-helmet-async";

import { ConfigKeyEnum } from "@enums/configEnum";
import { useConfig } from "@hooks/index";

import { BASE_MANIFEST } from "./constant";

const Head = () => {
  const config = useConfig();
  const faviconConfig = useMemo(() => config(ConfigKeyEnum.LOGO_ICON), [config]);
  const appName = useMemo(() => config(ConfigKeyEnum.APP_NAME), [config]);

  const manifest = useMemo(() => {
    const baseManifest = BASE_MANIFEST;

    if (!baseManifest || !faviconConfig || !appName) return null;

    baseManifest.name = appName;
    baseManifest.icons = baseManifest.icons.map((icon) => ({
      ...icon,
      src: faviconConfig,
    }));

    return JSON.stringify(baseManifest);
  }, [appName, faviconConfig]);

  return (
    <Helmet>
      <link rel="icon" href={faviconConfig} />
      <link rel="apple-touch-icon" href={faviconConfig} />
      {manifest && <link rel="manifest" href={`data:application/manifest+json,${manifest}`} />}
    </Helmet>
  );
};

export default memo(Head);
