createGridDivs()
draw()

const clearBtn = document.querySelector('#clear-btn')
const blackBtn = document.querySelector('#black-btn')
const rainbowBtn = document.querySelector('#rainbow-btn')
const eraseBtn = document.querySelector('#erase-btn')

let colorMode

setBtns()

// Attaches event listeners to buttons with appropriate callback functions
function setBtns () {
    blackBtn.addEventListener('click', black)
    rainbowBtn.addEventListener('click', rainbow)
    eraseBtn.addEventListener('click', erase)
    clearBtn.addEventListener('click', clearGrid)
}

/* Creates and places a div into each of the
   256 cells in the 16x16 square grid */
function createGridDivs() {
    grid = document.querySelector('.grid')

    for (i = 0; i < 256; i++) {
        div = document.createElement('div')
        grid.appendChild(div);
    }
}

/* Adds an event listener for mouse hover event to each of the divs in the
   grid. Upon hover, the div will be colored according to the color mode
   that is enabled. */
function draw() {
    divs = document.querySelectorAll('.grid > div')
    divs.forEach(div => div.addEventListener('mouseover', color))
}


// Determines the color to use for drawing. 
function color(e) {
    if (colorMode == 'black' || colorMode == 'none') {
        e.target.setAttribute("style","background-color:" + colorMode)
    }
    else if (colorMode == 'rainbow') {
        e.target.setAttribute("style","background-color: " + getRainbowColor())
    }
}

// Returns a random rainbow color as a string.
function getRainbowColor () {
    let colors = ['violet','indigo','blue','green','yellow','orange',
                             'red']
    return colors[Math.floor(Math.random() * colors.length)];
}

function black() {
    colorMode = "black"    
}

function erase() {
    colorMode = "none"    
}

function greyScale() {
    colorMode = "greyScale"
}

function rainbow() {
    colorMode = "rainbow"
}

// Clears all drawing from the grid.
function clearGrid() {
    divs = document.querySelectorAll(".grid > div")
    divs.forEach(div => div.removeAttribute("style"))
}

