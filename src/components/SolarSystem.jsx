import { useState, useEffect, useRef } from 'react';
import planetsData from '../data/planets.json';
import Planet from './Planet';
import PlanetInfo from './PlanetInfo';
import './SolarSystem.css';

function SolarSystem() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(null);

  // Filter out the Sun and get only planets
  const sun = planetsData.find(p => p.name === 'Sun');
  const planets = planetsData.filter(p => p.name !== 'Sun');

  // Animation loop for rotation
  useEffect(() => {
    const animate = (currentTime) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = currentTime;
      }
      
      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      if (!isPaused) {
        setRotationAngle(prev => (prev + deltaTime * 0.01) % 360);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  const handlePlanetClick = (planet) => {
    if (selectedPlanet?.name === planet.name) {
      // Deselect if clicking the same planet
      setSelectedPlanet(null);
      setIsPaused(false);
    } else {
      setSelectedPlanet(planet);
      setIsPaused(true);
    }
  };

  const handleCloseInfo = () => {
    setSelectedPlanet(null);
    setIsPaused(false);
  };

  // Calculate orbit radii based on screen size
  const getOrbitRadius = (index) => {
    const baseRadius = 60;
    const increment = 38;
    return baseRadius + (index * increment);
  };

  return (
    <div className="solar-system-container">
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
      
      <div className="solar-system">
        <div 
          className={`orbits-container ${isPaused ? 'paused' : ''}`}
          style={{ transform: `rotate(${rotationAngle}deg)` }}
        >
          {/* Sun at center */}
          <div className="sun-container">
            <img 
              src={sun.image} 
              alt="Sun" 
              className={`sun ${selectedPlanet && selectedPlanet.name !== 'Sun' ? 'dimmed' : ''}`}
              onClick={() => handlePlanetClick(sun)}
            />
            <div className="sun-glow"></div>
          </div>

          {/* Orbit paths */}
          {planets.map((planet, index) => (
            <div 
              key={`orbit-${planet.name}`}
              className="orbit-path"
              style={{ 
                width: `${getOrbitRadius(index) * 2}px`,
                height: `${getOrbitRadius(index) * 2}px`,
              }}
            />
          ))}

          {/* Planets */}
          {planets.map((planet, index) => (
            <Planet
              key={planet.name}
              planet={planet}
              orbitRadius={getOrbitRadius(index)}
              isSelected={selectedPlanet?.name === planet.name}
              hasSelection={selectedPlanet !== null}
              onClick={() => handlePlanetClick(planet)}
              rotationAngle={rotationAngle}
              isPaused={isPaused}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Planet Info Panel */}
      {selectedPlanet && (
        <PlanetInfo planet={selectedPlanet} onClose={handleCloseInfo} />
      )}

      {/* Instructions */}
      <div className={`instructions ${selectedPlanet ? 'hidden' : ''}`}>
        <p>Haz click en cualquier planeta para explorar</p>
      </div>
    </div>
  );
}

export default SolarSystem;
