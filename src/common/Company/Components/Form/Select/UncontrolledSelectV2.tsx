import { ForwardedRef, forwardRef, memo, useMemo } from "react";
import { ClassNamesConfig, GroupBase, SelectInstance } from "react-select";
import AsyncSelect from "react-select/async";
import { twMerge } from "tailwind-merge";

import { UncontrolledSelectV2Props } from "../interface";
import UncontrolledSelectV2List from "./UncontrolledSelectV2List";

const UncontrolledSelectV2 = <TOption, TIsMulti extends boolean, TGroup extends GroupBase<TOption>>(
  {
    defaultValue: defaultValueProp,
    size = "normal",
    name,
    label,
    value,
    getDynamicOptionLabelAttributes,
    ...props
  }: UncontrolledSelectV2Props<TOption, TIsMulti, TGroup>,
  ref: ForwardedRef<SelectInstance<TOption, TIsMulti, TGroup>>,
) => {
  const classNames = useMemo<ClassNamesConfig<TOption, TIsMulti, TGroup>>(
    () => ({
      control: (state) =>
        twMerge(
          "pl-0.75 !border-gray-100 !border-2 !shadow-none",
          size === "sm" && "h-10",
          state.isFocused && "!border-blue-500",
        ),
      input: () => twMerge("!-translate-y-px"),
      valueContainer: () => twMerge("border-red-500 !overflow-visible px-20"),
      singleValue: () => twMerge("-translate-y-px"),
      placeholder: () => "hidden",
    }),
    [size],
  );
  const defaultValue = useMemo(() => {
    if (!defaultValueProp) {
      return null;
    }

    if (typeof defaultValueProp === "string") {
      return { value: defaultValueProp };
    }

    return defaultValueProp;
  }, [defaultValueProp]);

  return (
    <label className="group relative" htmlFor={name}>
      <AsyncSelect
        classNames={classNames}
        components={{
          MenuList: (menuListProps) => (
            <UncontrolledSelectV2List
              getOptionAttributes={getDynamicOptionLabelAttributes}
              {...menuListProps}
            />
          ),
        }}
        defaultValue={defaultValue as unknown as TOption}
        id={name}
        ref={ref}
        value={value}
        {...props}
      />
      <div
        className={twMerge(
          "absolute left-1.25 top-1/2 w-fit -translate-y-1/2 bg-white px-2 text-gray-500 duration-75 group-focus-within:-translate-y-8.2 group-focus-within:text-sm group-focus-within:font-semibold group-focus-within:text-blue-500",
          (!!value || !!defaultValue) && "-translate-y-8.2 text-sm font-semibold text-blue-500",
        )}
      >
        {label}
      </div>
    </label>
  );
};

export default memo(forwardRef(UncontrolledSelectV2)) as typeof UncontrolledSelectV2;
