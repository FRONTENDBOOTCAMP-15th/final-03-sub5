"use client";
import { useState } from "react";
import { LevelInfo } from "../types";
export default function LevelHeader() {
  const [level, setLevel] = useState([]);

  const nowLevel = "고급";

  const LevelDummy: LevelInfo[] = [
    {
      level: "초급",
      icon: "🌱",
      pace: "7,00",
      totalDistance: 5,
      monthlyRuns: 3,
    },
    {
      level: "중급",
      icon: "🏃",
      pace: "6,00",
      totalDistance: 10,
      monthlyRuns: 3,
    },
    {
      level: "고급",
      icon: "🔥",
      pace: "8,00",
      totalDistance: 21,
      monthlyRuns: 3,
    },
    {
      level: "초급",
      icon: "🌱",
      pace: "9,00",
      totalDistance: 42,
      monthlyRuns: 3,
    },
  ];
  const leveling = LevelDummy.find((item) => {
    if (item.level === nowLevel) {
      return true;
    }
  });
  console.log("==hi", leveling);

  // const levels = leveling.map((item) => {
  //   return {
  //     level: item.level,
  //     icon: item.icon,
  //   };
  // });
  return (
    <>
      {/* 탭 LevelIcon 상단 */}
      <section className="flex flex-col items-center">
        <span className="text-3xl"> {leveling?.icon || "정보 없음"}</span>
        <span className="mb-6 text-2xl">당신의 러닝 레벨</span>
        <span className="inline-block px-4 py-1 mb-2 bg-[#1FC0CC] rounded-full text-xs text-notselectbtn">
          {leveling?.level || "정보 없음"}
        </span>
      </section>
    </>
  );
}
