import { motion } from 'framer-motion';
import { useMemo } from 'react';

function BlurText({
    text,
    delay = 900,
    animateBy = 'words', // 'words' or 'characters'
    direction = 'top', // 'top', 'bottom', 'left', 'right'
    onAnimationComplete,
    className = '',
}) {
    const directionOffset = {
        top: { y: -20 },
        bottom: { y: 20 },
        left: { x: -20 },
        right: { x: 20 },
    };

    const elements = useMemo(() => {
        if (animateBy === 'words') {
            return text.split(' ');
        }
        return text.split('');
    }, [text, animateBy]);

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: delay / 1000,
            },
        },
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            filter: 'blur(10px)',
            ...directionOffset[direction],
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            x: 0,
            transition: {
                duration: 0.4,
            },
        },
    };

    return (
        <motion.div
            className={className}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onAnimationComplete={onAnimationComplete}
        >
            {elements.map((element, index) => (
                <motion.span
                    key={index}
                    variants={itemVariants}
                    style={{ display: 'inline-block' }}
                >
                    {element}
                    {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
                </motion.span>
            ))}
        </motion.div>
    );
}

export default BlurText;
