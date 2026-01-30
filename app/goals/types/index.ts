export type leveltype = "초급" | "중급" | "고급";

export interface LevelInfo {
  level: leveltype;
  icon: string;
  pace: string;
  totalDistance: number;
  monthlyRuns: number;
}
