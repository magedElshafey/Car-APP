import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

export function useScrollToTopOnFilters() {
    const [searchParams] = useSearchParams();
    const prevParamsRef = useRef<string>("");

    useEffect(() => {
        const current = searchParams.toString();

        // أول render → ما نعملش scroll
        if (!prevParamsRef.current) {
            prevParamsRef.current = current;
            return;
        }

        // لو الفلاتر اتغيرت
        if (current !== prevParamsRef.current) {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }

        prevParamsRef.current = current;
    }, [searchParams]);
}
