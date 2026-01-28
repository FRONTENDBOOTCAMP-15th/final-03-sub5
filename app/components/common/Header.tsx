import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white-100 border border-0">
      <div className="flex items-center justify-between h-[64px] px-4 min-w-[360px]">
        <div className="text-lg font-bold">
          <img src="/icons/logo.svg" />
        </div>

        <div className="flex bg-white-300 items-center gap-8">
          <Link aria-label="weather" href="./weather.html">
            <img
              src="/icons/arcticons--weather.svg"
              alt="날씨"
              className="w-6 h-6"
            />
          </Link>
          <button aria-label="profile">
            <img
              src="/icons/healthicons--ui-user-profile-outline.svg"
              alt="프로필"
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
