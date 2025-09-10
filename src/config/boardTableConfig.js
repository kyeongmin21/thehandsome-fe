import UiButton from '@/components/ui/UiButton';

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
        header: "수정",
        size: 150,
        cell: ({row}) => (
            <div style={{textAlign: "center"}}>
                <UiButton btnText='수정' onClick={() => router.push(`/boards/edit/${row.original.id}`)}/>
            </div>
        ),
    },
];
