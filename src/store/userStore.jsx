import { create } from "zustand";
import { persist } from "zustand/middleware";
import apiHelper from "@/utils/apiHelper";

const useUserStore = create(
    persist(
        (set) => ({
            userId: null,
            userName: null,
            role: null,
            isLoginIn: false,

            // 로그인 성공 시 상태 저장
            setUser: ({ userId, userName, role }) => {
                set({
                    userId,
                    userName,
                    role,
                    isLoginIn: true,
                });
            },

            // 로그아웃
            logout: async () => {
                try {
                    await apiHelper.post('/logout');
                } catch (error) {
                    console.log('서버 로그아웃 실패', error);
                } finally {
                    localStorage.removeItem("userStorage");
                    sessionStorage.removeItem("accessToken");
                }
            },

        }),
        {
            name: "userStorage",
        }
    )
);

export default useUserStore;
