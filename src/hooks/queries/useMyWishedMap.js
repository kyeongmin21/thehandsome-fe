    import {useQuery} from "@tanstack/react-query";
    import {useSession} from "next-auth/react";
    import apiHelper from "@/utils/apiHelper";


    const useMyWishedMap = () => {
        const {data: session, status} = useSession();
        const userId = session?.user?.id;
        const isSessionLoading = status === 'loading'

        const {data: wishedMap = {}, isLoading: isWishedQueryLoading} = useQuery({
            queryKey: ['wishlist', userId],
            queryFn: async () => {
                const res = await apiHelper.get('/wishlist/my-wished');
                // 결과를 {product_code: true} 형태의 맵으로 변환
                return res.reduce((acc, item) => {
                    acc[item.product_code] = true;
                    return acc;
                }, {});
            },
            enabled: !!userId,
            initialData: {},
        });

        // 쿼리 로딩 중이거나 세션 로딩 중일 때 true를 반환
        const isWishedLoading = isWishedQueryLoading || isSessionLoading;
        return {wishedMap, isWishedLoading};
    };

    export default useMyWishedMap;