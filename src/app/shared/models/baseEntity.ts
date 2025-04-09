export interface IBaseEntity {
    id: string;
    createAt: string | null;
    createBy: string;
    updateAt: string | null;
    updatedBy: string;
}