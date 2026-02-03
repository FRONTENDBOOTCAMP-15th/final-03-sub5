import CommentItem from "./CommentItem";

export default function CommentList() {
  return (
    <section className="mt-6 px-4">
      <h3 className="text-sm font-semibold text-gray-500 mb-2">관리자 답변</h3>

      <CommentItem />
      {/* 나중에 map */}
    </section>
  );
}
