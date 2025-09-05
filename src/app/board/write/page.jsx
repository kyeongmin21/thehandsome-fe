import UiInput from "@/components/ui/UiInput";
import UiTextarea from "@/components/ui/UiTextarea";
import UiButton from "@/components/ui/UiButton";
import Link from "next/link";

const BoardWrite = () => {
    return (
        <div className="board-write">
            <UiInput placeholder='제목을 입력해주세요.'/>
            <UiTextarea placeholder='내용을 입력해주세요.'/>
            <Link href='/board'>
                <UiButton btnText='취소'/>
            </Link>
            <UiButton btnText='저장' color='blackFill'/>
        </div>
    )
}

export default BoardWrite;