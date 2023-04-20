export enum NotificationTypes {
  SUCCESS = 'success',
  WARN = 'warn',
  ERROR = 'error',
  INFO = 'info',
}

export type Error = {
  message: string;
  label?: string;
  type: NotificationTypes;
};
