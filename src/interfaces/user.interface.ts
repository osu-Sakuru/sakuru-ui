export interface User {
  id: number;
  name: string;
  safe_name: string;
  email: string;
  priv: number;
  pw_bcrypt: string;
  country: string;
  silence_end: number;
  donor_end: number;
  creation_time: number;
  latest_activity: number;
  clan_id: number;
  clan_priv: boolean;
  preferred_mode: number;
  play_style: number;
  custom_badge_name: string | null;
  custom_badge_icon: string | null;
  userpage_content: string | null;
}
