'use client'

import {GoArrowUp} from "react-icons/go";
import {useState, useEffect} from "react";

const QuickMenu = () => {
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShow(true);
            } else {
                setShow(false);

            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            className={`quick-menu-top duration-300
                    ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={handleClick}
        >
            <GoArrowUp/>
        </button>
    )
}

export default QuickMenu;