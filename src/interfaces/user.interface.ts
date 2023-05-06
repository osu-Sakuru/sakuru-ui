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

export interface UserStats {
  id: number;
  mode: number;
  tscore: string;
  rscore: string;
  pp: number;
  plays: number;
  playtime: number;
  acc: number;
  max_combo: number;
  total_hits: number;
  xh_count: number;
  x_count: number;
  sh_count: number;
  s_count: number;
  a_count: number;
  global_rank: number;
  country_rank: number;
  replay_views: number;
  first_places: number;
  level: {
    current: number;
    progress: number;
  };
}
