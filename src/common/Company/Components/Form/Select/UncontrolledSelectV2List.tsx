import { HTMLAttributes, memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { GroupBase, MenuListProps } from "react-select";
import { FixedSizeList as List } from "react-window";

import { getTwThemeConfig } from "@utils/Helpers/commonHelper";

import UncontrolledSelectV2ListItem from "./UncontrolledSelectV2ListItem";

interface UncontrolledSelectV2ListProps<
  TOption,
  TIsMulti extends boolean,
  GroupType extends GroupBase<TOption>,
> extends MenuListProps<TOption, TIsMulti, GroupType> {
  getOptionAttributes?: (option: TOption) => HTMLAttributes<HTMLElement>;
}

const UncontrolledSelectV2List = <TOption, TIsMulti extends boolean, TGroup extends GroupBase<TOption>>({
  children,
  options,
  getOptionAttributes,
  getValue,
}: UncontrolledSelectV2ListProps<TOption, TIsMulti, TGroup>) => {
  const { t } = useTranslation();

  const height = useMemo(() => getTwThemeConfig("height.10"), []);
  const [value] = getValue();
  const initialOffset = useMemo(() => options.indexOf(value) * height, [options, value, height]);

  if (!children || typeof children !== "object" || !Array.isArray(children)) {
    return <div className="flex h-10 w-full items-center justify-center text-gray-400">{t("empty")}</div>;
  }

  return (
    <List
      height={height * 5}
      width="100%"
      itemCount={children.length}
      itemSize={height}
      initialScrollOffset={initialOffset}
    >
      {({ index, style }) => (
        <UncontrolledSelectV2ListItem
          data={options[index]}
          style={style}
          getOptionAttributes={getOptionAttributes}
        >
          {children[index]}
        </UncontrolledSelectV2ListItem>
      )}
    </List>
  );
};

export default memo(UncontrolledSelectV2List) as typeof UncontrolledSelectV2List;
