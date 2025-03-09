export enum Status {
  failed = "Failed",
  success = "Success",
}

export interface ToastProps {
  title: Status;
  description: string;
  variant?: "default" | "destructive";
  data?: any;
}

// used to instantiate models
// follows format [table name, ...options, id]
export type Slug = (string | undefined)[];
