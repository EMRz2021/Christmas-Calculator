/* 1- Dom Variables */
const col1 = document.querySelector("#col1");
const col2 = document.querySelector("#col2");
const col3 = document.querySelector("#col3");
const btnNo = document.querySelectorAll(".btnNo");
const btn = document.querySelectorAll(".btn");
const firstNo = document.querySelector("#firstNo");
const operation = document.querySelector("#operation");
const secondNo = document.querySelector("#secondNo");
const result = document.querySelector("#result");
const equal = document.querySelector("#equal");
const cancel = document.querySelector("#cancel");
const point = document.querySelector("#point");
const nos = document.querySelector("#nos");
const ops = document.querySelector("#ops");
const popup = document.querySelector(".popup");

/* 2- Changing colors */
const changeColor = (buttons, color) => {
    for(let i=0; i<buttons.length; i++) {
        buttons[i].style.background = color.value;
        color.style.background = color.value;

        const a = color.value.split("");
        if(a[1] <= 4 && a[3] <= 4 && a[5] <= 4) {
            buttons[i].style.color = "white";
        } else {
            buttons[i].style.color = "black";
        }
    }
}

const changeColor3 = () => {
    firstNo.style.background = col3.value;
    operation.style.background = col3.value;
    secondNo.style.background = col3.value;
    result.style.background = col3.value;
    col3.style.background = col3.value;

    const a = col3.value.split("");
    if(a[1] <= 4 && a[3] <= 4 && a[5] <= 4) {
        firstNo.style.color = "white";
        operation.style.color = "white";
        secondNo.style.color = "white";
        result.style.color = "white";
    } else {
        firstNo.style.color = "black";
        operation.style.color = "black";
        secondNo.style.color = "black";
        result.style.color = "black";
    }
}

col1.addEventListener("input", () => changeColor(btnNo,col1));
col2.addEventListener("input", () => changeColor(btn,col2));
col3.addEventListener("input", changeColor3);

/* 3- Calculating: */
firstNo.readOnly = true;
operation.readOnly = true;
secondNo.readOnly = true;
result.readOnly = true;

let txt1 = "";
const fNo = a => 
    a.target.className === "btnNo" && secondNo.value === "" && operation.value === "" && firstNo.value.length < 7 ?
    firstNo.value = txt1 += a.target.innerText :
    false;
nos.addEventListener("click", fNo)

const operationSelection = a => {
    if(a.target.className === "btn" && firstNo.value !== "" && secondNo.value === "") {
        operation.value = a.target.innerText
    } else if(result.value !== "") {
        const numResultValue = result.value.replace("=", "");
        firstNo.value = numResultValue;
        operation.value = a.target.innerText;
        secondNo.value = "";
        result.value = "";
        txt1 = "";
        txt2 = "";
    }
}
ops.addEventListener("click", operationSelection)

let txt2 = "";
const sNo = a =>
    a.target.className === "btnNo" && firstNo.value !== "" && operation.value !== "" && result.value === "" && secondNo.value.length < 7 ?
    secondNo.value = txt2 += a.target.innerText :
    false;
nos.addEventListener("click", sNo)

const finalResult = () => {
    let txt3 = `${firstNo.value} ${operation.value} ${secondNo.value}`;
        let resultDraft = eval(txt3);
    if(firstNo.value !== "" && operation.value !== "%" && secondNo.value !== "") {
        result.value = "= " + resultDraft;
    } else if (operation.value === "%") {
        result.value = "= " + (Number(firstNo.value) * Number(secondNo.value)/100);
    }
}
equal.addEventListener("click", finalResult)

const addDot = () => {
    secondNo.value === "" && operation.value === "" && !firstNo.value.includes(".") ?
    firstNo.value = txt1 += "." :
    (firstNo !== "" && operation.value !== "" && result.value === "" && !secondNo.value.includes(".") ?
        secondNo.value = txt2 += "." :
        false);
}
point.addEventListener("click", addDot)

const resetAll= () => {
    firstNo.value = "";
    operation.value = "";
    secondNo.value = "";
    result.value = "";
    txt1 = "";
    txt2 = "";
}
cancel.addEventListener("click", resetAll)

// Adding Canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 500;

class Particle {
    constructor(x , y) {
        this.x = x;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 2 + 1;
    }
    update() {
        this.y += Math.random() * 4 - 1;
        this.x += Math.random() * 4 - 2;

        if(this.y > canvas.height) {
            this.y = 0 - this.size;
            this.x = Math.random() * canvas.width;
        }
    }
    draw() {
        var img = document.getElementById("snowflake");
        var pat = ctx.createPattern(img, "repeat");
        ctx.fillStyle = pat;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

function init() {
    particlesArray = []
    for(let i=0; i<numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = 0;
        particlesArray.push(new Particle(x,y))
    }
}
init();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i<particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }

    requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});