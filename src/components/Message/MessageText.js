export default function MessageText({ text, date }) {
    return (
        <div className="pt-5 pl-5 pr-5 pb-5 relative">
            <p className="pr-10 text-[1.0rem] font-medium max-w-[60vw] text-left break-words sm:text-[1.2rem]">{text}</p>
            <p className="absolute right-2 bottom-1">{date}</p>
        </div>
    );
}
