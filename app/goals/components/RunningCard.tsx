import { LevelDummy } from "../config/levelConfig";
import { LevelInfo } from "../types";
export default function RunningCard({
  userLevel,
}: {
  userLevel: LevelInfo | undefined;
}) {
  return (
    <>
      {/* 메인 중간 : 분석결과 카드 */}
      <section className="flex flex-col rounded-xl border border-gray-200 shadow-sm py-5 bg-white overflow-hidden">
        <h2 className="text-lg font-bold text-gray-900 mb-4 px-5">
          🏆 분석된 러닝 기록
        </h2>
        <dl className="w-full divide-y divide-gray-100">
          <div className="flex justify-between items-center px-5 py-4 hover:bg-gray-50 transition-all cursor-pointer">
            <dt className="text-sm font-medium text-gray-700">평균 페이스</dt>
            <dd className="text-lg font-bold text-gray-900">
              {userLevel?.pace}
            </dd>
          </div>
          <div className="flex justify-between items-center px-5 py-4 hover:bg-gray-50 transition-all cursor-pointer">
            <dt className="text-sm font-medium text-gray-700">
              완주 거리 (누적 거리)
            </dt>
            <dd className="text-lg font-bold text-gray-900">
              {userLevel?.totalDistance}KM
            </dd>
          </div>
          <div className="flex justify-between items-center px-5 py-4 hover:bg-gray-50 transition-all cursor-pointer">
            <dt className="text-sm font-medium text-gray-700">
              월간 러닝 횟수
            </dt>
            <dd className="text-lg font-bold text-gray-900">
              {userLevel?.monthlyRuns}회
            </dd>
          </div>
        </dl>
      </section>
    </>
  );
}
