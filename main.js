const canvas = document.getElementById("carCanvas");
canvas.width = 200;

const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;

const carCtx = canvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");


const road = new Road(canvas.width / 2, canvas.width * .9);
// const car =new CarModel(road.getLaneCenter(1),100,30,50, "AUTONOMOUS");
// const car =new CarModel(road.getLaneCenter(1),100,30,50, "MANUAL");


const N = 1000;
const cars = generateCars(N);
let bestCar = cars[0];
if (localStorage.getItem("bestBrain")) {
    for (let i = 0; i < cars.length; i++) {
        cars[i].brain = JSON.parse(
            localStorage.getItem("bestBrain"));
        if (i != 0) {
            NeuralNetwork.mutate(cars[i].brain, 0.025);
        }
    }
}

const traffic = [
    new CarModel(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2),
    new CarModel(road.getLaneCenter(0), -300, 30, 50, "DUMMY", 2),
    new CarModel(road.getLaneCenter(2), -300, 30, 50, "DUMMY", 2),
    new CarModel(road.getLaneCenter(0), -500, 30, 50, "DUMMY", 2),
    new CarModel(road.getLaneCenter(1), -500, 30, 50, "DUMMY", 2),
    new CarModel(road.getLaneCenter(1), -700, 30, 50, "DUMMY", 2),
    new CarModel(road.getLaneCenter(2), -700, 30, 50, "DUMMY", 2),
];

// car.drawCar(ctx);

simulatorLoop(10);

function save() {
    console.log("saved")
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));
}

function discard() {
    localStorage.removeItem("bestBrain");
}

function generateCars(N) {
    const cars = [];
    for (let i = 1; i <= N; i++) {
        cars.push(new CarModel(road.getLaneCenter(1), 100, 30, 50, "AUTONOMOUS"));
    }
    return cars;
}

function simulatorLoop(time) {

    for (let i = 0; i < traffic.length; i++) {
        traffic[i].updateCarState(road.borders, []);
    }
    for (let i = 0; i < cars.length; i++) {
        cars[i].updateCarState(road.borders, traffic);
    }
    bestCar = cars.find(
        c => c.y == Math.min(
            ...cars.map(c => c.y)
        ));

    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    carCtx.save();
    carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7);

    road.draw(carCtx);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].drawCar(carCtx, "red");
    }
    carCtx.globalAlpha = 0.2;
    for (let i = 0; i < cars.length; i++) {
        cars[i].drawCar(carCtx, "blue");
    }
    carCtx.globalAlpha = 1;
    bestCar.drawCar(carCtx, "blue", true);

    carCtx.restore();

    networkCtx.lineDashOffset = -time / 50;
    Visualizer.drawNetwork(networkCtx, bestCar.brain);
    requestAnimationFrame(simulatorLoop);

}