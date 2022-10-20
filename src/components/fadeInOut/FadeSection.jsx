import React, {useState, useRef, useEffect} from 'react';
import './style.css';

export default function FadeInSection(props) {
    const [isVisible, setVisible] = useState(true);
    const domRef = useRef();

    useEffect(() => {
        const currentRef = domRef.current;
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const toSetInvisible = !entry.isIntersecting && entry.boundingClientRect.top > 0;
                setVisible(!toSetInvisible);
            });
        });
        observer.observe(currentRef);


        return () => {
            if (currentRef) {
                return observer.unobserve(currentRef);
            }
        }
    }, []);

    return (
        <div ref={domRef} className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}>
            {props.children}
        </div>
    )
}
