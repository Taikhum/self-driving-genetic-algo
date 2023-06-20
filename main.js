const canvas = document.getElementById("visualization");
canvas.width = 200;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width/2,canvas.width*.9);
const car = new CarModel(100,100,30,50);
car.drawCar(ctx);

simulatorLoop();


function simulatorLoop(){
    car.updateCarState();
    canvas.height = window.innerHeight;
    road.draw(ctx);
    car.drawCar(ctx);
    requestAnimationFrame(simulatorLoop);

 }