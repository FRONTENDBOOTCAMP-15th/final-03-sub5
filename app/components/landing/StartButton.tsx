"use client";

import { useRouter } from "next/navigation";

export default function StartButton() {
  const router = useRouter();

  return (
    <div className="fixed left-0 right-0 bottom-20 z-20 p-4">
      <button
        onClick={() => router.push("/auth/login")}
        className="w-full py-4 rounded-2xl bg-[#003458] text-white text-lg font-semibold"
      >
        시작하기
      </button>
    </div>
  );
}
