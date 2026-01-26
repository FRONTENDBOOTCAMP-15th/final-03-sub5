import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>final-project-sample v02</h1>
      <h2>client-id: {process.env.NEXT_PUBLIC_CLIENT_ID}</h2>
      <Link href="/records/new">기록추가 페이지</Link>
      <div>
        <Link href="/records/detail">기록상세 페이지</Link>
      </div>
      <Link href="/records">기록 페이지</Link>
    </>
  );
}
