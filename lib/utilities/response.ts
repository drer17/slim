import { Status, ToastProps } from "../definitions/response";

export const generateToast = (status: Status): ToastProps => ({
  title: status,
  description:
    status === Status.success
      ? "Action was successful"
      : "Action was unsuccessful",
  variant: status === Status.failed ? "destructive" : "default",
});
