
import {getServerSession} from 'next-auth';
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import apiHelper from "@/utils/apiHelper";


export async function serverBrandLike() {
    const session = await getServerSession(authOptions);
    if (!session || !session.accessToken) {
        return
    }

    try {
        const res = await apiHelper.get(
            '/brandlike/my-brands', {
            headers: {
                'Authorization': `Bearer ${session.accessToken}`
            }})

        const brandsMap = {};
        res.forEach(item => {
            brandsMap[item.brand_code] = true;
        });

        return brandsMap;
    } catch (error) {
        console.log('서버에서 찜목록 조회 실패', error)
    }
}