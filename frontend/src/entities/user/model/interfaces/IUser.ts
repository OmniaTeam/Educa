import { EUserRoles } from "../enums/index";

export interface IUser {
    userId : number,
    userFio : string,
    userLogin : string,
    userRole : EUserRoles
}