import {useQuery} from "@tanstack/react-query";
import {useSession} from "next-auth/react";
import apiHelper from "@/utils/apiHelper";

const useMyBrandList = () => {
    const {data: session, status} = useSession();
    const userId = session?.user?.id;
    const isSessionLoading = status === 'loading';

    const {
        data,
        isLoading: isBrandQueryLoading,
        isError
    } = useQuery({
        queryKey: ['myWishedBrands', userId],
        queryFn: async () => {
            const res = await apiHelper.get('/brandlike/my-brands');

            const wishedBrandMap = res.reduce((acc, item) => {
                acc[item.brand_code] = true;
                return acc;
            }, {});

            return {wishedBrandMap, wishedBrandList: res};
        },
        enabled: !!userId,
        initialData: {wishedBrandMap: {}, wishedBrandList: []},
    });

    const {wishedBrandMap, wishedBrandList} = data;
    const isWishedBrandLoading = isBrandQueryLoading || isSessionLoading;

    return {wishedBrandMap, wishedBrandList, isWishedBrandLoading, isError};
};

export default useMyBrandList;