import { omit } from "lodash";
import { memo } from "react";
import { Control, useController } from "react-hook-form";

import UncontrolledUploadInput, { UncontrolledUploadInputProps } from "./UncontrolledUploadInput";
import Input from "../Input/Input";

export interface UploadInputProps extends UncontrolledUploadInputProps {
  name: string;
  control?: Control<any, any>;
  rules?: Record<string, any>;
  inputString?: boolean;
}

const UploadInput = ({ name, control, rules, multiple, inputString = false, ...props }: UploadInputProps) => {
  if (!control || !control.register) {
    return <UncontrolledUploadInput name={name} multiple={multiple} {...props} />;
  }

  const {
    field: { value = null, onChange, onBlur },
    formState: { errors },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <>
      <UncontrolledUploadInput
        value={value ?? null}
        error={errors[name]?.message as string}
        multiple={multiple}
        onChange={onChange}
        onBlur={onBlur}
        {...omit(props, ["value", "onChange", "onBlur"])}
      />
      {inputString && (
        <Input
          className="block w-full"
          control={control}
          disabled={props.disabled}
          label={props.label}
          name={name}
        />
      )}
    </>
  );
};

export default memo(UploadInput);
