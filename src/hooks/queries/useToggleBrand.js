import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useSession} from "next-auth/react";
import apiHelper from "@/utils/apiHelper";


const useToggleBrand = () => {
    const queryClient = useQueryClient();
    const {data: session} = useSession();
    const userId = session?.user?.id;
    const queryKey = ['myWishedBrands', userId];

    const {mutate: toggleBrand} = useMutation({
        mutationFn: (code) => {
            return apiHelper.post('/brandlike/toggle', {brand_code: code});
        },

        async onMutate(code) {
            if (!userId) return;

            // 뮤테이션 실행 전에 기존 쿼리를 취소하여 데이터 충돌 방지
            await queryClient.cancelQueries({queryKey});

            // 기존 데이터 저장 (롤백용)
            const prevBrandList = queryClient.getQueryData(queryKey);

            // UI를 즉시 업데이트 (낙관적 업데이트)
            queryClient.setQueryData(queryKey, (old) => {
                const currentData = old || {
                    wishedBrandMap: {},
                    wishedBrandList: []
                };

                // 1. 기존의 찜 상태 Map을 가져 (안전하게 객체로 초기화)
                const oldBrandMap = currentData.wishedBrandMap || {};

                // 2. 찜 상태를 토글
                const newStatus = !oldBrandMap[code];

                // 3. 새로운 찜 상태 Map을 생성
                const newBrandMap = {...oldBrandMap, [code]: newStatus,};

                // 4. 전체 캐시 객체를 반환하되, wishedBrandMap만 새로운 Map으로 교체
                return {...currentData, wishedBrandMap: newBrandMap,};
            });

            return {prevBrandList}
        },

        onError: (error, code, context) => {
            console.log('브랜드 찜 토글 실패', error)
            if (context?.prevBrandList && userId) {
                queryClient.setQueryData(queryKey, context.prevBrandList);
            }
        },
        onSettled: () => {
            void queryClient.invalidateQueries({queryKey})
        }
    });

    return {toggleBrand};
}

export default useToggleBrand;