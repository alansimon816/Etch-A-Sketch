createGridDivs()
draw()
const clearBtn = document.querySelector('#clear-btn')
clearBtn.addEventListener('click', clearGrid)


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
    e.target.setAttribute("style","background-color:black")
}

// Clears all drawing from the grid.
function clearGrid() {
    divs = document.querySelectorAll(".grid > div")
    divs.forEach(div => div.removeAttribute("style"))
}

