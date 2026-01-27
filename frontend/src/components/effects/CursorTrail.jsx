import { useEffect, useState } from 'react';

function CursorTrail() {
    const [particles, setParticles] = useState([]);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        let particleId = 0;

        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });

            // Create sparkling particles
            const newParticles = Array.from({ length: 3 }, () => {
                const angle = Math.random() * Math.PI * 2;
                const velocity = 2 + Math.random() * 3;
                const size = 4 + Math.random() * 6;

                return {
                    id: particleId++,
                    x: e.clientX,
                    y: e.clientY,
                    vx: Math.cos(angle) * velocity,
                    vy: Math.sin(angle) * velocity,
                    size,
                    life: 1,
                    color: Math.random() > 0.5 ? '#EF6E76' : '#EF6E76', // Orange variations
                };
            });

            setParticles(prev => [...prev, ...newParticles].slice(-50)); // Keep max 50 particles
        };

        const animateParticles = () => {
            setParticles(prev =>
                prev
                    .map(p => ({
                        ...p,
                        x: p.x + p.vx,
                        y: p.y + p.vy,
                        vy: p.vy + 0.2, // Gravity
                        life: p.life - 0.02,
                        size: p.size * 0.95, // Shrink
                    }))
                    .filter(p => p.life > 0)
            );
        };

        window.addEventListener('mousemove', handleMouseMove);
        const interval = setInterval(animateParticles, 1000 / 60); // 60 FPS

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            {/* Main cursor - glowing orange circle */}
            <div
                className="fixed w-5 h-5 pointer-events-none z-[9999]"
                style={{
                    left: `${mousePos.x}px`,
                    top: `${mousePos.y}px`,
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <div className="w-full h-full bg-primary-500 rounded-full shadow-lg shadow-primary-500/50" />
            </div>

            {/* Outer glow ring */}
            <div
                className="fixed w-10 h-10 pointer-events-none z-[9998] transition-all duration-100"
                style={{
                    left: `${mousePos.x}px`,
                    top: `${mousePos.y}px`,
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <div className="w-full h-full border-2 border-primary-400/30 rounded-full animate-pulse" />
            </div>

            {/* Sparkling particles */}
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="fixed pointer-events-none z-[9997]"
                    style={{
                        left: `${particle.x}px`,
                        top: `${particle.y}px`,
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <div
                        className="rounded-full"
                        style={{
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            backgroundColor: particle.color,
                            opacity: particle.life,
                            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                        }}
                    />
                </div>
            ))}
        </>
    );
}

export default CursorTrail;
