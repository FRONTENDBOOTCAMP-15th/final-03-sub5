// app/profile/board/[id]/CommentItem.tsx
export default function CommentItem() {
  return (
    <div className="border border-gray-200 rounded-md p-4 mb-3 bg-gray-50">
      {/* 작성 정보 */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-gray-600">관리자</span>
        <time className="text-xs text-gray-400" dateTime="2026-01-05T14:11:22">
          2026.01.05 14:11
        </time>
      </div>

      {/* 답변 내용 */}
      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
        안녕하세요. 문의 주신 내용 확인했습니다. 말씀해주신 현상은 현재
        내부적으로 확인 중이며, 수정 완료 시 다시 안내드리겠습니다. 이용에
        불편을 드려 죄송합니다.
      </p>
    </div>
  );
}
