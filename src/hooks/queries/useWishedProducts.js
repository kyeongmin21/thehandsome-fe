import {useQuery} from "@tanstack/react-query";
import {useSession} from "next-auth/react";
import apiHelper from "@/utils/apiHelper";


const useWishedProducts = () => {
    const {data: session, status} = useSession();
    const userId = session?.user?.id;
    const isSessionLoading = status === 'loading'

    const {
        data,
        isLoading: isWishedQueryLoading,
        isError
    } = useQuery({
        queryKey: ['wishlist', userId],
        queryFn: async () => {
            const res = await apiHelper.get('/wishlist/my-wished');

            const wishedMap = res.reduce((acc, item) => {
                acc[item.product_code] = true;
                return acc;
            }, {});

            return {wishedMap, wishListItems: res};
        },
        enabled: !!userId,
        initialData: {wishedMap: {}, wishListItems: []},
    });

    const {wishedMap, wishListItems} = data;
    const isWishedLoading = isWishedQueryLoading || isSessionLoading;

    return {wishedMap, wishListItems, isWishedLoading, isError};
};

export default useWishedProducts;