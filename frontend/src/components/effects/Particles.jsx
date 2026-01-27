import { useEffect, useRef } from 'react';

function Particles({
    particleColors = ['#ffffff'],
    particleCount = 200,
    particleSpread = 10,
    speed = 0.1,
    particleBaseSize = 100,
    moveParticlesOnHover = true,
    alphaParticles = false,
    disableRotation = false,
    pixelRatio = 1,
}) {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio * pixelRatio || 1;

        // Set canvas size
        const resizeCanvas = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Initialize particles
        const initParticles = () => {
            particlesRef.current = [];
            for (let i = 0; i < particleCount; i++) {
                particlesRef.current.push({
                    x: Math.random() * canvas.width / dpr,
                    y: Math.random() * canvas.height / dpr,
                    vx: (Math.random() - 0.5) * speed,
                    vy: (Math.random() - 0.5) * speed,
                    size: Math.random() * particleSpread + 1,
                    color: particleColors[Math.floor(Math.random() * particleColors.length)],
                    alpha: alphaParticles ? Math.random() : 1,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.02,
                });
            }
        };

        initParticles();

        // Mouse move handler
        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        };

        if (moveParticlesOnHover) {
            canvas.addEventListener('mousemove', handleMouseMove);
        }

        // Animation loop
        let animationId;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((particle) => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Mouse interaction
                if (moveParticlesOnHover) {
                    const dx = mouseRef.current.x - particle.x;
                    const dy = mouseRef.current.y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const maxDistance = 100;

                    if (distance < maxDistance) {
                        const force = (maxDistance - distance) / maxDistance;
                        particle.vx -= (dx / distance) * force * 0.1;
                        particle.vy -= (dy / distance) * force * 0.1;
                    }
                }

                // Boundary check
                if (particle.x < 0 || particle.x > canvas.width / dpr) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height / dpr) particle.vy *= -1;

                // Update rotation
                if (!disableRotation) {
                    particle.rotation += particle.rotationSpeed;
                }

                // Draw particle
                ctx.save();
                ctx.globalAlpha = particle.alpha;
                ctx.fillStyle = particle.color;
                ctx.translate(particle.x, particle.y);
                if (!disableRotation) {
                    ctx.rotate(particle.rotation);
                }
                ctx.fillRect(
                    -particle.size / 2,
                    -particle.size / 2,
                    particle.size,
                    particle.size
                );
                ctx.restore();
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (moveParticlesOnHover) {
                canvas.removeEventListener('mousemove', handleMouseMove);
            }
            cancelAnimationFrame(animationId);
        };
    }, [
        particleColors,
        particleCount,
        particleSpread,
        speed,
        particleBaseSize,
        moveParticlesOnHover,
        alphaParticles,
        disableRotation,
        pixelRatio,
    ]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: moveParticlesOnHover ? 'auto' : 'none',
            }}
        />
    );
}

export default Particles;
