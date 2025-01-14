const spreadsheetContainer = document.querySelector('.spreadsheet-container');
const spreadsheet = document.getElementById('spreadsheet');
const addressBar = document.querySelector('.address-bar');
const formulaBar = document.querySelector('.formula-bar');
const toolbar = document.querySelector('.toolbar2')
const rows = 50;
const cols = 26;
const highlightColor = '#ADD8E6'; // Light blue

// Create column headers
let headerRow = spreadsheet.insertRow();
headerRow.className = 'header-row';
let emptyHeaderCell = headerRow.insertCell();
emptyHeaderCell.className = 'header-cell starting-cell';
for (let i = 0; i < cols; i++) {
    let cell = headerRow.insertCell();
    cell.textContent = String.fromCharCode(65 + i);
    cell.className = 'header-cell';
    cell.dataset.col = String.fromCharCode(65 + i); // Add dataset for column identification
}

const boldBtn = document.getElementById('bold-btn');
boldBtn.addEventListener('click', toggleBold);

let isBold = true; // Set initial state to bold

function toggleBold() {
    isBold = !isBold;
    boldBtn.classList.toggle('active', isBold);

    const activeCell = document.querySelectorAll('.cell:focus');
    activeCells.forEach(cell => {
        cell.classList.toggle('bold', isBold);
        cell.style.fontWeight = isBold ? 'bold' : 'normal';
    });
}

// Create rows and cells
for (let i = 1; i <= rows; i++) {
    let row = spreadsheet.insertRow();
    let rowHeader = row.insertCell();
    rowHeader.textContent = i;
    rowHeader.className = 'header-cell starting-cell starting-cell-column';
    rowHeader.dataset.row = i; // Add dataset for row identification

    for (let j = 0; j < cols; j++) {
        let cell = row.insertCell();
        cell.className = `cell ${isBold ? 'bold' : ''}`;
        // cell.className = 'cell';
        cell.contentEditable = true;
        cell.dataset.col = String.fromCharCode(65 + j);
        cell.dataset.row = i;

        cell.addEventListener('focus', function() {
            //Remove previous highlights
            removeHighlights();

            addressBar.value = `${this.dataset.col}${this.dataset.row}`;
            formulaBar.value = this.textContent;

            // Add highlights
            highlightCell(this);
            highlightRow(this.dataset.row);
            highlightColumn(this.dataset.col);

            if (isBold) {
                this.classList.add('bold');
                this.style.fontWeight = 'bold';
            } else {
                this.classList.remove('bold');
                this.style.fontWeight = 'normal';
            }
        });

        cell.addEventListener('input', function() {
            formulaBar.value = this.textContent;
            this.style.width = 'auto';
            let newWidth = Math.max(this.scrollWidth, 60);
            this.style.width = newWidth + 'px';
        });
    }
}

formulaBar.addEventListener('input', function() {
    let activeCell = document.querySelector('.cell:focus');
    if (activeCell) {
        activeCell.textContent = this.value;
        activeCell.style.width = 'auto';
        let newWidth = Math.max(activeCell.scrollWidth, 60);
        activeCell.style.width = newWidth + 'px';
    }
});

function highlightCell(cell) {
    cell.style.border = `2px solid ${'#2B6AD0'}`;
    // cell.style.backgroundColor = highlightColor;
}

function highlightRow(rowNum) {
    let row = spreadsheet.rows[rowNum];
    for (let i = 0; i < row.cells.length; i++) {
      if(row.cells[i].classList.contains('header-cell')){
        row.cells[i].style.backgroundColor = highlightColor;
      }
    }
}

function highlightColumn(colLetter) {
    for (let i = 0; i < spreadsheet.rows.length; i++) {
        let cell = spreadsheet.rows[i].cells;
        for(let j = 0; j < cell.length; j++){
            if (cell[j].dataset.col === colLetter && cell[j].classList.contains('header-cell')) {
                cell[j].style.backgroundColor = highlightColor;
            }
        }
    }
}

function removeHighlights() {
    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.border = '1px solid #ddd';
        cell.style.backgroundColor = '';
        cell.classList.remove('bold');
        cell.style.fontWeight = 'normal';
    });

    let headerCells = document.querySelectorAll('.header-cell');
    headerCells.forEach(headerCell => {
        headerCell.style.backgroundColor = '';
    });
}

// Add event listeners for toolbar icons
// const boldButton = toolbar.querySelector('.fa-bold');
// const italicButton = toolbar.querySelector('.fa-italic');
// const fontSizeButtons = toolbar.querySelectorAll('button'); // Get + and - buttons
// let fontSize = 12; // Initial font size

// boldButton.addEventListener('click', () => toggleBold());
// italicButton.addEventListener('click', () => toggleItalic());
// fontSizeButtons.forEach(button => button.addEventListener('click', adjustFontSize));

// function toggleBold() {
//     let activeCell = document.querySelector('.cell:focus');
//     if (activeCell) {
//         activeCell.style.fontWeight = activeCell.style.fontWeight === 'bold' ? 'normal' : 'bold';
//     }
// }

// function toggleItalic() {
//     let activeCell = document.querySelector('.cell:focus');
//     if (activeCell) {
//         activeCell.style.fontStyle = activeCell.style.fontStyle === 'italic' ? 'normal' : 'italic';
//     }
// }

// function adjustFontSize(event) {
//     let activeCell = document.querySelector('.cell:focus');
//     if (activeCell) {
//         if (event.target.textContent === '+') {
//             fontSize += 1;
//         } else if (event.target.textContent === '-') {
//             fontSize = Math.max(fontSize - 1, 8); // Minimum font size 8
//         }
//         activeCell.style.fontSize = fontSize + 'px';
//     }

//   // Update the displayed font size
//   toolbar.querySelector('span').textContent = fontSize;
// }

// // ... (rest of your existing code for highlighting and other functionality)

// // Add this function to set the text color of the selected cell to a light blue when formatting buttons are clicked.
// function setTextColor(cell) {
//   cell.style.color = '#ADD8E6'; //Set to your light blue color
// }

// //Modify the existing functions to include setting text color
// function toggleBold() {
//     let activeCell = document.querySelector('.cell:focus');
//     if (activeCell) {
//         activeCell.style.fontWeight = activeCell.style.fontWeight === 'bold' ? 'normal' : 'bold';
//         setTextColor(activeCell);
//     }
// }

// function toggleItalic() {
//     let activeCell = document.querySelector('.cell:focus');
//     if (activeCell) {
//         activeCell.style.fontStyle = activeCell.style.fontStyle === 'italic' ? 'normal' : 'italic';
//         setTextColor(activeCell);
//     }
// }

// function adjustFontSize(event) {
//     let activeCell = document.querySelector('.cell:focus');
//     if (activeCell) {
//         if (event.target.textContent === '+') {
//             fontSize += 1;
//         } else if (event.target.textContent === '-') {
//             fontSize = Math.max(fontSize - 1, 8); // Minimum font size 8
//         }
//         activeCell.style.fontSize = fontSize + 'px';
//         setTextColor(activeCell);
//     }

//   // Update the displayed font size
//   toolbar.querySelector('span').textContent = fontSize;
// }
