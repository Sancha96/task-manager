export interface ProjectState {
    data: DataType[] | Record<string, never>[];
    isLoading: boolean;
    error: string;
}

export interface DataType {}