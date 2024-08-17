interface Response<T> {
    code: number,
    message: string
    data: T
}

interface Paginate<T> {
    next: boolean,
    prev: boolean,
    page: number,
    size: number,
    pages: number,
    total: number,
    result: T
}

interface Page {
    page?: number,
    size?: number,
}

interface FilterData {
    key?: string,
    startDate?: number,
    endDate?: number
}

interface QueryData {
    sort?: "asc" | "desc",
    pattern?: "list" | "recursion",
    query?: FilterData,
    pagination?: Page
}