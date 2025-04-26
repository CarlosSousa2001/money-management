export interface PaginatedBase<T> {
    data: T[];
    meta: {
        totalItems: number;
        totalPages: number;
        page: number;
        perPage: number;
        nextPage: boolean | null;
        prevPage: boolean | null;
    }
}


export const DATA_CONST_PAGINATED = {
    meta: {
        totalItems: 0,
        totalPages: 0,
        page: 1,
        perPage: 10,
        nextPage: null,
        prevPage: null,
    }
}

export interface ResponseDataBase<T> {
    data: T[];
    message: string;
    success: boolean;
}

export interface ResponseDataBaseSimple<T> {
    data: T;
    message: string;
    success: boolean;
}