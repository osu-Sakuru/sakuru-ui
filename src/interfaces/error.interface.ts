export enum NotificatonTypes {
  SUCCESS = 'success',
  WARN = 'warn',
  ERROR = 'error',
  INFO = 'info',
}

export type Error = {
  message: string;
  label?: string;
  type: NotificatonTypes;
};
