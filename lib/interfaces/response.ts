export enum Status {
  failed = "Failed",
  success = "Success",
}

export interface ToastProps {
  title: Status;
  description: string;
  variant?: "defualt" | "destructive";
}
