let inc = 0;
var score = 0;
var wObs = 50;
var hObs = 50;
var wPer = 50;
var hPer = 50;
var obstacles= [];
var bam = false;

let rabbit_png;
let carrot_png;

function preload(){

    rabbit_png = loadImage('images/rabbit.png');
    carrot_png = loadImage('images/carrot.png');
}


function setup(){
    createCanvas (800,400);
    // obstacles[0] = new Rectangle(100, height- hObs, wObs, hObs, 5);
    obstacles[0] = new Rectangle(0, height- hObs, wObs, hObs, 3);
    obstacles[1] = new Rectangle(400, height/2- 100, wObs, hObs, 3);
    

    person = new Person(width/2,height - hPer);
    score = createElement("p", "");
    angleMode(DEGREES);
}

function draw(){
    frameRate(60)
    background(51);
    // rect(00,00,50,50);
    var addVel = createVector(0.3,0);
    var gravity = createVector(0, 0.2);
    person.applyForce(gravity);

    person.update();
    person.edges();
    person.show();

    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].update();
        obstacles[i].show();
        // console.log(obstacles[0].vel.x);
    
        if(obstacles[i].pos.x + wObs > width || obstacles[i].pos.x < 0){
            obstacles[i].vel.x *=-1;
            if (obstacles[i].vel.x < 0){ obstacles[i].vel.add(-addVel); } else {obstacles[i].vel.add(addVel);}
        }
    }

    inc++;
    if (inc > 8500) {noLoop(); alert("Wonderful, no fat rabbits anymore :)")}
    
    score.html(" Points: "+ inc);
    
    bam = collision();
    if (bam == true){
        noLoop();
        console.log("collision");
        alert("Game Over, the rabbits have diabetes. \n Please reload to try again");
    }
}


function collision(){
    // obstacle.posy <= person.pos.y

    for (obstacle of obstacles){
        
        // console.log( "1 : " + str(person.pos.x <= obstacle.pos.x + wObs) + " " + person.pos.x + " <= " + (obstacle.pos.x + wObs));
        // console.log( "2 : " + str(person.pos.x + wPer >= obstacle.pos.x) + " " + (person.pos.x + wPer) + " >= " + person.pos.x);
        // console.log( "3 : " + str(person.pos.y <= obstacle.pos.y + hObs) + " " + person.pos.y + " <= " + (obstacle.pos.y + hObs));
        // console.log( "4 : " + str(person.pos.y + hPer >= obstacle.pos.y) + " " + (person.pos.y + hPer) + " >= " + obstacle.pos.y);
        // console.log("person_x " + person.pos.x + " person_y " + person.pos.y);
        // console.log("box_x " + obstacle.pos.x + " box_y " + obstacle.pos.y);

        if (
            person.pos.x <= obstacle.pos.x + wObs && 
            person.pos.x + wPer >= obstacle.pos.x &&
            person.pos.y <= obstacle.pos.y + hObs &&
            person.pos.y + hPer >= obstacle.pos.y
            ) {
            console.log("collision");
            return true;
        }
    }
    return false;
}

function mousePressed(){
    var jump = createVector(0, -6);
    person.applyForce(jump);
}

class Person{
    constructor(x,y){
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
    }

    show(){
        // fill(255,255,255);
        // rect(this.pos.x,this.pos.y, wPer,hPer);
        image(carrot_png, this.pos.x, this.pos.y, wPer, hPer);
    }

    applyForce(force){
        this.acc.add(force);
    }

    update(){
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.set(0, 0);
    }

    edges() {
        // lower boundary
        if (this.pos.y >= height- hPer) {
          this.vel.y *= 0;
          this.pos.y = height- hPer;
        }
        // upper boundary
        if (this.pos.y < 0) {
            this.vel.y *= 0;
            this.pos.y = 0;
          }
        // // right boundary
        // if (this.pos.x + 15 >= width) {
        //     this.vel.x *= -1;
        //     this.pos.x = width-10;
        //   }
        // //   left boundary
        // if (this.pos.x <= 0) {
        //     this.vel.x *= -1;
        //     this.pos.x = 10;
        //   }
    }
}

class Rectangle{
    //constructor
     constructor(x,y,w,h,v) {
       this.pos = createVector(x, y);
       this.w = w; // width to the right
       this.h = h; // hight from y
       this.vel = createVector(v,0); // velocity
        }

        update() {
            this.pos.add(this.vel);
        }
        show() {
            // fill(255, 0, 100);
            // noStroke();
            // rect(this.pos.x,this.pos.y, this.w, this.h);
            image(rabbit_png, this.pos.x, this.pos.y, this.w, this.h);
    }
}