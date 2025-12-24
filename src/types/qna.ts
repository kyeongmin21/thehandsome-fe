import {string} from "zod";

export interface Column<T> {
    header: string;
    accessorKey: keyof T;
    size: number;
    onClick?: (row: T) => void;
}

export interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    isSearch? : boolean;
}


// QnA 데이터 구조 타입
export interface QnaData {
    id: number;
    title: string;
    created_at: Date | string;
    updated_at: Date | string;
    status_label: string;
    author_id?: string;
    author_name?: string;
}


// 폼 데이터 타입 정의
export interface QnaFormData {
    title: string;
    content: string;
}

// Props 타입 정의
export interface QnaFormProps {
    mode: 'write' | 'edit' | 'view';
}