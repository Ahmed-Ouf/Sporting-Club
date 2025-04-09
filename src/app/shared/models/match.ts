import { IClub } from "./club";
import { IBaseEntity } from "./baseEntity";

export interface IMatch extends IBaseEntity {
    code: string;
    weakNumber: number;
    firstClub: IClub;
    firstClubGoals: number | null;
    firstClubId: string;
    secondClub: IClub;
    secondClubGoals: number | null;
    secondClubId: string;
    date: string | null;
    matchTime: string | null;
    year: number | null;
    season: string;

}