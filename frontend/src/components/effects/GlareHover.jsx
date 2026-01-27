import { useState, useRef } from 'react';

function GlareHover({
    children,
    glareColor = '#ffffff',
    glareOpacity = 0.3,
    glareAngle = -30,
    glareSize = 300,
    transitionDuration = 800,
    playOnce = false,
}) {
    const [glareStyle, setGlareStyle] = useState({});
    const [hasPlayed, setHasPlayed] = useState(false);
    const containerRef = useRef(null);

    const handleMouseMove = (e) => {
        if (playOnce && hasPlayed) return;

        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setGlareStyle({
            background: `radial-gradient(circle ${glareSize}px at ${x}px ${y}px, ${glareColor}, transparent)`,
            opacity: glareOpacity,
            transform: `rotate(${glareAngle}deg)`,
        });
    };

    const handleMouseEnter = () => {
        if (playOnce && !hasPlayed) {
            setHasPlayed(true);
        }
    };

    const handleMouseLeave = () => {
        setGlareStyle({});
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
            }}
        >
            {/* Glare overlay */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    pointerEvents: 'none',
                    transition: `opacity ${transitionDuration}ms ease-out`,
                    ...glareStyle,
                }}
            />

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                {children}
            </div>
        </div>
    );
}

export default GlareHover;
