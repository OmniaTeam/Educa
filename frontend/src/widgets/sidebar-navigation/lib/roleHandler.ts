import { EUserRoles } from "../../../entities/index";

export const RoleHandler = (role : EUserRoles) => {
    switch (role) {
        case EUserRoles.admin: {
            return [
                {
                    linkPath : '',
                    linkValue : 'Главная'
                },
                {
                    linkPath : '',
                    linkValue : 'Пользователи'
                },
                {
                    linkPath : '',
                    linkValue : 'Группы'
                }
            ]
        }
        case EUserRoles.teacher: {
            return [
                {
                    linkPath : '',
                    linkValue : 'Главная'
                },
                {
                    linkPath : '',
                    linkValue : 'Группы'
                }
            ]
        }
        case EUserRoles.student: {
            return [
                {
                    linkPath : '',
                    linkValue : 'Главная'
                },
                {
                    linkPath : 'lessons',
                    linkValue : 'Обучение'
                },
                {
                    linkPath : '',
                    linkValue : 'Статистика'
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
                    linkPath : 'lessons',
                    linkValue : 'Обучение'
                },
                {
                    linkPath : '',
                    linkValue : 'Статистика'
                }
            ]
        }
    }
}