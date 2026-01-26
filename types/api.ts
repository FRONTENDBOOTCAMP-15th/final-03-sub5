import { RunningRecord } from "@/types/record";

export interface RecordListRes {
  ok: 1;
  item: RunningRecord[];
}

export interface RecordInfoRes {
  ok: 1;
  item: RunningRecord;
}
