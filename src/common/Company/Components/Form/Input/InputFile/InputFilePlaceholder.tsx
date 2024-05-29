import { nanoid } from "nanoid";
import { memo, useCallback } from "react";
import { Trans, useTranslation } from "react-i18next";
import { GrCloudUpload } from "react-icons/gr";

import { InputFileDataType, UncontrolledInputFileProps } from "@components/Form/interface";

const InputFilePlaceholder = ({
  accept,
  multiple,
  onChange,
}: Pick<UncontrolledInputFileProps, "accept" | "multiple" | "onChange">) => {
  const { t } = useTranslation();

  const handleChangeFile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target;

      if (!files) {
        return;
      }

      const inputFiles: InputFileDataType[] = [];

      for (let i = 0; i < files.length; i += 1) {
        const file = files.item(i);

        if (file) {
          inputFiles.push({
            id: nanoid(),
            file,
          });
        }
      }

      onChange(inputFiles);
    },
    [onChange],
  );

  return (
    <div className="group/placeholder relative">
      <div className="relative z-0 flex flex-col items-center justify-center space-y-4 px-4 py-14">
        <GrCloudUpload
          className="thin-stroke text-gray-300 duration-100 group-hover/placeholder:text-gray-400"
          size={80}
        />
        <div className="flex flex-col items-center justify-center space-y-1">
          <div className="text-gray-500">{t("chooseFileOrDropToUpload")}</div>
          <div className="text-sm text-gray-400">
            <Trans
              t={t}
              i18nKey="onlySomeFilesAccepted"
              components={{ span: <span className="font-semibold" /> }}
              values={{ acceptedFiles: accept }}
            />
          </div>
        </div>
      </div>
      <input
        accept={accept}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        multiple={multiple}
        type="file"
        onChange={handleChangeFile}
      />
    </div>
  );
};

export default memo(InputFilePlaceholder);
