export interface UserState {
    data: DataType | Record<string, never>;
    isLoading: boolean;
    error: string;
}

export interface DataType {
    access_token: string
}