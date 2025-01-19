const generateMockCoordinates = (start, end, steps) => {
    const coordinates = [];
  
    const latStep = (end.latitude - start.latitude) / steps;
    const lonStep = (end.longitude - start.longitude) / steps;
  
    for (let i = 0; i <= steps; i++) {
      coordinates.push({
        latitude: start.latitude + latStep * i,
        longitude: start.longitude + lonStep * i,
      });
    }
  
    return coordinates;
  };
  
  // Example usage
module.exports = generateMockCoordinates
  