const canvas = document.getElementById("visualization");
canvas.width = 200;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width/2,canvas.width*.9);
const car =new CarModel(road.getLaneCenter(1),100,30,50, "KEYS");

const traffic=[
    new CarModel(road.getLaneCenter(1),-100,30,50,"DUMMY",2)
];

// car.drawCar(ctx);

simulatorLoop();


function simulatorLoop(){

    for(let i=0;i<traffic.length;i++){
        traffic[i].updateCarState(road.borders,[]);
    }

    car.updateCarState(road.borders, traffic);
    canvas.height = window.innerHeight;
    
    ctx.save();
    ctx.translate(0,-car.y+canvas.height*0.7);

    road.draw(ctx);
    for(let i=0;i<traffic.length;i++){
        traffic[i].drawCar(ctx,"red");
    }
    car.drawCar(ctx);

    ctx.restore();
    requestAnimationFrame(simulatorLoop);

 }