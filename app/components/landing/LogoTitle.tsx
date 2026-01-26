export default function LogoTitle() {
  return (
    <section className="relative min-h-screen">
      {/* 배경 이미지 */}
      <img
        src="/images/landing-runner.jpg"
        alt="러닝 이미지"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* 이미지 어둡게(오버레이) */}
      <div className="absolute inset-0 bg-black/45" />

      {/* 이미지 위 콘텐츠 */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-white px-6">
        <div className="w-full flex flex-col items-center text-center">
          {/* 로고 */}
          <h1 className="text-4xl font-bold">Sub.5</h1>

          {/* 문구 */}
          <p className="mt-3 text-lg leading-relaxed">
            5분대 페이스로 완주하는 그날까지,
            <br />
            함께 달립니다
          </p>
        </div>
      </div>
    </section>
  );
}
