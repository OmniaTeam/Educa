import { EUserGenders, EUserRoles } from "../enums/index";

export interface IUser {
    userId : number,
    userName : string,
    userSurName : string,
    userLastName : string,
    userEmail : string,
    userBirthday : string,
    userGender : EUserGenders;
    userRole : EUserRoles
}