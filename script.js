const clearBtn = document.querySelector('#clear-btn')
const blackBtn = document.querySelector('#black-btn')
const grayScaleBtn = document.querySelector('#grayscale-btn')
const rainbowBtn = document.querySelector('#rainbow-btn')
const eraseBtn = document.querySelector('#erase-btn')
const hexInput = document.querySelector('#hex')
const colorInput = document.querySelector('#color-picker')
const rangeInput = document.querySelector('#myRange')

let colorMode

createGridDivs()
draw()
setBtns()

// Attaches event listeners to buttons with appropriate callback functions
function setBtns () {
    blackBtn.addEventListener('click', black)
    grayScaleBtn.addEventListener('click', grayScale)
    rainbowBtn.addEventListener('click', rainbow)
    eraseBtn.addEventListener('click', erase)
    hexInput.addEventListener('change', hex)
    colorInput.addEventListener('click', picker)
    clearBtn.addEventListener('click', clearGrid)
    rangeInput.addEventListener('change', adjustGridSize)
}

// Adjusts the dimensions of the grid based on the value of range slider.
function adjustGridSize() {
    destroyGrid()
    let v = rangeInput.value
    grid.style.gridTemplate = `repeat(${v}, auto) / repeat(${v}, auto)`
    createGridDivs()
    draw()
}

/* Creates and places a div into each of the
   cells in the square grid */
function createGridDivs() {
    grid = document.querySelector('.grid')
    let gridSize = rangeInput.value * rangeInput.value
    console.log(`Dimension of grid: ${rangeInput.value}`)
    console.log(`# Cells in grid: ${gridSize}`)

    for (i = 0; i < gridSize; i++) {
        div = document.createElement('div')
        grid.appendChild(div);
    }
}

// Clears all drawing from the grid.
function clearGrid() {
    divs = document.querySelectorAll(".grid > div")
    divs.forEach(div => {
        div.removeAttribute("style")
        div.removeAttribute("data-count")
    })
}

// Destroys the existing grid.
function destroyGrid() {
    grid.innerHTML = ''
}

/* Adds an event listener for mouse hover event to each of the divs in the
   grid. Upon hover, the div will be colored according to the color mode
   that is enabled. */
function draw() {
    divs = document.querySelectorAll('.grid > div')
    divs.forEach(div => div.addEventListener('mouseover', color))
}


// Colors in a grid cell according to the specified colorMode. 
function color(e) {
    element = e.target
    let color = "black"
    
    if (colorMode == 'grayScale') {
        let count = +element.getAttribute("data-count")
        shadeIn(element, count)
        return
    }
    else if (colorMode == 'black' || colorMode == 'none') {
        color = colorMode
    }
    else if (colorMode == 'rainbow') {
        color = getRainbowColor()
    }
    else if (colorMode == 'picker') {
        color = colorInput.value 
        hexInput.value = color
    }
    else if (colorMode == 'hex') {
        color = hexInput.value
        colorInput.value = color
    }
    element.setAttribute("style","background-color:" + color)
}



/* This function assists the grayscale color mode by shading in a grid cell
   progressively darker each time the grid cell is hovered over by mouse. */
function shadeIn(element, count) {
    switch(count) {
        case 0:
            element.setAttribute("data-count", 1)
            element.setAttribute("style","background-color: gray")
            break;
        case 1:
            element.setAttribute("data-count", 2)
            element.setAttribute("style","background-color: #484848")
            break;
        default:
            element.setAttribute("data-count", 3)
            element.setAttribute("style","background-color: black")
    }
}

// Returns a random rainbow color as a string.
function getRainbowColor () {
    let colors = ['violet','indigo','blue','green','yellow','orange',
                             'red']
    return colors[Math.floor(Math.random() * colors.length)];
}

// Sets colorMode to black.
function black() {
    colorMode = "black"    
}

// Sets colorMode to none.
function erase() {
    colorMode = "none"    
}

/* Sets colorMode to grayScale. Adds a counter attribute to each
   div element in the grid to keep track of the number of times
   mouse hovers over the element. */
function grayScale() {
    let grid = document.querySelector('.grid')
    let divs = [...grid.children]
    divs.forEach(div => div.setAttribute("data-count", 0))
    colorMode = "grayScale"
}

// Sets colorMode to rainbow.
function rainbow() {
    colorMode = "rainbow"
}

// Sets colorMode to picker.
function picker() {
    colorMode = "picker"
}

// Sets colorMode to hex.
function hex() {
    colorMode = "hex"
}