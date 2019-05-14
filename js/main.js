
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



    /*
    // set up references and the solution object
    var canvas = document.getElementById('mainCanvas');
    var ctx = canvas.getContext('2d');

    window.addEventListener('resize', solutionInstance);
    canvas.addEventListener('mousemove', solutionInstance);
    canvas.addEventListener('mouseclick', solutionInstance);
    */
});


function solution() {
    this.onResize();
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

    // select the initial options
    this.topSelection = this.getPeaButtonText(
        this.topButtons[0].firstElementChild);
    $(this.topButtons[0].firstElementChild).toggleClass('peaButtonSelected');
    this.sideSelection = this.getPeaButtonText(
        this.sideButtons[0].firstElementChild);
    $(this.sideButtons[0].firstElementChild).toggleClass('peaButtonSelected');
    // update the visualization
    this.updateVisualization();
}
solution.prototype.getPeaButtonText = function(el) {
    return $(el.children[1]).text();
}
// handleEvent(event) is called when events occur on the browser window.
solution.prototype.handleEvent = function(event) {
    if(event.type == 'resize') { this.onResize(); }
    else if(event.type == 'click') { this.punnettPressed(event); }
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
}
solution.prototype.removeSelectionClasses= function(idx, el) {
    var btn = $(el.firstElementChild);
    if(btn.hasClass('peaButtonSelected')) {
        $(btn).removeClass('peaButtonSelected');
    }
}
solution.prototype.punnettPressed = function(e) {
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
    // update the punnett square
    this.updateVisualization();
}
solution.prototype.updateVisualization = function() {
    console.log(this.sideSelection, this.topSelection);
    // update the big labels
    this.topSideLabel.text(this.sideSelection[0]);
    this.botSideLabel.text(this.sideSelection[1]);
    this.topLeftLabel.text(this.topSelection[0]);
    this.topRightLabel.text(this.topSelection[1]);
    // update the images and sublabels 
    var greenSrc = 'assets/green_pea.svg';
    var yellowSrc = 'assets/yellow_pea.svg';

    console.log(this.TLlabel);
    // Update images and labels
    // If the top and side characters are equal, we can duplicate the characters to save time checking all cases
    if(this.topSelection[0] === this.sideSelection[0]) {
        this.TLlabel.text(this.topSelection[0] + this.topSelection[0]);
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
        this.BRlabel.text('Yy');
        this.BRimg.attr('src', yellowSrc);
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






