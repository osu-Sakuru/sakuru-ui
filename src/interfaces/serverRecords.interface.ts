import type { GameModes } from '@/enums/GameModes.enum';

export type ServerRecord = {
  username: string;
  pp: number;
  userid: number;
  beatmap_id: number;
  set_id: number;
};

export type IServerRecords = {
  [key in GameModes]?: ServerRecord;
};
