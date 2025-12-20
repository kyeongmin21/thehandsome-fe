import {useQuery} from '@tanstack/react-query';
import apiHelper from '@/utils/apiHelper';
import {BrandGroup} from '@/types/brand';


const useBrandList = () => {
    const {
        data: brandList = [],
        isLoading,
        isError,
    } = useQuery<BrandGroup[]>({
        queryKey: ['brands'],
        queryFn: async () => {
            return await apiHelper.get<BrandGroup[]>('/brands/list');
        },
        staleTime: 0,
    });

    return {brandList, isLoading, isError};
};

export default useBrandList;