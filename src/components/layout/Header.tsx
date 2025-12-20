import {HeaderClient} from '@/components/layout/HeaderClient'
import {getServerSession} from 'next-auth';
import {authOptions} from '@/app/api/auth/[...nextauth]/authOptions';


const Header = async () => {
    const session = await getServerSession(authOptions);

    return (
        <HeaderClient session={session}/>
    )
}

export default Header;