

var slideNav = {"Slide 1.1": {  func: slide1,
                              next: "Slide 1.2",
                              clear: true,
                              text: "#slide-1"},
                "Slide 1.2": { func: slide1_2,
                              next: "Slide 1.3",
                              prev: "Slide 1.1",
                              clear: false,
                              text: "#slide-1-2"},
                "Slide 1.3": { func: slide1_3,
                              next: "Slide 1.4",
                              prev: "Slide 1.2",
                              clear: false,
                              text: "#slide-1-3"},
                "Slide 1.4": { func: slide1_4,
                              next: "Slide 1.5",
                              prev: "Slide 1.3",
                              clear: false,
                              text: "#slide-1-4"},
                "Slide 1.5": { func: slide1_5,
                              next: "Slide 1.6",
                              prev: "Slide 1.4",
                              clear: false,
                              text: "#slide-1-5"},
                "Slide 1.6": { func: slide1_6,
                              next: "Slide 2.1",
                              prev: "Slide 1.5",
                              clear: false,
                              text: "#slide-1-6"},
                "Slide 2.1": { func: slide2,
                               prev: "Slide 1.1",
                               next: "Slide 2.2",
                               clear: true,
                              text: "#slide-2"},
                "Slide 2.2": { func: slide2_2,
                               prev: "Slide 2.1",
                               next: "Slide 2.3",
                               clear: true,
                              text: "#slide-2-2"},
                "Slide 2.3": { func: slide2_3,
                               prev: "Slide 2.2",
                               next: "Slide 3",
                               clear: false,
                              text: "#slide-2-3"},
                "Slide 3": { func: slide3,
                             prev: "Slide 2.2",
                             next: "Slide 4.1",
                             clear: true,
                              text: "#slide-3"},
                "Slide 4.1": { func: slide4,
                             prev: "Slide 3",
                             next: "Slide 4.2",
                             clear: true,
                              text: "#slide-4"},
                "Slide 4.2": { func: slide4_2,
                             prev: "Slide 4.1",
                             next: "Slide 4.3",
                             clear: true,
                              text: "#slide-4-2"},
                "Slide 4.3": { func: slide4_3,
                             prev: "Slide 4.2",
                             next: "Slide 5",
                             clear: true,
                              text: "#slide-4-3"},
                "Slide 5": { func: slide5,
                             prev: "Slide 4.2",
                             next: "Slide 6",
                             clear: true,
                              text: "#slide-5"},
                "Slide 6": { func: slide6,
                             prev: "Slide 5",
                             clear: true,
                              text: "#slide-6"}
               }

var currSlide = "Slide 1.1";


function nextSlide() {
    var nextSlide = slideNav[currSlide].next;
    if (nextSlide) {
        currSlide = nextSlide
        changeSlide(currSlide);
    }
}

function prevSlide() {
    var prevSlide = slideNav[currSlide].prev;
    if (prevSlide) {
        currSlide = prevSlide;
        changeSlide(currSlide);
    }
}


function changeSlide(slideNum) {
    clearSlides();
    if (slideNav[currSlide].clear) {
        $("#graphic").empty();  
    }
    $(slideNav[currSlide].text).css("display", "block");
    slideNav[currSlide]["func"]();
}



function clearSlides() {
    for (var slide in slideNav) {
        console.log(slide)
        $(slideNav[slide].text).css("display", "none");
    }
}

document.onkeydown = function (e) {
    if (e.keyCode == "37") {
        prevSlide();
    } else if (e.keyCode == "39") {
        nextSlide();
    }
}

slide1();