"use client";
import { useState, useMemo } from "react";
import UiButton from "@/components/ui/UiButton";
import UiInput from "@/components/ui/UiInput";

export default function DataTable({ columns = [], data = [], isSearch }) {
    const [search, setSearch] = useState("");
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState(null);
    const [pageIndex, setPageIndex] = useState(0);
    const pageSize = 10;

    // 검색 필터
    const filteredData = useMemo(() => {
        if (!search) return data;
        return data.filter(item =>
            Object.values(item).some(val =>
                String(val).toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [data, search]);

    // 정렬
    const sortedData = useMemo(() => {
        if (!sortColumn) return filteredData;
        return [...filteredData].sort((a, b) => {
            if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
            if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });
    }, [filteredData, sortColumn, sortDirection]);

    // 페이징
    const pagedData = useMemo(() => {
        const start = pageIndex * pageSize;
        return sortedData.slice(start, start + pageSize);
    }, [sortedData, pageIndex]);

    // 컬럼 클릭 시 정렬 토글
    const handleSort = column => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
    };

    const pageCount = Math.ceil(sortedData.length / pageSize);

    return (
        <>
            {/* 검색 */}
            {isSearch && (
                <div className="flex justify-end mb-2">
                    <UiInput
                        type="text"
                        placeholder="검색"
                        onChange={e => {
                            setSearch(e.target.value);
                            setPageIndex(0); // 검색 시 1페이지로
                        }}
                    />
                </div>
            )}

            {/* 테이블 */}
            <table className="table-fixed w-full border-collapse">
                <thead>
                <tr>
                    {columns.map(col => (
                        <th
                            key={col.accessor}
                            className="p-2 cursor-pointer font-normal border-b border-gray-200"
                            onClick={() => handleSort(col.accessor)}
                        >
                            {col.header} {sortColumn === col.accessor ? (sortDirection === "asc" ? " 🔼" : " 🔽") : ""}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {pagedData.length > 0 ? (
                    pagedData.map((row, idx) => (
                        <tr key={idx}>
                            {columns.map(col => (
                                <td key={col.accessor} className="border-b border-gray-200 p-4">
                                    {row[col.accessor]}
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
                <UiButton btnText="<" size="s" color="none" onClick={() => setPageIndex(prev => Math.max(prev - 1, 0))} disabled={pageIndex === 0} />
                <span className="m-1 ml-5 mr-5">{pageIndex + 1} / {pageCount}</span>
                <UiButton btnText=">" size="s" color="none" onClick={() => setPageIndex(prev => Math.min(prev + 1, pageCount - 1))} disabled={pageIndex >= pageCount - 1} />
            </div>
        </>
    );
}
