import { useEffect, useState, useRef } from "react";

export const useIntersectionObserver = ({
    threshold = 0,
    root = null,
    rootMargin = "0%",
}) => {
    const [entry, setEntry] = useState();
    const [node, setNode] = useState(null);
    const observer = useRef(null);

    useEffect(() => {
        if (observer.current) {
            observer?.current?.disconnect();
        }

        if (node) {
            if (window.IntersectionObserver) {
                observer.current = new window.IntersectionObserver(
                    ([newEntry]) => setEntry(newEntry),
                    {
                        root,
                        rootMargin,
                        threshold,
                    }
                );

                observer.current.observe(node);
            }
        }

        return () => {
            if (observer?.current) {
                observer?.current?.disconnect();
            }
        };
    }, [threshold, root, rootMargin, node]);

    return { setNode, entry };
};
