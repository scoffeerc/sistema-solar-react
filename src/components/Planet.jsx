import { useMemo } from 'react';
import './Planet.css';

function Planet({ 
  planet, 
  orbitRadius, 
  isSelected, 
  hasSelection,
  onClick,
  index 
}) {
  // Calculate planet size based on real relative sizes (simplified)
  const planetSizes = {
    Mercury: 20,
    Venus: 28,
    Earth: 30,
    Mars: 24,
    Jupiter: 55,
    Saturn: 50,
    Uranus: 38,
    Neptune: 36
  };

  const size = planetSizes[planet.name] || 30;

  // Each planet has its own orbital speed based on velocity
  const orbitalPeriod = useMemo(() => {
    return 100 - parseInt(planet.velocity) + 20;
  }, [planet.velocity]);

  // Calculate starting angle based on index for initial spread
  const startAngle = index * 45;

  return (
    <div 
      className={`planet-orbit ${isSelected ? 'selected' : ''} ${hasSelection && !isSelected ? 'dimmed' : ''}`}
      style={{
        '--orbit-radius': `${orbitRadius}px`,
        '--planet-size': `${size}px`,
        '--orbital-period': `${orbitalPeriod}s`,
        '--start-angle': `${startAngle}deg`,
      }}
    >
      <div 
        className={`planet-wrapper`}
        onClick={onClick}
      >
        <img 
          src={planet.image} 
          alt={planet.name}
          className="planet-image"
          draggable="false"
        />
        <span className="planet-name">{planet.name}</span>
        {planet.name === 'Saturn' && <div className="saturn-ring"></div>}
      </div>
    </div>
  );
}

export default Planet;
