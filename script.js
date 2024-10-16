// Buttons
const buttons = document.querySelectorAll(".number") // [<button class="number">,<button class="number">,<button class="number">]
const signs = document.querySelectorAll(".sign") // [<button class="sign">,<button class="sign">,<button class="sign">]

// equation
let screen = document.querySelector(".equation") //  <p class="equation"></p>

// operations
const clear = document.querySelector(".clear") //  <button class="clear">AC</button>
const del = document.querySelector(".delete") // <svg class="delete">

// solve
const solve = document.getElementById("solve") // <button id="solve">=</button>
const result = document.querySelector(".solution") // <h2 class="solution"></h2>
const answer = document.querySelector(".result") // <span class="result"></span>

// theme setting
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
const systemSettingLight = window.matchMedia("(prefers-color-scheme: light)");

const lightMode = document.querySelector(".light") // <svg class="light">
const darkMode = document.querySelector(".dark") // <svg class="dark">

const modeOverlay = document.querySelector(".lightning-overlay") // <div class="lightning-overlay"></div>


// Quadratic
const inputControl = document.querySelector(".inputControl")
const quadContainer = document.querySelector(".quad_input")
const toggleQuad = document.querySelector(".toggleQuad")
const a  = document.getElementById("a")
const b  = document.getElementById("b")
const c  = document.getElementById("c")


// console.log("Dark = ",systemSettingDark.matches)
// console.log("Light = ",systemSettingLight.matches)


function storeTheme(){
    localStorage.setItem("theme", document.querySelector("html").getAttribute("data-theme"))
}

lightMode.addEventListener("click", ()=>{
    document.querySelector("html").setAttribute("data-theme","light")
    if(document.querySelector("html").getAttribute("data-theme") == "light"){
        modeOverlay.classList.add("overlay-position")
    }else {
        modeOverlay.classList.remove("overlay-position")
    }
    storeTheme()
})

darkMode.addEventListener("click", ()=>{
    document.querySelector("html").setAttribute("data-theme","dark")
    if(document.querySelector("html").getAttribute("data-theme") == "dark"){
        modeOverlay.classList.remove("overlay-position")
    }else{
        modeOverlay.classList.remove("overlay-position")
    }
    storeTheme()
})

window.addEventListener("load", ()=>{
    quadContainer.style.display = "none"
    a.classList.add("focused")
    const storedTheme = localStorage.getItem("theme")
    if(storedTheme){
        document.querySelector("html").setAttribute("data-theme", storedTheme)
    }

    if(systemSettingDark.matches){
        document.querySelector("html").setAttribute("data-theme","dark")
    }else {
        document.querySelector("html").setAttribute("data-theme","light")
    }
    
})


buttons.forEach(btn => {
    btn.addEventListener("click",()=> {
        if (quadContainer.style.display == ""){
            document.querySelector(".focused").value += btn.textContent
        }else {
            screen.innerHTML += btn.innerHTML + " ";
        }
    })
})

signs.forEach(sign => {
    sign.addEventListener("click",()=> {
        if(quadContainer.style.display == ""){
            if(sign.textContent == "+" || sign.textContent == "–"){
                let focusedInput = document.querySelector(".focused")
                if(focusedInput.value.trim() == ""){
                    focusedInput.value = sign.textContent
                }
            }
        }else {
            let signs = ["÷","×","–","+"]
            if(signs.includes(screen.innerHTML.trim().slice(screen.innerHTML.trim().length - 1)) && screen.innerHTML.trim().slice(screen.innerHTML.trim().length - 1) == sign.innerHTML){
                // screen.innerHTML = screen.innerHTML.slice(0, -1) + " " + sign.innerHTML + " ";
            }else {
                screen.innerHTML += sign.innerHTML + " ";
            }
        }
    })
})


clear.addEventListener("click",()=> {
    if(quadContainer.style.display == ""){
        let inputs = document.querySelectorAll("input[type='text']")
        inputs.forEach(input => input.value = "")
        a.classList.add("focused")
        b.classList.remove("focused")
        c.classList.remove("focused")
        inputControl.textContent = "b"
    }else {
        screen.innerHTML = "";
        answer.innerHTML = "";
        result.classList.remove("add-solution")
        screen.classList.remove("remove-equation")
    }
})

del.addEventListener("click",()=> {
    if(quadContainer.style.display == ""){
        document.querySelector(".focused").value = document.querySelector(".focused").value.slice(0, -1) 
    }else {
        if(screen.innerHTML.trim().length == 1){
            screen.innerHTML = screen.innerHTML.trim().slice(0, -1);
            answer.innerHTML = "";
            result.classList.remove("add-solution")
            screen.classList.remove("remove-equation")
        }
        else{
            screen.innerHTML = screen.innerHTML.trim().slice(0, -1);
        }
    }
})


solve.addEventListener("click",()=> {
    if(quadContainer.style.display == ""){
        solveQuad()
    } else {
        let split_equation = screen.innerHTML.trim().split(" ")
        let new_equation = split_equation.map(x => (x == "÷")? "/":x).map(x => (x == "×")? "*":x).map(x => (x == "–")? "-":x).join("")
        try {
            if(screen.textContent.trim() != ""){
                let ans = eval(new_equation);
                answer.innerHTML = ans;
                result.classList.add("add-solution")
                screen.classList.add("remove-equation")
            }
        }catch(err) {
            answer.innerHTML = err.name
            result.classList.add("add-solution")
            screen.classList.add("remove-equation")
        }
    }
})

toggleQuad.addEventListener("click", ()=>{
    if(quadContainer.style.display == "none"){
        quadContainer.style.display = ""
        screen.style.display = "none"
        result.style.display = "none"
    } else {
        quadContainer.style.display = "none"
        screen.style.display = ""
        result.style.display = ""
    }
})

inputControl.addEventListener("click", ()=> {
    let controlValue = inputControl.textContent.trim() // b
    if(quadContainer.style.display == ""){
        if(controlValue == "a"){
            a.classList.add("focused")
            b.classList.remove("focused")
            c.classList.remove("focused")
            inputControl.textContent = "b"
        }else if(controlValue == "b") {
            b.classList.add("focused")
            a.classList.remove("focused")
            c.classList.remove("focused")
            inputControl.textContent = "c"
        }else if(controlValue == "c"){
            c.classList.add("focused")
            a.classList.remove("focused")
            b.classList.remove("focused")
            inputControl.textContent = "a"
        }
    }
})

// solve quadratic
function solveQuad(){
    let a_val = Number(a.value.split("").map(x => x == "–"? "-":x).join(""))
    let b_val = Number(b.value.split("").map(x => x == "–"? "-":x).join(""))
    let c_val = Number(c.value.split("").map(x => x == "–"? "-":x).join(""))

    let discriminant = (b_val * b_val - 4 * a_val * c_val)**0.5
    let x1, x2
    
    x1 = (-b_val + discriminant) / 2 * a_val
    x2 = (-b_val - discriminant) / 2 * a_val

    result.classList.add("add-solution")
    screen.classList.add("remove-equation")
    result.style.display = "";
    screen.style.display = ""
    quadContainer.style.display = "none"
    
    if(x1.toString().includes(".") || x2.toString().includes(".")){
        answer.innerHTML = `x1 = ${x1.toFixed(2)}, x2 = ${x2.toFixed(2)}`
    }else {
        answer.innerHTML = `x1 = ${x1}, x2 = ${x2}`
    }
}