function slide1() {
    console.log("Displaying Slide 1");
    var placeholder = $("<img id='placeholder' width='100%'>");
    placeholder.attr("src", "slide1.png");
    $("#graphic").append(placeholder);
}