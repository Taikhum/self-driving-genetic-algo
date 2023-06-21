const canvas = document.getElementById("carCanvas");
canvas.width = 200;

const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width=300;

const carCtx  = canvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");


const road = new Road(canvas.width/2,canvas.width*.9);
const car =new CarModel(road.getLaneCenter(1),100,30,50, "AUTONOMOUS");
// const car =new CarModel(road.getLaneCenter(1),100,30,50, "MANUAL");

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
    networkCanvas.height=window.innerHeight;

    carCtx .save();
    carCtx .translate(0,-car.y+canvas.height*0.7);

    road.draw(carCtx );
    for(let i=0;i<traffic.length;i++){
        traffic[i].drawCar(carCtx ,"red");
    }
    car.drawCar(carCtx , "blue");

    carCtx .restore();
    requestAnimationFrame(simulatorLoop);

 }