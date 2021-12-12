let ctx, ctv;

let lrPs = [[[70, 450], [420, 450],[250, 340]],
            [[100, 350], [390, 350], [250, 240]],
            [[150, 250], [330, 250], [250, 120]]];

let lastColor = "";

// let lr2 = [[100, 350], [390, 350], [250, 240]];
// let lr3 = [[150, 250], [330, 250], [250, 120]];

let ballArr = []
let flakeArr = []

const colorArr = ["yellow", "red", "cyan", "purple"]

window.onload = load;

function load() {
    ctx = document.getElementById("cnv").getContext("2d")
    ctv = document.getElementById("snowCnv").getContext("2d")
}

function snow() {
    for (let i = 0; i < 50; i++) {
        flakeArr[i] = ({
            X: Math.random()* 500,
            Y: Math.random()* 500,
            R: Math.random()* 5 + 2});
    }
    setInterval(drawSnowflake, 10)
}

function genBalls() {
    ctx.beginPath();
//адаптировано из https://stackoverflow.com/questions/47410054/generate-random-locations-within-a-triangular-domain
//под js
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 10; i++) {
            let x = Math.random()
            let y = Math.random()
            let q = Math.abs(x - y)
            let s = q
            let t = 0.5*(x+y-q)
            let u = 1 - 0.5*(q+x+y)
            let xP = s * lrPs[j][0][0] + t * lrPs[j][1][0] + u * lrPs[j][2][0]
            let yP = s * lrPs[j][0][1] + t * lrPs[j][1][1] + u * lrPs[j][2][1]
            ballArr.push([xP,yP])
        }
    }
    drawBalls()
}

function drawBalls() {
    ctx.beginPath();
    ctx.fillStyle = "black";
    for (let i = 0; i < ballArr.length; i++) {
        ctx.moveTo(ballArr[i][0] + 6, ballArr[i][1]);
        ctx.arc(ballArr[i][0], ballArr[i][1], 6, 0, Math.PI*2);
    }
    ctx.stroke();
    ctx.closePath();
    setInterval(randColor, 1000);
}

function drawTree() {
    ctx.beginPath();
    ctx.moveTo(240,450);
    //пень
    ctx.fillStyle = "brown";
    ctx.lineTo(240, 490);
    ctx.lineTo(260, 490);
    ctx.lineTo(260, 450);
    ctx.fill()
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = "green";
    //tree lr1
    ctx.moveTo(270,450);
    ctx.lineTo(420,450);
    ctx.lineTo(270,350);
    //tree lr2
    ctx.lineTo(390,350);
    ctx.lineTo(270,250);
    //tree lr3
    ctx.lineTo(330,250);
    ctx.lineTo(270,150);
    //tree lr3 left
    ctx.moveTo(230,150)
    ctx.lineTo(160,250);
    ctx.lineTo(230,250);
    //tree lr2 left
    ctx.lineTo(110, 350)
    ctx.lineTo(230, 350)
    //tree lr1 left
    ctx.lineTo(60, 450)
    ctx.lineTo(230, 450)
    //stvol
    ctx.rect(230, 150, 40, 300)
    //verhushka
    ctx.moveTo(230, 150)
    ctx.lineTo(250, 119)
    ctx.lineTo(270, 150)
    ctx.fill();
    ctx.closePath();
}
//TODO: make random colors
function randColor() {
    for (let i = 0; i < ballArr.length; i++) {
        ctx.beginPath()
        ctx.fillStyle = colorArr[randomNumber(0,4)]
        ctx.moveTo(ballArr[i][0] + 6, ballArr[i][1]);
        ctx.arc(ballArr[i][0], ballArr[i][1], 6, 0, Math.PI*2);
        ctx.fill()
        ctx.stroke();
        ctx.closePath();
    }
    console.log("changed colors!")
    ctx.fillStyle = lastColor;
}

function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawSnowflake() {
    ctv.beginPath()
    ctv.clearRect(0, 0, 500, 500)
    ctv.fillStyle = "#fff"
    for (let i=0; i<flakeArr.length;i++){
        let flake = flakeArr[i]
        ctv.moveTo(flake.X, flake.Y);
        ctv.arc(flake.X,flake.Y, flake.R, 0, 2*Math.PI)
        ctv.fill();
    }
    ctv.closePath();
    moveFlakes()
}

function moveFlakes() {
    for (let i = 0; i < flakeArr.length; i++) {
        let flake = flakeArr[i]
        flake.Y += 1;
        flake.X += Math.sin(0.01)*2;
        if (flake.Y > 500){
            flake.Y = 0;
            flake.X = Math.random() * 500
        }
    }
}