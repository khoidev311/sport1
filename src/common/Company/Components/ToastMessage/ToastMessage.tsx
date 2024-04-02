import { memo } from "react";

export interface ToastMessageProps {
  message: string;
  description?: string;
}

const ToastMessage = ({ message, description }: ToastMessageProps) => {
  return (
    <div className="ml-3 flex flex-col">
      <div className="font-medium">{message}</div>
      <div className="text-sm font-light">{description}</div>
    </div>
  );
};
export default memo(ToastMessage);
