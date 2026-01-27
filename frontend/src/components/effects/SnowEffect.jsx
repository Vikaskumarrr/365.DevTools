import { useEffect, useState } from 'react';

function SnowEffect() {
    const [snowflakes, setSnowflakes] = useState([]);

    useEffect(() => {
        // Generate 50 snowflakes with random properties
        const flakes = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            animationDuration: 5 + Math.random() * 10,
            animationDelay: Math.random() * 5,
            fontSize: 10 + Math.random() * 10,
            opacity: 0.3 + Math.random() * 0.7,
        }));
        setSnowflakes(flakes);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {snowflakes.map((flake) => (
                <div
                    key={flake.id}
                    className="absolute text-white"
                    style={{
                        left: `${flake.left}%`,
                        fontSize: `${flake.fontSize}px`,
                        opacity: flake.opacity,
                        animation: `snowfall ${flake.animationDuration}s linear infinite`,
                        animationDelay: `${flake.animationDelay}s`,
                    }}
                >
                    ❄
                </div>
            ))}
            <style jsx>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
          }
        }
      `}</style>
        </div>
    );
}

export default SnowEffect;
