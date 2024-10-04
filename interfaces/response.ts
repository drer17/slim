export enum Status {
  failed = "Failed",
  success = "Success",
}

export interface ToastProps {
  title: Status;
  description: string;
  variant?: "defualt" | "destructive";
}

export const generateToast = (status: Status) => ({
  title: status,
  description:
    status === Status.success
      ? "Action was successful"
      : "Action was unsuccessful",
  variant: status === Status.failed ? "destructive" : "defualt",
});
