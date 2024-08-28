export interface Footprint {
    id: number;
    title: string;
    address: string;
    content: string;
    position: number[];
    image: string[];
    time: string;
}

export interface FilterFootprint {
    key?: string | null;
    startDate?: string | null;
    endDate?: string | null;
}

export interface FilterForm {
    address?: string;
    createTime?: [moment.Moment, moment.Moment];
}