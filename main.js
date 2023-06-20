const canvas = document.getElementById("visualization");
canvas.width = 200;

const ctx = canvas.getContext("2d");
const car = new CarModel(100,100,30,50);
car.drawCar(ctx);

simulatorLoop();


function simulatorLoop(){
    car.updateCarState();
    canvas.height = window.innerHeight;
    car.drawCar(ctx);
    requestAnimationFrame(simulatorLoop);

 }