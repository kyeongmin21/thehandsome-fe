import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useSession} from "next-auth/react";
import apiHelper from "@/utils/apiHelper";


const useToggleWish = () => {
    const queryClient = useQueryClient();
    const {data: session} = useSession();
    const userId = session?.user?.id;

    const {mutate: toggleWish} = useMutation({
        mutationFn: (code) => {
            return apiHelper.post('/wishlist/toggle', {product_code: code});
        },
        async onMutate(code) {
            // 세션이 없으면 낙관적 업데이트를 시도하지 않습니다.
            if (!userId) return;

            // 뮤테이션 실행 전에 기존 쿼리를 취소하여 데이터 충돌 방지
            await queryClient.cancelQueries({queryKey: ['wishlist', userId]});

            // 현재 위시리스트 데이터 스냅샷 저장 (롤백을 위해)
            const prevWishlist = queryClient.getQueryData(['wishlist', userId]);

            // UI를 즉시 업데이트 (낙관적 업데이트)
            queryClient.setQueryData(['wishlist', userId], (old) => {
                if (!old) return {wishedMap: {[code]: true}, wishListItems: []};

                const newWishedMap = {...old.wishedMap};

                if (newWishedMap[code]) {
                    delete newWishedMap[code]; // 위시 해제
                } else {
                    newWishedMap[code] = true; // 위시 설정
                }

                return {
                    ...old,
                    wishedMap: newWishedMap
                };
            });

            return {prevWishlist};
        },
        onError: (error, variables, context) => {
            console.error('위시리스트 토글 실패', error)
            // 롤백 실행
            if (context?.prevWishlist && userId) {
                queryClient.setQueryData(['wishlist', userId], context.prevWishlist);
            }
        },
        // 성공/실패와 관계없이 최종적으로 쿼리 무효화 (서버 상태와 동기화)
        onSettled: () => {
            if (userId) {
                queryClient.invalidateQueries({
                    queryKey: ['wishlist', userId]
                });
            }
        }
    });

    return {toggleWish};
};

export default useToggleWish;