"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DetailPage() {
  const router = useRouter();
  return (
    <>
      <header className="flex justify-between items-center px-6 py-4 border-b">
        <button className="" onClick={() => router.back()}>
          <ArrowLeft size={24} className="" />
        </button>
        <h1 className="py-2">기록 상세</h1>
      </header>
      <div className="bg-white rounded-lg shadow-md">
        <div className="bg-[#003458] text-white font-semibold w-[50px]"> 러닝</div>
        <p className="">2026년 01월 22일 목요일</p>
        <div>
          <div>아이콘 거리</div>
          <p>5.km</p>
        </div>
        <div>
          <div>아이콘 시간</div>
          <p>32분 10초</p>
        </div>
        <div>
          <div>아이콘 페이스</div>
          <p>6:11 /km</p>
        </div>
      </div>
      <div>
        <div>
          <div>아이콘 장소</div>
          <p>한강공원</p>
        </div>
        <div>
          <div>아이콘 칼로리</div>
          <p>364 kcal</p>
        </div>
      </div>
      <div>
        <div>
          <div>아이콘 메모</div>
          <p>메모내용</p>
        </div>
        <div>
          <button className="bg-[#003458]">수정</button>
          <button className="bg-[#003458]">삭제</button>
        </div>
      </div>
    </>
  );
}
