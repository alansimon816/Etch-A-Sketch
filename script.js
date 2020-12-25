createGridDivs()

function createGridDivs() {
    grid = document.querySelector('.grid')

    for (i = 0; i < 256; i++) {
        div = document.createElement('div')
        grid.appendChild(div);
    }
}