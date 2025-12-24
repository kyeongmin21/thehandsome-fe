import {useQuery} from "@tanstack/react-query";
import {useSession} from "next-auth/react";
import apiHelper from "@/utils/apiHelper";
import {Wishlist, MyWishedData} from "@/types/wishlist";

const useWishedProducts = () => {
    const {data: session, status} = useSession();
    const userId = session?.user?.id;
    const isSessionLoading = status === 'loading'

    const {
        data,
        isLoading: isWishedQueryLoading,
        isError
    } = useQuery<MyWishedData>({
        queryKey: ['wishlist', userId],
        queryFn: async (): Promise<MyWishedData> => {
            const res = await apiHelper.get<Wishlist[]>('/wishlist/my-wished');

            const wishedMap = res.reduce<Record<string, boolean>>((acc, item) => {
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