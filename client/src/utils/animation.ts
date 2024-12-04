import {RefObject} from "react";

export default function animation(target: RefObject<HTMLDivElement>,
                                  transform: boolean = false,
                                  transition: number = 1,
                                  delay: number = 0,
                                  repeat: boolean = false,
                                  threshold: number = 0.2) {
    let observer: IntersectionObserver;
    if (!target?.current) {
        return null
    }
    const currentTarget = target.current!
    currentTarget.style.transition = `all ${transition}s`
    currentTarget.style.transitionDelay = `${delay}s`;
    currentTarget.style.alignContent = `right`;

    observer = new IntersectionObserver(
        ([e]) => {
            if (currentTarget === e.target as HTMLElement) {
                if (e.isIntersecting) {
                    currentTarget.style.opacity = "1";
                    currentTarget.style.transform = transform ? "translate3d(-50%, -50%, 0)" : "translate3d(0, 0, 0)";
                } else if (repeat) {
                    currentTarget.style.opacity = "0";
                    currentTarget.style.transform = transform ? "translate3d(-50%, 100%, 0)" : "translate3d(0, 100%, 0)";
                }
            }
        },
        {threshold: threshold}
    );
    observer.observe(target.current as Element);
}