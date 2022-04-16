import { useTransition } from "react-spring"

export function Transition1 (isVisible) {
    const transition = useTransition(isVisible, {
        from: { x: 1600, opacity: 0},
        enter: { x: 0, opacity: 1}
    })

    return transition
}

export function Transition2 (isVisible) {
    const transition = useTransition(isVisible, {
        from: { x: -1700, opacity: 0},
        enter: { x: 0, opacity: 1}
    })

    return transition
}

export function Transition3 (isVisible) {
    const transition = useTransition(isVisible, {
        from: { y: 1000, opacity: 0},
        enter: { y: 0, opacity: 1}
    })

    return transition
}


