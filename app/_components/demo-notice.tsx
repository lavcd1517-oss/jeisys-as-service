// 준비 중 메뉴들은 실제 사내 자료 대신 지어낸 예시 데이터로 동작한다는 안내
export default function DemoNotice({ text }: { text: string }) {
  return (
    <div className="mb-3 flex items-start gap-2 rounded-lg border border-[#e6cd9e] bg-[#f9f2e4] px-3.5 py-2.5 text-[11.5px] leading-5 text-[#97621b]">
      <span className="shrink-0 font-bold">예시 데이터</span>
      <span>{text}</span>
    </div>
  );
}

export const demoFieldClass =
  "h-[34px] rounded-lg border border-line bg-white px-3 text-[13px] text-txt outline-none transition focus:border-accent focus:shadow-[0_0_0_3px_rgba(25,97,172,0.12)]";
