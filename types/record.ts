export interface TimeRecord {
  hour: number;
  min: number;
  sec: number;
}
export type RecordType = "running" | "walking" | "jogging" | "trekking" | "treadmill";

export interface RunningRecord {
  // 필수 필드
  _id: number;
  userId: number;
  date: string;
  distance: number;

  timeRecord: TimeRecord; // 운동 시간 시,분,초
  recordType: RecordType; // 운동 유형

  createdAt: string;
  updatedAt: string;
  // 선택 필드
  calorie?: number;
  place?: string;
  memo?: string;
}

// type RecordCreateForm = Pick<RunningRecord, "date" | "distance" | "timeRecord" | "recordType" | "calorie" | "place" | "memo">;
export type RecordCreateForm = Omit<RunningRecord, "_id" | "userId" | "createdAt" | "updatedAt">; // Omit 해당 요소빼고 전달
export type RecordUpdateForm = RecordCreateForm; // 기록(데이터) 수정 시
