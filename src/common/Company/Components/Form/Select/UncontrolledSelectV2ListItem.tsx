import { HTMLAttributes, ReactNode, memo, useMemo } from "react";
import { GroupBase } from "react-select";

interface UncontrolledSelectV2ListItemProps<TOption, TGroup extends GroupBase<TOption>>
  extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  data: TOption | TGroup;
  getOptionAttributes?: (option: TOption) => HTMLAttributes<HTMLElement>;
}

const UncontrolledSelectV2ListItem = <TOption extends unknown, TGroup extends GroupBase<TOption>>({
  children,
  data,
  style,
  getOptionAttributes,
}: UncontrolledSelectV2ListItemProps<TOption, TGroup>) => {
  const htmlAttributes = useMemo(() => getOptionAttributes?.(data as TOption), [data, getOptionAttributes]);

  return (
    <div style={style}>
      <div {...htmlAttributes}>{children}</div>
    </div>
  );
};

export default memo(UncontrolledSelectV2ListItem) as typeof UncontrolledSelectV2ListItem;
