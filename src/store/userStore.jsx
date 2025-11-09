import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
    persist(
        (set) => ({
            accessToken: null,
            userId: null,
            userName: null,
            isLoginIn: false,

            // 로그인 성공 시 상태 저장
            setUser: ({ accessToken, userId, userName }) => {
                set({
                    accessToken,
                    userId,
                    userName,
                    isLoginIn: !!accessToken
                });
            },

            // 로그아웃
            logout: () => {
                set({
                    accessToken: null,
                    userId: null,
                    userName: null,
                    isLoginIn: false
                });
                sessionStorage.removeItem("accessToken");
            },

        }),
        {
            name: "userStorage",
        }
    )
);

export default useUserStore;
