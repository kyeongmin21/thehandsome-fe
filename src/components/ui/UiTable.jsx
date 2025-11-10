"use client";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender
} from "@tanstack/react-table";
import {useState} from "react";
import UiButton from "@/components/ui/UiButton";
import UiInput from "@/components/ui/UiInput";

export default function DataTable({columns = [], data = []}) {
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [pagination, setPagination] = useState({pageIndex: 0, pageSize: 10}); // 한 페이지에 10개

    const table = useReactTable({
        data,
        columns,
        state: {sorting, columnFilters, pagination},
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        pageCount: Math.max(1, Math.ceil((data?.length || 0) / pagination.pageSize)),
    });

    return (
        <>
            {/* 검색 */}
            <div className="flex justify-end mb-2">
                <UiInput
                    type="text"
                    placeholder="검색"
                    onChange={(e) => {
                        table.getColumn("title")?.setFilterValue(e.target.value);
                    }}/>
            </div>

            {/* 테이블 */}
            <table className="table-fixed w-full border-collapse">
                <thead>
                {table.getHeaderGroups()?.map((headerGroup, index) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th
                                key={header.id}
                                className={`p-2 cursor-pointer font-normal border-b border-gray-200 ${
                                    index === 0 ? "border-t-1 border-t-gray-800" : ""
                                }`}
                                style={{width: header.column.columnDef.size || 'auto'}}
                                onClick={header.column.getToggleSortingHandler()}>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                {{
                                    asc: " 🔼",
                                    desc: " 🔽",
                                }[header.column.getIsSorted()] ?? null}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.length > 0 ? (
                    table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="border-b border-gray-200 p-4">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={columns.length} className="text-center p-4">
                           아직 등록된 게시물이 없습니다.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            {/* 페이지네이션 */}
            <div className="flex justify-center mt-8">
                <UiButton
                    btnText='<'
                    size='s'
                    color='none'
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}>
                </UiButton>

                <span className='m-1 ml-5 mr-5'>
                    {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
                </span>

                <UiButton
                    btnText='>'
                    size='s'
                    color='none'
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}>
                </UiButton>
            </div>
        </>
    );
}
