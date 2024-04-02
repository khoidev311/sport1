import { ReactNode, memo } from "react";
import { CalendarContainer } from "react-datepicker";

export interface DatePickerContainerProps {
  children: ReactNode;
}

const DatePickerContainer = ({ children }: DatePickerContainerProps) => {
  return (
    <CalendarContainer className="relative flex border-l-2 border-gray-100 bg-white px-4">
      {children}
    </CalendarContainer>
  );
};

export default memo(DatePickerContainer);
