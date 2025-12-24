'use client';

import {useState, useMemo} from 'react';
import {MdArrowDropUp, MdArrowDropDown} from 'react-icons/md';
import UiButton from '@/components/ui/UiButton';
import UiInput from '@/components/ui/UiInput';
import {DataTableProps} from '@/types/qna'
import dayjs from 'dayjs';


// 제네릭 컴포넌트로 변환
export default function DataTable<T extends Record<string, any>>({
    columns = [],
    data = [],
    isSearch
}: DataTableProps<T>) {
    const [search, setSearch] = useState<string>('');
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
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
            if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
            if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }, [filteredData, sortColumn, sortDirection]);

    // 페이징
    const pagedData = useMemo(() => {
        const start = pageIndex * pageSize;
        return sortedData.slice(start, start + pageSize);
    }, [sortedData, pageIndex]);

    const handleSort = (column: string) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const pageCount = Math.ceil(sortedData.length / pageSize);

    return (
        <>
            {isSearch && (
                <div className='flex justify-end mb-2'>
                    <UiInput
                        type='text'
                        placeholder='검색'
                        onChange={e => {
                            setSearch(e.target.value);
                            setPageIndex(0);
                        }}
                    />
                </div>
            )}

            {/* 테이블 */}
            <table className='table-fixed w-full border-collapse'>
                <thead>
                <tr>
                    {columns.map((col, colIndex) => (
                        <th key={`${String(col.accessorKey)}-${colIndex}`}
                            className='p-2 cursor-pointer font-normal border-b'
                            onClick={() => handleSort(String(col.accessorKey))}>
                            <div className='flex justify-center'>
                                {col.header}{' '}
                                {sortColumn === col.accessorKey
                                    ? sortDirection === 'asc'
                                        ? <span><MdArrowDropUp size={22}/></span>
                                        : <span><MdArrowDropDown size={22}/></span>
                                    : ''}
                            </div>
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {pagedData.length > 0 ? (
                    pagedData.map((row, rowIndex) => (
                        <tr key={row.id || rowIndex}>
                            {columns.map((col, colIndex) => {
                                let value: any = row[col.accessorKey as keyof T];

                                if (col.accessorKey === 'created_at' && value) {
                                    value = dayjs(value).format('YYYY.MM.DD HH:mm');
                                }

                                if (col.accessorKey === 'title') {
                                    return (
                                        <td key={`${String(col.accessorKey)}-${colIndex}`}
                                            className='border-b p-2 cursor-pointer  border-gray-300 '
                                            onClick={() => col.onClick && col.onClick(row)}>
                                            {value}
                                        </td>
                                    );
                                }

                                return (
                                    <td key={`${String(col.accessorKey)}-${colIndex}`}
                                        className='border-b  border-gray-300 p-3 text-center'>
                                        {value}
                                    </td>
                                );
                            })}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={columns.length} className='text-center p-6'>
                            아직 등록된 게시물이 없습니다.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            {/* 페이지네이션 */}
            <div className='flex justify-center mt-4 gap-4'>
                <UiButton
                    btnText='<'
                    size='s'
                    color='none'
                    onClick={() => setPageIndex(prev => Math.max(prev - 1, 0))}
                    disabled={pageIndex === 0}/>
                <span className='pt-2'>{pageIndex + 1} / {pageCount}</span>
                <UiButton
                    btnText='>'
                    size='s'
                    color='none'
                    onClick={() => setPageIndex(prev => Math.min(prev + 1, pageCount - 1))}
                    disabled={pageIndex >= pageCount - 1}/>
            </div>
        </>
    );
}
