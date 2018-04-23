function slide1() {
    console.log("Displaying Slide 1.1");
    placeholderImage("slide1_1.png");
}

function slide1_2() {
    console.log("Displaying Slide 1.2");
    placeholderImage("slide1_2.png");
}

function slide1_3() {
    console.log("Displaying Slide 1.3");
    placeholderImage("slide1_3.png");
}

function slide1_4() {
    console.log("Displaying Slide 1.4");
    placeholderImage("slide1_4.png");
}

function slide1_5() {
    console.log("Displaying Slide 1.5");
    placeholderImage("slide1_5.png");
}

function slide1_6() {
    console.log("Displaying Slide 1.6");
}

function placeholderImage(imgName) {
    var placeholder = $("<img id='placeholder' width='100%'>");
    placeholder.attr("src", imgName);
    $("#graphic").append(placeholder);
}