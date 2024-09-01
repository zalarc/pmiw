                                         /*
                                Alarcón Guzmán, Zion
                                      85045/7
                                     Comisión 5
       https://www.youtube.com/playlist?list=PLEujeeY0dIrLEgHrpYtvfjXqQyiKTbBcY
         Una compañera me recomendó poner playlist para poder subir el video
        más tranquilo y que no me pase lo del trabajo anterior que no lo subí
                                por falta del video.
                                         */


let ilusion;
let columnasX = 12; // Cantidad de columnas de cuadrados en X
let filasY = 1;  // Cantidad de filas que van a ocupar en Y

// Posiciones y tamaños y grosores
let posiciones = [
  [595, 195, 9, 2], [589, 189, 21, 2], [581, 181, 37, 3],
  [572, 172, 55, 3], [562, 162, 74, 4], [551, 151, 97, 5],
  [539, 139, 122, 5], [523, 123, 153, 6], [504, 104, 191, 10],
  [481, 81, 236, 10], [453, 53, 292, 13], [420, 20, 359, 13]
];

let posColores = []; // Posiciones iniciales de los colores
let posActuales = []; // Posiciones actuales de los colores
let moverColores = false;
let rectBlanco = true;

function preload() {
  ilusion = loadImage('assets/ilusion.png');
}

function setup() {
  createCanvas(800, 400);
  background(255);
  noLoop(); // Para que se dibuje solo una vez el cambio de colores

  // Inicializar las posiciones de los colores
  for (let i = 0; i < posiciones.length; i++) {
    posColores[i] = [posiciones[i][0], posiciones[i][1]];
    posActuales[i] = [posiciones[i][0], posiciones[i][1]];
  }

  // Calcular y mostrar el área total de los rectángulos solo una vez
  let areaTotal = calcularAreaRectangulos();
  console.log("¿Sabías que el área total de los rectángulos es: " + areaTotal + "?");
}

function draw() {
  noFill();
  background(255);
  image(ilusion, 0, 0);

  // Esto es para que los colores se dibujen detrás de los rectángulos
  for (let i = 0; i < posiciones.length; i++) {
    fill(random(255), random(0), random(255), 100); // Colores aleatorios
    noStroke();
    rect(posActuales[i][0], posActuales[i][1], posiciones[i][2], posiciones[i][2]);
  }

  // Rectángulo blanco (sólo se dibuja al inicio, antes de interactuar y aparece otra vez con la R)
  if (rectBlanco) {
    fill(255);
    noStroke();
    rect(400, 0, 400, 400);
  }

  // Rectángulos negros
  for (let i = 0; i < columnasX; i++) { // Posición horizontal de los rectángulos
    for (let j = 0; j < filasY; j++) { // Posición vertical
      let index = i + j * columnasX;
      if (index < posiciones.length) {
        noFill();
        stroke(0); // Color negro para los rectángulos principales
        strokeWeight(posiciones[index][3]); // Ancho del stroke
        rect(posiciones[index][0], posiciones[index][1], posiciones[index][2], posiciones[index][2]);
      }
    }
  }
}

function mousePressed() {
  if (mouseButton === LEFT) {
    rectBlanco = false;
    redraw();
  }
}

function mouseDragged() {
  if (mouseButton === LEFT) {
    moverColores = true; // Hace que los colores se muevan
    moverColoresFunc(mouseX - pmouseX, mouseY - pmouseY);
  }
}

function mouseReleased() {
  moverColores = false;
}

// Reiniciar superponiendo el rectángulo blanco
function keyPressed() {
  if (key === 'r' || key === 'R') {
    rectBlanco = true;
    redraw();
  }
}

// Función para mover los colores en mouseDragged
function moverColoresFunc(deltaX, deltaY) {
  for (let i = 0; i < posiciones.length; i++) {
    posActuales[i][0] = constrain(posColores[i][0] + deltaX, posColores[i][0] - 10, posColores[i][0] + 10);
    posActuales[i][1] = constrain(posColores[i][1] + deltaY, posColores[i][1] - 10, posColores[i][1] + 10);
  }
  redraw();
}

// Función que calcula el área total de los rectángulos
function calcularAreaRectangulos() {
  let areaTotal = 0;
  for (let i = 0; i < posiciones.length; i++) {
    let area = posiciones[i][2] * posiciones[i][2];
    areaTotal += area;
  }
  return areaTotal;
}
