async function readJson(path) {
  const response = await fetch(path);
  const data = await response.json();
  return data;
}

async function init() {
  // json file generated with https://csvjson.com/csv2json
  const data = await readJson('future_cities_data.json');
  let sourceData = data.map((d) => {
    return {
      cityName: d['current_city'],
      annualMeanTemperature: d['Annual_Mean_Temperature'],
      annualMeanTemperatureFuture: d['future_Annual_Mean_Temperature'],
    };
  });

  console.log('sourceData: ', sourceData);

  const Xdisplacement = 40; //x achseverscheiben
  const circlesXcoordinate = 10; // displacement
  const circlesYcoordinate = 80;
  const dataValueScaling = 2; //kreis mal 4 für vergrösssern
  const hoehe = 200;

  // Create canvas hintergrund
  const svg = d3 // Variable linking to D3 library
    .select('#d3') // Selects ID from html file
    .append('svg') // Creates svg
    .attr("width", 1400) // Width of svg
    .attr("height", 400) // Height of svg
    .style("background-color", '#1c64ff');

  // enters data into function 
  const circlesAnnual = svg.selectAll('circlesAnnual').data(sourceData).enter();
  const circlesFuture = svg.selectAll('circlesFuture').data(sourceData).enter();
  const textLabel = svg.selectAll('textLabel').data(sourceData).enter();
  const viereckAnnual = svg.selectAll('viereckAnnual').data(sourceData).enter();
  allnumber = 0;
  // Creates circles for future annual mean temperature
  
  viereckAnnual.append('rect')
  .attr('id', 'colorSecondary')
  .attr('x', (value, index) => {
    //allnumber += value.annualMeanTemperature * dataValueScaling
    //return index * Xdisplacement + Xdisplacement;
    return index * Xdisplacement + circlesXcoordinate;
  })
  .attr('y', circlesYcoordinate)
  .attr('width', (value) => {
    return value.annualMeanTemperature * dataValueScaling;
  })
  .attr('height',300)
  .attr('stroke', 'black')
  .attr('fill', '#69a3b2');

  viereckAnnual.append('rect')
  .attr('id', 'colorMain')
  .attr('x', (value, index) => {
    return index * Xdisplacement + circlesXcoordinate;
  })
  .attr('y', circlesYcoordinate)
  .attr('width', (value, index) => {
    return value.annualMeanTemperatureFuture * dataValueScaling;
  })
  .attr('height',100)
  .attr('stroke', 'black')
  .attr('fill', '#69a3b2');
  


  circlesAnnual
    .append('circle')
    .attr('cx', (value, index) => {
      return index * Xdisplacement + circlesXcoordinate;
    })
    .attr('cy', circlesYcoordinate)
    .attr('r', (value, index) => {
      return value.annualMeanTemperatureFuture * dataValueScaling;
    })
    .attr('id', 'colorSecondary');

  // Creates circles for annual mean temperature
  circlesFuture
    .append('circle')
    .attr('cx', (value, index) => {
      return index * Xdisplacement + circlesXcoordinate;
    })
    .attr('cy', circlesYcoordinate)
    .attr('r', (value, index) => {
      return value.annualMeanTemperature * dataValueScaling;
    })
    .attr('id', 'colorMain');

  // Create text labels
  textLabel
    .append('text')
    .attr('x', (value, index) => {
      return index * Xdisplacement;
    })
    .attr('y', 320)
    .attr('id', 'textColorMain')
    .text((value, index) => {
      return value.cityName;
    })

    textLabel
    .append('text')
    .attr('x', (value, index) => {
      return index * Xdisplacement;
    })
    .attr('y', 400)
    .attr('id', 'textColorMain')
    .text((value, index) => {
      return value.annualMeanTemperatureFuture;
    })
    

}

init();