"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import Fetch3Hours from "./dongne";

import {
  formatLabel,
  formatDate,
  findNearestRegionFast,
  skyToSimpleEmoji,
} from "@/lib/utils";

import {
  saveTodayHalfDayCache,
  loadTodayHalfDayCache,
  isValidTemp,
} from "@/lib/localWeather";

import type { HalfDayForecast, TodayHalfDayCache } from "@/lib/localWeather";
import type { ForecastRow, MidHalfDay, RegIdRow } from "@/types/kma";

import SearchLocationBar from "./components/searchLocationBar";
import ShortTermColumns from "./ShortTermColumns";

type MidTempDay = {
  date: string;
  min: number | null;
  max: number | null;
};

export type MidForecastResponse = {
  raw: string;
};

export async function fetch3DayForecastClient(
  regId: string,
): Promise<ForecastRow[]> {
  const res = await fetch(`/api/forecast/3day?regId=${regId}`);

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

export async function fetchMidForecastClient(
  reg: string,
): Promise<MidForecastResponse> {
  const res = await fetch(`/api/forecast/mid?reg=${reg}`);

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

export async function fetchMidTempForecast(
  reg: string,
): Promise<MidForecastResponse> {
  const res = await fetch(`/api/forecast/mid-temp?reg=${reg}`);

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}

export default function ForecastPage() {
  const [data, setData] = useState<ForecastRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<string>("역삼동");
  const [regidRows, setRegidRows] = useState<RegIdRow[]>([]);
  const [midRaw, setMidRaw] = useState<string | null>(null);
  const [midTempRaw, setMidTempRaw] = useState<string | null>(null);

  const midItems: MidHalfDay[] = midRaw
    ? midRaw
        .split("\n")
        .filter((line) => line && !line.startsWith("#") && line.includes(","))
        .map((line) => {
          const cols = line.split(",");
          const tmEf = cols[2];
          return {
            date: tmEf.slice(0, 8),
            hour: tmEf.slice(8, 10) as "00" | "12",
            sky: cols[6],
            pref: Number(cols[7]),
            st: Number(cols[10]),
          };
        })
    : [];

  const midTempMap: Map<string, { min: number | null; max: number | null }> =
    midTempRaw
      ? new Map(
          Array.from(
            midTempRaw
              .split(/\r?\n/)
              .map((l) => l.trim())
              .filter(
                (l) =>
                  l.length > 0 &&
                  !l.startsWith("#") &&
                  l.includes(",") &&
                  l.split(",").length >= 8,
              )
              .map((line) => {
                const cols = line.split(",");

                // ✅ TM_EF (YYYYMMDDHHMM)
                const date = cols[2].slice(0, 8);

                const min = Number(cols[6]);
                const max = Number(cols[7]);

                return [
                  date,
                  {
                    min: isNaN(min) ? null : min,
                    max: isNaN(max) ? null : max,
                  },
                ] as [string, { min: number | null; max: number | null }];
              }),
          ).slice(0, 4), // ✅ 앞에서부터 4일치만
        )
      : new Map();

  console.log(midTempMap);

  const midDays = midRaw
    ? Array.from(midTempMap.keys()) // ✅ midTempMap 기준으로 날짜 추출
    : [];

  const midDayForecasts = midDays.map((date) => {
    const temp = midTempMap.get(date);

    const am = midItems.find((i) => i.date === date && i.hour === "00");
    const pm = midItems.find((i) => i.date === date && i.hour === "12");

    return {
      date,
      am: {
        sky: am?.sky ?? null,
        pref: am?.pref ?? null,
        st: am?.st ?? null,
        temp: temp?.min ?? null,
      },
      pm: {
        sky: pm?.sky ?? null,
        pref: pm?.pref ?? null,
        st: pm?.st ?? null,
        temp: temp?.max ?? null,
      },
    };
  });

  useEffect(() => {
    fetch("/api/regid")
      .then((res) => res.json())
      .then((rows: RegIdRow[]) => {
        setRegidRows(rows);
      })
      .catch(console.error);
  }, []);

  // 오늘 포함 +0 ~ +3일 (총 4일)
  // 1️⃣ KST 기준 오늘 날짜
  const kstNow = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
  const kstDate = new Date(kstNow);

  const todayString = formatDate(new Date());
  //console.log(data);
  // 2️⃣ 날짜(YYYYMMDD) 기준으로만 필터
  const days = Array.from(
    new Set(
      data
        .filter((r) => r.TM_EF.slice(0, 8) >= todayString)
        .map((r) => r.TM_EF.slice(0, 8)),
    ),
  )
    .sort()
    .slice(0, 4)
    .map((date) => {
      const d = new Date(
        `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`,
      );

      return {
        date,
        label: formatLabel(d),
      };
    });
  useEffect(() => {
    fetch3DayForecastClient("11B10101")
      .then(setData)
      .catch((err) => setError(err.message));

    // 중기 날씨
    fetchMidForecastClient("11B00000")
      .then((res) => setMidRaw(res.raw))
      .catch((err) => setError(err.message));

    // ✅ 중기 기온
    fetchMidTempForecast("11B10101")
      .then((res) => setMidTempRaw(res.raw))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>에러 발생: {error}</p>;

  const todayStr = formatDate(new Date());
  console.log(todayStr);
  const dayForecasts = days.map((d) => {
    const isToday = d.date === todayStr;

    const match = (r: ForecastRow, date: string, hour: "00" | "12") =>
      r.TM_EF.slice(0, 8) === date && r.TM_EF.slice(8, 10) === hour;
    const amRow = data.find((r) => match(r, d.date, "00")) ?? null;
    const pmRow = data.find((r) => match(r, d.date, "12")) ?? null;

    const normalizeTemp = (v: number | null) => (isValidTemp(v) ? v : null);
    const am: HalfDayForecast = {
      temp: amRow ? normalizeTemp(Number(amRow.TA)) : null,
      sky: amRow?.SKY ?? null,
      st: amRow?.ST !== undefined ? Number(amRow.ST) : null,
      pref: amRow?.PREP !== undefined ? Number(amRow.PREP) : null,
    };

    const pm: HalfDayForecast = {
      temp: pmRow ? normalizeTemp(Number(pmRow.TA)) : null,
      sky: pmRow?.SKY ?? null,
      st: pmRow?.ST !== undefined ? Number(pmRow.ST) : null,
      pref: pmRow?.PREP !== undefined ? Number(pmRow.PREP) : null,
    };

    return {
      dateLabel: d.label,
      am,
      pm,
    };
  });

  return (
    <main className="min-h-screen bg-white ">
      <div className="mx-auto w-full max-w-md px-5 pb-10">
        <div className="bg-gray-50 flex justify-center py-4">
          <div className="w-full max-w-md px-4">
            {/* 뒤로가기 bar */}
            <div className="h-12 flex items-center">
              <Link href="/weather" className="p-2 -ml-2">
                {/* 뒤로가기 icon */}
                <Image
                  src="/icons/arrow_back.svg"
                  alt="뒤로가기"
                  width={24}
                  height={24}
                  priority
                />
              </Link>
              일기 예보
            </div>

            {/* 검색바 */}
            <SearchLocationBar
              onSelect={async (place) => {
                setSelectedPlace(place.place_name);
                try {
                  //console.log(place.x, place.y);
                  const regId = findNearestRegionFast(
                    { lat: Number(place.y), lon: Number(place.x) },
                    regidRows,
                  );
                  //console.log("regId: ", regId);
                } catch (err: any) {
                  console.error(err);
                  setError(err.message);
                }
              }}
            />
            {/* 일별 예보 */}
            <div className="bg-white rounded-xl p-4 shadow mb-6">
              <p className="text-sm text-gray-400 mb-3">일별 예보</p>

              <div className="overflow-x-auto pb-2">
                <div className="min-w-[600px] border-collapse text-[10px] text-center">
                  <div className="grid grid-cols-[60px_repeat(8,1fr)] border-b border-t border-gray-100">
                    <div className="flex items-center justify-center bg-gray-50 font-medium ">
                      날짜
                    </div>

                    <ShortTermColumns dayForecasts={dayForecasts} type="date" />
                    {midDayForecasts.map((d, i) => (
                      <div
                        key={i}
                        className="py-1 border-r border-gray-100 flex flex-col items-center"
                      >
                        <span>
                          {formatLabel(
                            new Date(
                              d.date.slice(0, 4) +
                                "-" +
                                d.date.slice(4, 6) +
                                "-" +
                                d.date.slice(6),
                            ),
                          )}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-[60px_repeat(8,1fr)] border-b border-gray-100">
                    <div className="py-1 bg-gray-50 font-medium border-r border-gray-100">
                      시각
                    </div>
                    <ShortTermColumns dayForecasts={dayForecasts} type="time" />
                    {midDayForecasts.map((_, i) => (
                      <div
                        key={i}
                        className="col-span-1 grid grid-cols-2 border-r border-gray-100"
                      >
                        <span>오전</span>
                        <span>오후</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-[60px_repeat(8,1fr)] border-b border-gray-100">
                    <div className="py-2 bg-gray-50 font-medium border-r border-gray-100">
                      날씨
                    </div>
                    <ShortTermColumns dayForecasts={dayForecasts} type="sky" />
                    {midDayForecasts.map((d, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-2 border-r border-gray-100"
                      >
                        <span>
                          {d.am.sky
                            ? skyToSimpleEmoji(d.am.sky, d.am.pref)
                            : "-"}
                        </span>
                        <span>
                          {d.pm.sky
                            ? skyToSimpleEmoji(d.pm.sky, d.pm.pref)
                            : "-"}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-[60px_repeat(8,1fr)] border-b border-gray-100">
                    <div className="py-2 bg-gray-50 font-medium border-r border-gray-100">
                      기온
                    </div>
                    <ShortTermColumns dayForecasts={dayForecasts} type="temp" />
                    {midDayForecasts.map((d, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-2 border-r border-gray-100"
                      >
                        <span className="text-blue-500">
                          {d.am.temp !== null ? `${d.am.temp}°` : "-"}
                        </span>
                        <span className="text-red-500">
                          {d.pm.temp !== null ? `${d.pm.temp}°` : "-"}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-[60px_repeat(8,1fr)]">
                    <div className="py-2 bg-gray-50 font-medium border-r border-gray-100">
                      강수확률
                    </div>
                    <ShortTermColumns dayForecasts={dayForecasts} type="st" />
                    {midDayForecasts.map((d, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-2 border-r border-gray-100"
                      >
                        <span>{d.am.st !== null ? `${d.am.st}%` : "-"}</span>
                        <span>{d.pm.st !== null ? `${d.pm.st}%` : "-"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 시간별 예보 

            <Fetch3Hours />
            */}
            {/*{/* 시간별 예보 끝*/}
          </div>
        </div>
      </div>
    </main>
  );
}
