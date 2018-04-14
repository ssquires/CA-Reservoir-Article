var slideTexts = [$("#slide-1"),
                  $("#slide-2"),
                  $("#slide-3"),
                  $("#slide-4"),
                  $("#slide-5"),
                  $("#slide-6"),
                  $("#slide-7"),
                  $("#slide-8"),
                  $("#slide-9"),
                  $("#slide-10")];

var slideFuncs = [slide1,
                  slide2,
                  slide3,
                  slide4,
                  slide5,
                  slide6,
                  slide7,
                  slide8,
                  slide9,
                  slide10];

var currSlide = 1;


function nextSlide() {
    if (currSlide < slideTexts.length) {
        currSlide++;
        changeSlide(currSlide);
    }
}

function prevSlide() {
    if (currSlide > 1) {
        currSlide--;
        changeSlide(currSlide);
    }
}


function changeSlide(slideNum) {
    clearSlides();
    $("#slide-" + slideNum).css("display", "block");
    slideFuncs[slideNum - 1]();
}



function clearSlides() {
    for (var slide of slideTexts) {
        slide.css("display", "none");
    }
}