import { Key, memo } from "react";

import { UncontrolledInputFileProps } from "@components/Form/interface";

import InputFileListItem from "./InputFileListItem";

interface InputFileListProps extends Pick<UncontrolledInputFileProps, "files"> {
  onRemove: (id: Key) => void;
}

const InputFileList = ({ files, onRemove }: InputFileListProps) => {
  return (
    <div className="px-4">
      {files.map((file) => (
        <InputFileListItem key={file.id} file={file} onRemove={onRemove} />
      ))}
    </div>
  );
};

export default memo(InputFileList);
