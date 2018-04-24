function slide1() {
    console.log("Displaying Slide 1.1");
    makeWaterBuckets("#graphic", 25, 10, 20, 600, 300)
}

function slide1_2() {
    console.log("Displaying Slide 1.2");
    updateWaterBuckets(2200, 25, 10, 20);
}

function slide1_3() {
    console.log("Displaying Slide 1.3");
    updateWaterBuckets(800, 25, 10, 20);
}

function slide1_4() {
    console.log("Displaying Slide 1.4");
    updateWaterBuckets(240, 25, 10, 20);
}

function slide1_5() {
    console.log("Displaying Slide 1.5");
    updateWaterBuckets(16, 25, 10, 20);
}

function slide1_6() {
    console.log("Displaying Slide 1.6");
}

function placeholderImage(imgName) {
    var placeholder = $("<img id='placeholder' width='100%'>");
    placeholder.attr("src", imgName);
    $("#graphic").append(placeholder);
}