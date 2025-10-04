export default function NoticeOne(props) {
  return (
    <div className="mt-10 flex h-25 w-160 items-center justify-center border-2 border-dashed border-[#282726] bg-[#7A5EA7]">
      <h3 className="text-3xl font-bold text-[#F9F4DA]">{props.lang}</h3>
    </div>
  );
}
