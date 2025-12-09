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
        queryKey: ['brandList', userId],
        queryFn: async () => {
            const res = await apiHelper.get('/brandlike/my-brands');

            const brandWishedMap = res.reduce((acc, item) => {
                acc[item.brand_code] = true;
                return acc;
            }, {});

            return {brandWishedMap, brandList: res};
        },
        enabled: !!userId,
        initialData: {brandWishedMap: {}, brandList: []},
    });

    const {brandWishedMap, brandList} = data;
    const isBrandLoading = isBrandQueryLoading || isSessionLoading;

    return {brandWishedMap, brandList, isBrandLoading, isError};
};

export default useMyBrandList;