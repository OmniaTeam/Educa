import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EUserRoles, EUserGenders } from "./enums/index";
import { IUser } from "./interfaces/index";

const initialState : IUser = {
	userId: 0,
	userName: "username",
	userSurName: "usersurname",
	userLastName: "userlastname",
	userEmail: "",
	userBirthday: "",
	userGender: EUserGenders.man,
	userRole: EUserRoles.nothing
}

export const IUserSlice = createSlice({
	name : "user",
	initialState,
	reducers : {
		setUserId : (state, action : PayloadAction<number>) => {
			state.userId = action.payload
		},
        setUserName : (state, action : PayloadAction<string>) => {
			state.userName = action.payload
		},
		setUserSurName : (state, action : PayloadAction<string>) => {
			state.userSurName = action.payload
		},
		setUserLastName : (state, action : PayloadAction<string>) => {
			state.userLastName = action.payload
		},
		setUserEmail : (state, action : PayloadAction<string>) => {
			state.userEmail = action.payload
		},
		setUserBirthday : (state, action : PayloadAction<string>) => {
			state.userBirthday = action.payload
		},
		setUserGender : (state, action : PayloadAction<EUserGenders>) => {
			state.userGender = action.payload
		},
		setUserRole : (state, action : PayloadAction<EUserRoles>) => {
			state.userRole = action.payload
		},
		exit : (state, _) => {
			state.userName = "",
			state.userSurName = "",
			state.userLastName = "",
			state.userEmail = "",
			state.userBirthday = "",
			state.userGender = EUserGenders.man,
			state.userRole = EUserRoles.nothing
		}
	}
})

export const {
	setUserId,
	setUserName,
	setUserSurName,
	setUserLastName,
	setUserEmail,
	setUserBirthday,
	setUserGender,
	setUserRole,
	exit
} = IUserSlice.actions