
// HMX Interview Submission
// Nicholas Bucher


window.addEventListener('load', function() {
    var solutionInstance = new solution();
    // Send the onclick events and window resize events to the solution instance
    // These events are handled in "solution.handleEvent(event)"
    // The reason to use this approach is to maintain the solutionInstance's 
    // context from within the callback function.
    $('.peaButton').each(function(idx, el) {
        el.addEventListener('click', solutionInstance);
    })
    window.addEventListener('resize', solutionInstance);
});
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// ------------------ INITIALIZATION FUNCTIONS ------------------------ //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
function solution() {
    // make sure the page is scaled correctly
    this.onResize();
    // cache commonly used references
    this.initializeReferences();
    // initialize punnett square
    this.initializePunnettSquare();
    // create the phenotype chart object
    this.initializePhenotypeChart();
    // update the visualization with the initialized values
    this.updateVisualization();
}
solution.prototype.initializePhenotypeChart = function() {
    this.pCtx = document.getElementById('phenotypeCanvas').getContext('2d');
    this.pChart = new Chart(this.pCtx, {
        type: 'bar',
        data: {
            labels: ['Yellow', 'Green'],
            datasets: [{
                data: [3, 4],
                backgroundColor: [ '#EFCE22', '#65B14F' ],
                borderColor: '#FFFFFF',
                borderWidth: 3
            }]
        },
        options: {
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'PHENOTYPIC RATIO',
                fontWeight: 'bold',
                fontFamily: 'Roboto',
                fontSize: 16,
                fontColor: '#FFF',
                padding: 30
            },
            legend: { 
                display: false
            },
            pointLabels: {
                fontFamily: 'Roboto',
                fontSize: 14,
                fontStyle: 'bold'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontSize: 16,
                        stepSize: 1
                    },
                    gridLines: {
                        display: false,
                        lineWidth: 3,
                        color: '#585858'
                    }
                }],
                xAxes: [{
                    barPercentage: .4,
                    ticks: {
                        beginAtZero: true,
                        fontSize: 16,
                    },
                    gridLines: {
                        display: false,
                        lineWidth: 3,
                        color: '#585858'
                    }
                }]
            }

        }
    });
    $(this.pCtx.canvas).css('display', 'inline-block');
}
solution.prototype.initializeReferences = function() {
    // store the button references
    this.sideButtons = $('.peaBlockSide');
    this.topButtons = $('.peaBlockTop');
    // store the image and label references for the punnett square
    this.TLimg = $('#TL-img');
    this.TRimg = $('#TR-img');
    this.BLimg = $('#BL-img');
    this.BRimg = $('#BR-img');
    this.TLlabel = $('#TL-label');
    this.TRlabel = $('#TR-label');
    this.BLlabel = $('#BL-label');
    this.BRlabel = $('#BR-label');
    // get the labels
    this.topLeftLabel = $('#topLeftLabel');
    this.topRightLabel = $('#topRightLabel');
    this.topSideLabel = $('#topSideLabel');
    this.botSideLabel = $('#botSideLabel');
    // get the genotypic label reference
    this.genotypicLabel = $('#genotypicRatioText');
}
solution.prototype.initializePunnettSquare = function() {
    // select the initial options
    this.topSelection = this.getPeaButtonText(
        this.topButtons[1].firstElementChild);
    $(this.topButtons[1].firstElementChild).addClass('peaButtonSelected');
    this.sideSelection = this.getPeaButtonText(
        this.sideButtons[1].firstElementChild);
    $(this.sideButtons[1].firstElementChild).addClass('peaButtonSelected');
}
solution.prototype.getPeaButtonText = function(el) {
    return $(el.children[1]).text();
}
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// ------------------------ EVENT HANDLING ---------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// handleEvent(event) is called when events occur on the browser window.
solution.prototype.handleEvent = function(event) {
    if(event.type == 'resize') { this.onResize(); }
    else if(event.type == 'click') { this.punnettButtonPressed(event); }
}
solution.prototype.onResize = function() {
    // dimensions of the punnett row/column controls are matched here
    var tWidth = $('#punnettTopRow').css('width');
    $('#punnettSideRow').css('height',tWidth);
    $('#punnettTable').css('height',tWidth);
    $('#punnettTopRow').css('height', 
        $('#punnettSideRow').css('width'));
    // dimensions of the buttons and square are matched here
    $('.peaButton').each(function( idx, el) {
        $(el).css('height', $(el).css('width'));
    });
    if(this.pChart !== undefined) { 
        this.pChart.resize(); 
    }
}
solution.prototype.removeSelectionClasses= function(idx, el) {
    var btn = $(el.firstElementChild);
    if(btn.hasClass('peaButtonSelected')) {
        $(btn).removeClass('peaButtonSelected');
    }
}
solution.prototype.punnettButtonPressed = function(e) {
    // determine whether a top button or a side button was clicked
    var isSideButton = $(e.target.parentElement).hasClass('peaBlockSide');
    // if there are buttons already selected, deselect them
    if(isSideButton) {
        $(this.sideButtons).each(this.removeSelectionClasses)
        this.sideSelection = this.getPeaButtonText(e.target);
    } else {
        $(this.topButtons).each(this.removeSelectionClasses)
        this.topSelection = this.getPeaButtonText(e.target);
    }
    // show that this class was selected
    $(e.target).addClass('peaButtonSelected');
    // update the visualization with the new values (this.topSelection and this.sideSelection)
    this.updateVisualization();
}
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// ----------------------- UPDATE FUNCTIONS --------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
solution.prototype.updateVisualization = function() {
    // update each section of the visualization
    this.updatePunnettSquare();
    this.updatePhenotypicRatio();
    this.updateGenotypicRatio();
}
solution.prototype.updatePunnettSquare = function() {
    // first update the big labels
    this.topSideLabel.text(this.sideSelection[0]);
    this.botSideLabel.text(this.sideSelection[1]);
    this.topLeftLabel.text(this.topSelection[0]);
    this.topRightLabel.text(this.topSelection[1]);
    // then update the images and labels inside the Punnett square
    var greenSrc = 'assets/green_pea.svg';
    var yellowSrc = 'assets/yellow_pea.svg';
    // If the top and side characters are equal, we can duplicate the characters to save time checking all cases
    if(this.topSelection[0] === this.sideSelection[0]) {
        this.TLlabel.text(this.topSelection[0] + this.topSelection[0]);
        // we only need to check if one character equals 'Y' since both characters are equal
        if(this.topSelection[0] === 'Y') {
            this.TLimg.attr('src', yellowSrc);
        } else {
            this.TLimg.attr('src', greenSrc);
        }
    } else {
        // otherwise it must be "Yy"
        this.TLlabel.text('Yy');
        this.TLimg.attr('src', yellowSrc);
    }
    // continue this logic to fill in the other squares
    if(this.topSelection[1] === this.sideSelection[0]) {
        this.TRlabel.text(this.topSelection[1] + this.topSelection[1]);
        if(this.topSelection[1] === 'Y') {
            this.TRimg.attr('src', yellowSrc);
        } else {
            this.TRimg.attr('src', greenSrc);
        }
    } else {
        this.TRlabel.text('Yy');
        this.TRimg.attr('src', yellowSrc);
    }
    if(this.topSelection[0] === this.sideSelection[1]) {
        this.BLlabel.text(this.topSelection[0] + this.topSelection[0]);
        if(this.topSelection[0] === 'Y') {
            this.BLimg.attr('src', yellowSrc);
        } else {
            this.BLimg.attr('src', greenSrc);
        }
    } else {
        this.BLlabel.text('Yy');
        this.BLimg.attr('src', yellowSrc);
    }
    if(this.topSelection[1] === this.sideSelection[1]) {
        this.BRlabel.text(this.topSelection[1] + this.topSelection[1]);
        if(this.topSelection[1] === 'Y') {
            this.BRimg.src = yellowSrc;
        } else {
            this.BRimg.attr('src', greenSrc);
        }
    } else {
        this.BRlabel.text('Yy');
        this.BRimg.attr('src', yellowSrc);
    }
}
solution.prototype.updatePhenotypicRatio = function() {
    if(this.pChart === undefined) { return; }
    var numYellow = 0;
    var numGreen = 0;
    if(this.TLlabel.text().includes('Y')) { numYellow++; }
    else { numGreen++; }
    if(this.TRlabel.text().includes('Y')) { numYellow++; }
    else { numGreen++; }
    if(this.BLlabel.text().includes('Y')) { numYellow++; }
    else { numGreen++; }
    if(this.BRlabel.text().includes('Y')) { numYellow++; }
    else { numGreen++; }
    this.pChart.data.datasets[0].data[0] = numYellow;
    this.pChart.data.datasets[0].data[1] = numGreen;
    this.pChart.update();
}
solution.prototype.updateGenotypicRatio = function() {
    // count the types of combinations present in the table
    var numYY = 0;
    var numYy = 0;
    var numyy = 0;
    if(this.TLlabel.text() === 'YY') { numYY++; }
    else if(this.TLlabel.text() === 'Yy') { numYy++; }
    else if(this.TLlabel.text() === 'yy') { numyy++; }
    if(this.TRlabel.text() === 'YY') { numYY++; }
    else if(this.TRlabel.text() === 'Yy') { numYy++; }
    else if(this.TRlabel.text() === 'yy') { numyy++; }
    if(this.BLlabel.text() === 'YY') { numYY++; }
    else if(this.BLlabel.text() === 'Yy') { numYy++; }
    else if(this.BLlabel.text() === 'yy') { numyy++; }
    if(this.BRlabel.text() === 'YY') { numYY++; }
    else if(this.BRlabel.text() === 'Yy') { numYy++; }
    else if(this.BRlabel.text() === 'yy') { numyy++; }
    // update the label
    this.genotypicLabel.text(numYY + ' YY : ' +
        numYy + ' Yy : '
        + numyy + ' yy');
}
