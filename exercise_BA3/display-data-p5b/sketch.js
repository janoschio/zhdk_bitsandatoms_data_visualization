console.log("Loading data...");

let table;

const canvasWidth = window.innerWidth;
const canvasHeight = 1300; // ⚠️ size limit if too long
const xPosAxis1 = 200; // px
const xPosAxis2 = 200; // px
const yPosAxis1 = 20; // px

// https://p5js.org/reference/#/p5/loadTable

function preload() {
  table = loadTable("future_cities_data_truncated.csv", "csv", "header");
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background(21, 26, 30);

  const barMargin = 10;
  const barHeight = 30;

  // count the columns
  print(table.getRowCount() + " total rows in table");
  print(table.getColumnCount() + " total columns in table");
  print("All cities:", table.getColumn("current_city"));

  for (let i = 0; i < table.getRowCount(); i++) {
    const city = table.get(i, "current_city");
    const meanTemp = parseFloat(table.get(i, "Annual_Mean_Temperature"));
    const futureMeanTemp = parseFloat(
      table.get(i, "future_Annual_Mean_Temperature")
    );

    position = i * 100 + 100;
    durchmesser = convertDegreesToDurchmesser(meanTemp);
    durchmesser2 = convertDegreesToDurchmesser(futureMeanTemp);

    futurePosition = i * 100 + 100;

    drawLabelCity(position, city, meanTemp);

    drawTempFuture(futurePosition);
    drawLabelFuture(futurePosition, city, futureMeanTemp.toFixed(2));

    drawTempToday(position);
    drawLabelToday(position, city, meanTemp.toFixed(2));
  }
}

function convertDegreesToDurchmesser(temp) {
  const durchmesser = map(temp, 0, 30, 10, 160);
  return durchmesser;
}

function convertDegreesToDurchmesser2(temp) {
  const durchmesser2 = map(temp, 0, 30, 10, 160);
  return durchmesser2;
}

// the two temp drawing functions could also be combined into a single function
// adding the x-position as a new parameter. For simplicity we have two functions

function drawTempToday(pos) {
  fill(55, 200, 205);
  circle(xPosAxis1, pos, durchmesser);
}

function drawTempFuture(pos) {
  fill(47, 116, 121);
  noStroke();
  circle(xPosAxis2, pos, durchmesser2);
}

function drawLabelCity(pos, city, temp) {
  fill(55, 200, 205);
  noStroke();
  const label = `${city}:`;
  text(label, xPosAxis1 + 100, pos + 5);
}

function drawLabelToday(pos, city, temp) {
  fill(55, 200, 205);
  noStroke();
  const label = `${temp}°C`;
  text(label, xPosAxis1 + 180, pos + 5);
}

function drawLabelFuture(pos, city, temp) {
  fill(47, 116, 121);
  const label = `${temp}°C`;
  text(label, xPosAxis2 + 240, pos + 5);
}
