export interface ProjectState {
    data: DataType[] | Record<string, never>[];
    item: any;
    isLoading: boolean;
    error: string;
}

export interface DataType {}