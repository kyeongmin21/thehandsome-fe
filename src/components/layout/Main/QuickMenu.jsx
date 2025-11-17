'use client'

import {GoArrowUp} from "react-icons/go";
import {useState, useEffect} from "react";

const QuickMenu = () => {
    const [show, setShow] = useState(false);

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
        <div
            className={`quick-menu-top duration-300
                    ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={handleClick}
        >
            <GoArrowUp/>
        </div>
    )
}

export default QuickMenu;