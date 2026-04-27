"use client";

import {useEffect, Suspense} from "react";
import {usePathname, useSearchParams} from "next/navigation";
import NProgress from "nprogress";
import 'nprogress/nprogress.css';

function ProgressBarContent() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        NProgress.configure({
            showSpinner: false,
            speed: 200,
            trickleSpeed: 100,
        });

        NProgress.start();
        const timer = setTimeout(() => {
            NProgress.done();
        }, 500);

        return () => clearTimeout(timer);
    }, [pathname, searchParams]);

    return null;
}

export default function ProgressBar() {
    return (
        <Suspense fallback={null}>
            <ProgressBarContent />
        </Suspense>
    );
}