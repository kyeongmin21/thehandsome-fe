import {useQuery} from "@tanstack/react-query";
import apiHelper from "@/utils/apiHelper";


const useBrandList = () => {
    const {
        data: brandList = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['brands'],
        queryFn: async () => {
            return await apiHelper.get('/brands/list');
        },
        staleTime: 0,
    });

    return {brandList, isLoading, isError};
};

export default useBrandList;