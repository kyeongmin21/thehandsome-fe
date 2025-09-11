import UiButton from '@/components/ui/UiButton';
import apiHelper from "@/api/apiHelper";

export const boardColumns = (router) => [
    {
        accessorKey: "id",
        header: "번호",
        size: 100,
        cell: ({getValue}) => (
            <div style={{textAlign: "center"}}>{getValue()}</div>
        ),
    },
    {
        accessorKey: "title",
        header: "제목",
        size: 700,
    },
    {
        accessorKey: "created_at",
        header: "등록일",
        size: 150,
        cell: ({getValue}) => (
            <div style={{textAlign: "center"}}>{getValue()}</div>
        ),
    },
    {
        accessorKey: "updated_at",
        header: "수정일",
        size: 150,
        cell: ({getValue}) => (
            <div style={{textAlign: "center"}}>{getValue()}</div>
        ),
    },
    {
        accessorKey: "edit",
        header: "수정/삭제",
        size: 150,
        cell: ({row}) => (
            <div style={{textAlign: "center"}}>
                <UiButton btnText='수정'
                          size='s'
                          className="mr-2"
                          onClick={() => router.push(`/boards/edit/${row.original.id}`)}/>
                <UiButton btnText='삭제' size='s' onClick={() => {
                    if(confirm(`${row.original.id}번째 글을 삭제하시겠습니까?`)) {
                        apiHelper.axios.delete(`/boards/${row.original.id}`)
                            .then(() => {
                                router.push(`/boards`);
                            })
                            .catch((err) => {
                                console.log(err);
                                alert('삭제 실패!')
                            })
                    }
                }}/>
            </div>
        ),
    },
];
