"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

export default function AddRecordForm() {
  // const [state, formAction, isPending] = useActionState(createRecord)
  const router = useRouter();

  return (
    <>
      {/* 헤더 */}
      <header className="flex justify-between items-center px-6 py-4">
        <button className="" onClick={() => router.back()}>
          <ArrowLeft size={24} className="" />
        </button>
        <h1 className="text-2xl font-bold text-gray-700">러닝 기록 추가</h1>
        <button>취소</button>
      </header>
      {/* 입력 폼 */}
      <form action="">
        <div className="grid grid-cols-2 gap-1 rounded-lg bg-[#ffffff] ">
          <div className="date-time-part">
            {/* 날짜 입력 */}
            <div className="">
              <label className="" htmlFor="date">
                날짜 *
              </label>
              <input type="date" id="date" name="date" className="w-fit px-3 border-[#c3c3c3] border-1 rounded-md " />
            </div>
            {/* 운동시간 입력 */}
            <div className="container-workout">
              <label className="" htmlFor="time">
                운동시간 *
              </label>
              <div className="flex">
                <input type="number" name="hour" placeholder="0" min="0" max="23" />시
                <input type="number" name="min" placeholder="30" min="0" max="59" />분
                <input type="number" name="sec" placeholder="0" min="0" max="59" />초
              </div>
            </div>
          </div>
          <div>
            {/* 거리 입력 */}
            <div className="container-distance">
              <label className="" htmlFor="distance">
                거리* &#40;km&#41;
              </label>
              <div className="flex">
                <input type="number" name="distance" placeholder="0" min="0" max="100" />
                km
              </div>
            </div>
          </div>
          {/* 페이스 자동입력 */}
          <div className="container-averageface">
            <label className="" htmlFor="averageface">
              평균페이스 &#40;자동&#41;
            </label>
            <div className="flex">
              <input type="text" name="pace" placeholder="--:--" readOnly className="" /> /km
            </div>
          </div>
        </div>

        {/* 운동 타입 선택 */}
        <div className="exercise-type flex bg-white">
          {/* 러닝 */}
          <div>
            <input type="radio" id="running" name="exerciseType" value="running" defaultChecked className="hidden " />
            <label htmlFor="running" className=" px-4 py-2 rounded-lg border bg-primary text-white border-primary cursor-pointer">
              러닝
            </label>
          </div>
          {/* 러닝머신 */}
          <div>
            <input type="radio" id="treadmill" name="exerciseType" value="treadmill" className="hidden" />
            <label htmlFor="treadmill" className=" px-4 py-2">
              러닝머신
            </label>
          </div>
          {/* 하이킹 */}
          <div>
            <input type="radio" id="hiking" name="exerciseType" value="hiking" className="hidden" />
            <label htmlFor="hiking" className=" px-4 py-2">
              하이킹
            </label>
          </div>
          {/* 인터벌 */}
          <div>
            <input type="radio" id="interval" name="exerciseType" value="interval" className="hidden" />
            <label htmlFor="interval" className=" px-4 py-2">
              인터벌
            </label>
          </div>
        </div>
        {/* 운동장소 */}
        <div className="container-location">
          <label htmlFor="location">운동장소</label>
          <input type="text" name="location" id="location" placeholder="예: 한강공원" />
        </div>
        {/* 메모 */}
        <div className="container-memo">
          <label htmlFor="memo">메모 &#40;옵션&#41;</label>
          <textarea name="memo" id="memo" rows={3} placeholder="오늘의 컨디션은 어땠나요?" />
        </div>
        <button type="submit" className="w-full bg-[#003458] text-white">
          기록 저장
        </button>
      </form>
    </>
  );
}
