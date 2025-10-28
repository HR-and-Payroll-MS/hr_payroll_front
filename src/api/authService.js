import useAxiosPrivate from "../Hooks/useAxiosPrivate";
export const useUserService = () => {
    const axiosPrivate = useAxiosPrivate();

    const getProfile = async () => {
        const response = await axiosPrivate.get("/auth/users/me/");
        return response.data;
    };

    return {getProfile};
};