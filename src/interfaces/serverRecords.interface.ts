interface IModeRecord {
  username: string;
  userid: number;
  user_link: string;
  pp: number;
  set_id: number;
  beatmap_id: number;
}

export interface IServerRecords {
  relax: IModeRecord;
  standard: IModeRecord;
}
