import { get, omit } from "lodash";
import { ForwardedRef, forwardRef, memo, useCallback } from "react";
import { useController } from "react-hook-form";
import { ActionMeta, GroupBase, SelectInstance } from "react-select";

import { SelectV2Props } from "../interface";
import UncontrolledSelectV2 from "./UncontrolledSelectV2";

const SelectV2 = <TOption, TIsMulti extends boolean, TGroup extends GroupBase<TOption>>(
  { control, name, ...props }: SelectV2Props<TOption, TIsMulti, TGroup>,
  ref: ForwardedRef<SelectInstance<TOption, TIsMulti, TGroup>>,
) => {
  if (!control?.register) {
    return <UncontrolledSelectV2 name={name} ref={ref} {...props} />;
  }

  const {
    field: { value = null, onChange, onBlur },
    formState: { errors },
  } = useController({
    name,
    control,
  });

  const handleChange = useCallback(
    (newValue: unknown, actionMeta: ActionMeta<unknown>) => {
      onChange(get(newValue, "value", newValue), actionMeta);
    },
    [onChange],
  );

  return (
    <UncontrolledSelectV2
      name={name}
      defaultValue={get(value, "value", value)}
      error={errors[name]?.message as string}
      ref={ref}
      onChange={handleChange}
      onBlur={onBlur}
      {...omit(props, ["value", "onChange", "onBlur"])}
    />
  );
};

export default memo(forwardRef(SelectV2)) as typeof SelectV2;
