export type leveltype = "초급" | "중급" | "고급";

export interface LevelInfo {
  userId: number;
  level: leveltype;
  icon: string;
  pace: string;
  totalDistance: number;
  monthlyRuns: number;
}
