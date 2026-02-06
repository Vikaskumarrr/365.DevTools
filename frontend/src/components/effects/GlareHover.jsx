import { useState, useRef } from 'react';

function GlareHover({
    children,
    glareColor = '#ffffff',
    glareOpacity = 0.3,
    glareSize = 300,
    transitionDuration = 800,
    playOnce = false,
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [hasPlayed, setHasPlayed] = useState(false);
    const containerRef = useRef(null);

    const handleMouseMove = (e) => {
        if (playOnce && hasPlayed) return;

        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setMousePosition({ x, y });
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (playOnce && !hasPlayed) {
            setHasPlayed(true);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                position: 'relative',
                cursor: 'pointer',
            }}
        >
            {/* Content */}
            {children}

            {/* Subtle gradient overlay that follows mouse */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    pointerEvents: 'none',
                    borderRadius: 'inherit',
                    opacity: isHovered ? glareOpacity : 0,
                    background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${glareColor}40 0%, transparent 50%)`,
                    transition: `opacity ${transitionDuration}ms ease-out`,
                    zIndex: 10,
                }}
            />
        </div>
    );
}

export default GlareHover;
