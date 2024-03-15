import { EUserRoles } from "../../../entities/index";

export const RoleHandler = (role : EUserRoles) => {
    switch (role) {
        case EUserRoles.ADMIN: {
            return [
                {
                    linkPath : '',
                    linkValue : 'Главная'
                },
                {
                    linkPath : 'institutes',
                    linkValue : 'Институты'
                }
            ]
        }
        case EUserRoles.TEACHER: {
            return [
                {
                    linkPath : '',
                    linkValue : 'Главная'
                },
                {
                    linkPath : 'subjects',
                    linkValue : 'Предметы'
                }
            ]
        }
        case EUserRoles.STUDENT: {
            return [
                {
                    linkPath : '',
                    linkValue : 'Главная'
                },
                {
                    linkPath : 'subjects',
                    linkValue : 'Предметы'
                },
                {
                    linkPath : 'favorites',
                    linkValue : 'Избранное'
                }
            ]
        }
        default: {
            return [
                {
                    linkPath : '',
                    linkValue : 'Главная'
                },
                {
                    linkPath : 'subjects',
                    linkValue : 'Предметы'
                },
                {
                    linkPath : '',
                    linkValue : 'Избранное'
                }
            ]
        }
    }
}