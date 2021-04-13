export interface ProjectState {
    data: DataType[] | Record<string, never>[];
    isLoading: boolean;
    error: string;
}

export interface DataType {
    activated: boolean;
    authorities: string[];
    createdBy: string;
    createdDate: null;
    customsCode: null;
    customsOffice: null;
    deleted: string;
    docNumber: null;
    email: string;
    firstName: string;
    id: number;
    ip1: null;
    ip2: null;
    ip3: null;
    lastModifiedBy: string;
    lastModifiedDate: null;
    lastName: string;
    login: string;
    mac1: null;
    mac2: null;
    mac3: null;
    middleName: null;
    passwordNeedChange: true;
    position: null;
    remark: null;
    subdivision: null;
}