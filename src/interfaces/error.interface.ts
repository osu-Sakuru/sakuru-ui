export enum NotificatonTypes {
  WARN = 'warn',
  ERROR = 'error',
  INFO = 'info',
}

export type Error = {
  message: string;
  label: string;
  type: NotificatonTypes;
};
