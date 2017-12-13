import React from 'react';

const PlanetTemplate = ({value, onClick}) => (

    <a className="planet-link" onClick={(e) => onClick(value)}>
        Show Planet info
    </a>

);

PlanetTemplate.defaultProps = {
    onClick: function(){},
};

export default PlanetTemplate;