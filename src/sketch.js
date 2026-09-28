const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

const GROUND_Y = 430;

const RAIN_DROP_COUNT = 120;
const MIN_RAIN_SPEED = 1;
const MAX_RAIN_SPEED = 12;
const RAIN_SPEED_STEP = 1;

const MIN_WIND_SPEED = -3;
const MAX_WIND_SPEED = 3;
const WIND_STEP = 1;

const LIGHTNING_DURATION = 12;

const CAR_SPEED = 2;
const CAR_WIDTH = 120;

const DEFAULT_RAIN_SPEED = 5;
const DEFAULT_WIND_SPEED = 1;

const FIRST_CAR_START_X = 150;
const SECOND_CAR_START_X = 550;

let raindrops = [];

let rainSpeed = DEFAULT_RAIN_SPEED;
let windSpeed = DEFAULT_WIND_SPEED;

let lightningActive = false;
let lightningTimer = 0;

let firstCarX = FIRST_CAR_START_X;
let secondCarX = SECOND_CAR_START_X;


function setup() {
    const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas.parent("game-container");

    resetRain();
}


function draw() {
    drawSky();
    drawMoon();
    drawBuildings();
    drawStreet();

    updateRain();
    drawRain();

    updateCars();
    drawCars();

    updateLightning();

    if (lightningActive) {
        drawLightning();
    }
}


function drawSky() {
    background("#101827");
}


function drawMoon() {
    fill("#e8edf5");
    noStroke();

    circle(680, 90, 70);
}


function drawBuildings() {
    drawBuilding(80, 300, 120, 130);
    drawBuilding(250, 250, 130, 180);
    drawBuilding(450, 330, 110, 100);
    drawBuilding(620, 220, 120, 210);
}


function drawBuilding(x, y, buildingWidth, buildingHeight) {
    fill("#26364d");
    noStroke();

    rect(x, y, buildingWidth, buildingHeight);

    fill("#f5d67a");

    for (
        let windowX = x + 20;
        windowX < x + buildingWidth - 15;
        windowX += 30
    ) {
        for (
            let windowY = y + 25;
            windowY < y + buildingHeight - 15;
            windowY += 35
        ) {
            rect(windowX, windowY, 12, 18);
        }
    }
}


function drawStreet() {
    fill("#151a22");
    noStroke();

    rect(
        0,
        GROUND_Y,
        CANVAS_WIDTH,
        CANVAS_HEIGHT - GROUND_Y
    );
}


function createRaindrop(x, y) {
    return {
        x: x,
        y: y,
        speed: random(9, 9),
        length: random(10, 20)
    };
}


function resetRain() {
    raindrops = [];

    for (let i = 0; i < RAIN_DROP_COUNT; i++) {
        const x = random(CANVAS_WIDTH);
        const y = random(CANVAS_HEIGHT);

        raindrops.push(createRaindrop(x, y));
    }
}


function updateRain() {
    for (const drop of raindrops) {
        drop.x += windSpeed;
        drop.y += drop.speed * rainSpeed / DEFAULT_RAIN_SPEED;

        if (drop.y > CANVAS_HEIGHT) {
            drop.y = -drop.length;
            drop.x = random(CANVAS_WIDTH);
        }

        if (drop.x > CANVAS_WIDTH) {
            drop.x = 0;
        }

        if (drop.x < 0) {
            drop.x = CANVAS_WIDTH;
        }
    }
}


function drawRain() {
    stroke("#8fb7d9");
    strokeWeight(1);

    for (const drop of raindrops) {
        line(
            drop.x,
            drop.y,
            drop.x + windSpeed,
            drop.y + drop.length
        );
    }
}


function updateCars() {
    firstCarX += CAR_SPEED;
    secondCarX -= CAR_SPEED;

    if (firstCarX > CANVAS_WIDTH) {
        firstCarX = -CAR_WIDTH;
    }

    if (secondCarX < -CAR_WIDTH) {
        secondCarX = CANVAS_WIDTH;
    }
}


function drawCars() {
    drawCar(firstCarX, 500);
    drawCar(secondCarX, 560);
}


function drawCar(x, y) {
    fill("#31445c");
    stroke("#9eafc2");
    strokeWeight(2);

    rect(x, y, 100, 30);
    rect(x + 20, y - 20, 60, 20);

    fill("#111820");

    circle(x + 20, y + 30, 20);
    circle(x + 80, y + 30, 20);
}


function mousePressed() {
    lightningActive = true;
    lightningTimer = LIGHTNING_DURATION;
}


function updateLightning() {
    if (lightningActive) {
        lightningTimer--;

        if (lightningTimer <= 0) {
            lightningActive = false;
        }
    }
}


function drawLightning() {
    stroke("#ffffff");
    strokeWeight(5);

    line(650, 0, 620, 100);
    line(620, 100, 670, 100);
    line(670, 100, 610, 220);

    strokeWeight(1);
}


function keyPressed() {
    if (key === "w" || key === "W") {
        rainSpeed += RAIN_SPEED_STEP;
    }

    if (key === "s" || key === "S") {
        rainSpeed -= RAIN_SPEED_STEP;
    }

    if (key === "r" || key === "R") {
        resetScene();
    }

    rainSpeed = constrain(
        rainSpeed,
        MIN_RAIN_SPEED,
        MAX_RAIN_SPEED
    );

    windSpeed = constrain(
        windSpeed,
        MIN_WIND_SPEED,
        MAX_WIND_SPEED
    );
}


function resetScene() {
    rainSpeed = DEFAULT_RAIN_SPEED;
    windSpeed = DEFAULT_WIND_SPEED;

    lightningActive = false;
    lightningTimer = 0;

    firstCarX = FIRST_CAR_START_X;
    secondCarX = SECOND_CAR_START_X;

    resetRain();
}