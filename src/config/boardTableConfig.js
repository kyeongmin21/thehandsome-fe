import UiButton from '@/components/ui/UiButton';
import apiHelper from "@/utils/apiHelper";
import dayjs from 'dayjs';

export const boardColumns = (router) => [
    {
        accessorKey: "id",
        header: "번호",
        size: 100,
        cell: ({getValue}) => (
            <div className="cell"
                 style={{textAlign: "center"}}>{getValue()}</div>
        ),
    },
    {
        accessorKey: "title",
        header: "제목",
        size: 500,
        cell: ({row}) => (
            <div className="cell"
                 style={{ cursor: 'pointer' }}
                 onClick={() => router.push(`/boards/${row.original.id}`)}>{row.original.title}</div>
        )
    },
    {
        accessorKey: "created_at",
        header: "등록일",
        size: 150,
        cell: ({getValue}) => {
            return (
                <div className="cell" style={{ textAlign: "center" }}>
                    {dayjs(getValue()).format('YYYY.MM.DD HH:mm')}
                </div>
            );
        },
    },
    {
        accessorKey: "updated_at",
        header: "수정일",
        size: 150,
        cell: ({ getValue }) => {
            return (
                <div className="cell" style={{ textAlign: "center" }}>
                    {dayjs(getValue()).format('YYYY.MM.DD HH:mm')}
                </div>
            );
        },
    },
    {
        accessorKey: "edit",
        header: "수정/삭제",
        size: 150,
        cell: ({row}) => (
            <div className="cell"
                 style={{textAlign: "center"}}>
                <UiButton btnText='수정'
                          size='s'
                          className="mr-2"
                          onClick={() => router.push(`/boards/${row.original.id}`)}/>
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
