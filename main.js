const canvas = document.getElementById("visualization");
canvas.width = 200;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width/2,canvas.width*.9);
const car =new CarModel(road.getLaneCenter(1),100,30,50);

// car.drawCar(ctx);

simulatorLoop();


function simulatorLoop(){
    car.updateCarState(road.borders);
    canvas.height = window.innerHeight;
    
    ctx.save();
    ctx.translate(0,-car.y+canvas.height*0.7);

    road.draw(ctx);
    car.drawCar(ctx);

    ctx.restore();
    requestAnimationFrame(simulatorLoop);

 }