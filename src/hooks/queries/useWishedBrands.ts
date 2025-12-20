import {useQuery} from "@tanstack/react-query";
import {useSession} from "next-auth/react";
import apiHelper from "@/utils/apiHelper";


interface BrandItem {
    brand_code: string;
    brand_name: string;
}

interface MyBrandListData {
    wishedBrandMap: Record<string, boolean>;
    wishedBrandList: BrandItem[];
}

const useMyBrandList = () => {
    const {data: session, status} = useSession();
    const userId = session?.user?.id;
    const isSessionLoading = status === 'loading';

    const {
        data,
        isLoading: isBrandQueryLoading,
        isError
    } = useQuery<MyBrandListData>({ // 제네릭 타입 명시
        queryKey: ['myWishedBrands', userId],
        queryFn: async (): Promise<MyBrandListData> => {
            const res = await apiHelper.get<BrandItem[]>('/brandlike/my-brands');

            const wishedBrandMap = res.reduce<Record<string, boolean>>((acc, item) => {
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