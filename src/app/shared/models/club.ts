import { IBaseEntity } from "./baseEntity";

export interface IClub extends IBaseEntity {
    code: string;
    name: string;
    logo: string;
    stadium: string;
    defaultColor: string;
    otherColor: string;
}

