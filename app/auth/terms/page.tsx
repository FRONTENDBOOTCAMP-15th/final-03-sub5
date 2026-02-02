"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TermsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#F5F6F8]">
      <div className="mx-auto w-full max-w-md px-5">
        {/* 뒤로가기 bar */}
        <div className="h-12 flex items-center">
          <button
            type="button"
            aria-label="뒤로가기"
            onClick={() => router.back()}
            className="p-2 -ml-2"
          >
            <Image
              src="/icons/arrow_back.svg"
              alt="뒤로가기"
              width={24}
              height={24}
              priority
            />
          </button>
        </div>

        {/* 제목 */}
        <section className="mt-2">
          <h1 className="text-3xl font-extrabold tracking-tight">약관 동의</h1>
        </section>

        {/* 약관 동의 */}
        <section className="mt-8 flex-1">
          <div className="rounded-2xl bg-white px-6 py-8 shadow-sm flex h-full flex-col">
            {/* 전체 동의 */}
            <div className="flex items-center gap-3">
              <Image
                src="/icons/post-submit.svg"
                alt=""
                width={24}
                height={24}
                className="inline-flex items-center justify-center"
              />
              {/* <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 text-gray-300">
                ✓
              </span> */}
              <p className="text-base text-gray-700">
                Sub.5 이용약관 전체 동의
              </p>
            </div>
            <div className="my-6 h-px w-full bg-gray-200" />

            {/* 리스트 */}
            <ul className="space-y-8">
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-gray-300">✓</span>
                  <p className="text-sm text-gray-500">서비스 이용약관(필수)</p>
                </div>

                <Image
                  src="/icons/arrow_forward.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="opacity-40"
                />
              </li>

              <li className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-gray-300">✓</span>
                  <p className="text-sm text-gray-500">
                    개인정보 수집 및 목적(필수)
                  </p>
                </div>

                <Image
                  src="/icons/arrow_forward.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="opacity-40"
                />
              </li>

              <li className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-gray-300">✓</span>
                  <p className="text-sm text-gray-500">
                    위치기반 서비스 이용약관(필수)
                  </p>
                </div>

                <Image
                  src="/icons/arrow_forward.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="opacity-40"
                />
              </li>

              <li className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-gray-300">✓</span>
                  <p className="text-sm text-gray-500">
                    광고성 정보 수신 동의(선택)
                  </p>
                </div>

                <Image
                  src="/icons/arrow_forward.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="opacity-40"
                />
              </li>
            </ul>
            <p className="mt-auto pt-8 text-xs text-gray-400">
              필수 약관에 동의해야 서비스 이용이 가능합니다.
            </p>
          </div>
        </section>

        {/* 버튼 */}
        <div className="pt-6 pb-8">
          {/* <button
            type="button"
            className="h-14 w-full rounded-2xl bg-secondary text-base font-semibold text-white disabled:opacity-50"
            disabled
          >
            동의하고 시작하기
          </button> */}
          <Link
            href="/auth/signup"
            className="h-14 w-full rounded-2xl bg-primary text-base font-semibold text-white flex items-center justify-center"
          >
            동의하고 시작하기
          </Link>
        </div>
      </div>
    </main>
  );
}
