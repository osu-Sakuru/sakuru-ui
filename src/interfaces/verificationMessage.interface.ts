export interface VerificationMessage {
  status: 'penidng' | 'failed' | 'success';
  user: number;
}
