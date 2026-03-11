import './PlanetInfo.css';

function PlanetInfo({ planet, onClose }) {
  return (
    <div className="planet-info-overlay" onClick={onClose}>
      <div className="planet-info-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose} aria-label="Cerrar">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <div className="planet-info-header">
          <div className="planet-info-image-container">
            <img src={planet.image} alt={planet.name} className="planet-info-image" />
            <div className="planet-info-glow" style={{ '--planet-color': getPlanetColor(planet.name) }}></div>
          </div>
          <h2 className="planet-info-name">{planet.name}</h2>
        </div>

        <div className="planet-info-stats">
          <div className="stat-item">
            <span className="stat-label">Posicion</span>
            <span className="stat-value">
              {planet.name === 'Sun' ? 'Centro' : `${planet.position}${getOrdinalSuffix(planet.position)}`}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Velocidad</span>
            <span className="stat-value">{planet.velocity} km/s</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Distancia al Sol</span>
            <span className="stat-value">
              {planet.distance === "0" ? '---' : `${planet.distance}M km`}
            </span>
          </div>
        </div>

        <div className="planet-info-description">
          <p>{planet.description}</p>
        </div>
      </div>
    </div>
  );
}

function getOrdinalSuffix(position) {
  const num = parseInt(position);
  if (num === 1) return 'st';
  if (num === 2) return 'nd';
  if (num === 3) return 'rd';
  return 'th';
}

function getPlanetColor(name) {
  const colors = {
    Sun: '#FFD700',
    Mercury: '#B5B5B5',
    Venus: '#E6C87A',
    Earth: '#6B93D6',
    Mars: '#C1440E',
    Jupiter: '#D8CA9D',
    Saturn: '#F4D59E',
    Uranus: '#B5E3E3',
    Neptune: '#5B7FFF'
  };
  return colors[name] || '#ffffff';
}

export default PlanetInfo;
