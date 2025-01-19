const generateMockCoordinates = async (startLat, startLon, endLat, endLon) => {
  const mockDataResponse = await fetch(
    `https://graphhopper.com/api/1/route?point=${startLat},${startLon}&point=${endLat},${endLon}&profile=car&locale=en&calc_points=true&key=c4f4d9e1-c998-4a6f-a54f-eb75dfe1371c&instructions=false&points_encoded=false`
  );
  const mockData = await mockDataResponse.json();
  const coordinates = mockData.paths[0].points.coordinates;

  return coordinates

}

module.exports = generateMockCoordinates;
