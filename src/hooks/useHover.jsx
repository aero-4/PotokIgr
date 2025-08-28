import { useState, useEffect, useCallback } from 'react';

export default function useHover() {
    const [hovered, setHovered] = useState(false);
    const [node, setNode] = useState(null);

    // Callback ref setter
    const ref = useCallback(
        element => {
            setNode(element);
        },
        []
    );

    useEffect(() => {
        if (!node) return;

        const onEnter = () => setHovered(true);
        const onLeave = () => setHovered(false);

        node.addEventListener('mouseenter', onEnter);
        node.addEventListener('mouseleave', onLeave);

        return () => {
            node.removeEventListener('mouseenter', onEnter);
            node.removeEventListener('mouseleave', onLeave);
        };
    }, [node]);

    return [ref, hovered];
}
