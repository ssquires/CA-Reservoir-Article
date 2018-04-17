

var slideNav = {"Slide 1": {  func: slide1,
                              next: "Slide 2.1",
                              clear: true,
                              text: "#slide-1"},
                "Slide 2.1": { func: slide2,
                               prev: "Slide 1",
                               next: "Slide 2.2",
                               clear: true,
                              text: "#slide-2"},
                "Slide 2.2": { func: slide2_2,
                               prev: "Slide 2.1",
                               next: "Slide 3",
                               clear: false,
                              text: "#slide-2-2"},
                "Slide 3": { func: slide3,
                             prev: "Slide 2.1",
                             next: "Slide 4",
                             clear: true,
                              text: "#slide-3"},
                "Slide 4": { func: slide4,
                             prev: "Slide 3",
                             next: "Slide 5",
                             clear: true,
                              text: "#slide-4"},
                "Slide 5": { func: slide5,
                             prev: "Slide 4",
                             next: "Slide 6",
                             clear: true,
                              text: "#slide-5"},
                "Slide 6": { func: slide6,
                             prev: "Slide 5",
                             next: "Slide 7",
                             clear: true,
                              text: "#slide-6"},
                "Slide 7": { func: slide7,
                             prev: "Slide 6",
                             next: "Slide 8",
                             clear: true,
                              text: "#slide-7"},
                "Slide 8": { func: slide8,
                             prev: "Slide 7",
                             next: "Slide 9",
                             clear: true,
                              text: "#slide-8"},
                "Slide 9": { func: slide9,
                             prev: "Slide 8",
                             next: "Slide 10",
                             clear: true,
                              text: "#slide-9"},
                "Slide 10": { func: slide10,
                             prev: "Slide 9",
                             clear: true,
                              text: "#slide-10"}
               }

var currSlide = "Slide 1";


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