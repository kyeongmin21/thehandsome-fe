'use client';
import {useRouter, useSearchParams} from "next/navigation";


interface SortFilterProps {
    currentSort: string;
}

const SortFilter = ({currentSort}: SortFilterProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const changeSort = (sort: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('sort', sort);
        params.set('page', '1'); // 정렬 바꾸면 1페이지로

        router.push(`?${params.toString()}`);
    }

    return (
        <div className="mb-4 flex justify-end gap-3">
            <button
                onClick={() => changeSort('latest')}
                className={currentSort === 'latest' ? 'text-xs' : 'text-xs text-gray-400'} >
                최신순
            </button>
            <button
                onClick={() => changeSort('price_asc')}
                className={currentSort === 'price_asc' ? 'text-xs' : 'text-xs text-gray-400'}>
                가격 낮은순
            </button>
            <button
                onClick={() => changeSort('price_desc')}
                className={currentSort === 'price_desc' ? 'text-xs' : 'text-xs text-gray-400'}>
                가격 높은순
            </button>
        </div>
    )
}

export default SortFilter;