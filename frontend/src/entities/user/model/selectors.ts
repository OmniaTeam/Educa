import { useAppSelector } from "../../../shared/lib/index";

export const getUserInfo = () => {
    return useAppSelector((state) => state.user);
}