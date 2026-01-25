import { useEffect, useRef, ReactNode } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';

interface ScrollRevealProps {
    children: ReactNode;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'zoom';
    className?: string;
}

export const ScrollReveal = ({
    children,
    delay = 0,
    direction = 'up',
    className = ''
}: ScrollRevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [isInView, controls]);

    const variants: Variants = {
        hidden: {
            opacity: 0,
            y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
            x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
            scale: direction === 'zoom' ? 0.8 : 1,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Stagger children animation
interface ScrollStaggerProps {
    children: ReactNode;
    staggerDelay?: number;
    className?: string;
}

export const ScrollStagger = ({
    children,
    staggerDelay = 0.1,
    className = ''
}: ScrollStaggerProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Parallax effect
interface ParallaxProps {
    children: ReactNode;
    speed?: number;
    className?: string;
}

export const Parallax = ({
    children,
    speed = 0.5,
    className = ''
}: ParallaxProps) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;

            const scrolled = window.scrollY;
            const rate = scrolled * speed;

            ref.current.style.transform = `translateY(${rate}px)`;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
};
