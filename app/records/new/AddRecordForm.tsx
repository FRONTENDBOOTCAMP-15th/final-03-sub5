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
      <header className="flex justify-between items-center px-6 py-6">
        <button className="" onClick={() => router.back()}>
          <ArrowLeft size={24} className="" />
        </button>
        <h1 className="text-2xl font-bold text-gray-700">러닝 기록 추가</h1>
        <button className="text-blue-600">취소</button>
      </header>
      {/* 입력 폼 */}
      <form action="" className="p-4">
        <div className="bg-white grid grid-cols-2 p-5 gap-4">
          {/* 날짜 입력 */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold" htmlFor="date">
              날짜
            </label>
            <input type="date" id="date" name="date" className=" text-sm py-2 px-3 border border-gray-200 focus:outline-none focus:border-primary" />
          </div>

          {/* 운동시간 입력 */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold">운동시간</label>
            <div className="flex gap-1 px-2 text-sm py-2 border text-center border-gray-200">
              <input type="number" name="hour" placeholder="00" min="0" max="23" className="w-8 text-center border-0 focus:outline-none" />
              <span>:</span>
              <input type="number" name="min" placeholder="22" min="0" max="59" className="w-8 text-center border-0 focus:outline-none" />
              <span>:</span>
              <input type="number" name="sec" placeholder="13" min="0" max="59" className="w-8 text-center border-0 focus:outline-none" />
            </div>
          </div>

          {/* 거리 */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold" htmlFor="distance">
              거리 (km)
            </label>
            <input
              type="number"
              id="distance"
              name="distance"
              placeholder="5.00"
              step="0.01"
              className="text-sm  text-center py-2 border border-gray-200 focus:outline-none focus:border-primary"
            />
          </div>

          {/* 평균 페이스 */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold" htmlFor="pace">
              평균 페이스
            </label>
            <input
              type="text"
              id="pace"
              name="pace"
              placeholder="5:30 /km"
              readOnly
              className="text-center text-sm py-2 border border-gray-200 bg-transparent text-gray-500"
            />
          </div>
        </div>

        {/* 운동 타입 선택 */}
        <div className="exercise-type  bg-white">
          <label className="text-xs font-bold">운동유형</label>
          <div className="exercuse-part flex py-2 gap-3">
            {/* 러닝 */}
            <div>
              <input type="radio" id="running" name="exerciseType" value="running" defaultChecked className="hidden " />
              <label htmlFor="running" className=" px-4 py-2 text-xs  rounded-lg border bg-primary text-white border-primary cursor-pointer">
                러닝
              </label>
            </div>
            {/* 러닝머신 */}
            <div>
              <input type="radio" id="treadmill" name="exerciseType" value="treadmill" className="hidden" />
              <label htmlFor="treadmill" className="px-4 py-2 text-xs  rounded-lg border-notselectbtn-border bg-notselectbtn  border-primary cursor-pointer">
                러닝머신
              </label>
            </div>
            {/* 하이킹 */}
            <div>
              <input type="radio" id="hiking" name="exerciseType" value="hiking" className="hidden" />
              <label htmlFor="hiking" className=" px-4 py-2 text-xs  rounded-lg border-notselectbtn-border bg-notselectbtn  border-primary cursor-pointer">
                하이킹
              </label>
            </div>
            {/* 인터벌 */}
            <div>
              <input type="radio" id="interval" name="exerciseType" value="interval" className="hidden" />
              <label htmlFor="interval" className="px-4 py-2 text-xs  rounded-lg border-notselectbtn-border bg-notselectbtn  border-primary cursor-pointer">
                인터벌
              </label>
            </div>
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
