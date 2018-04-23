var curtain;
var stopXCoord;

function slide2() {
    console.log("Displaying Slide 2.1");
    var placeholder = $("<img id='placeholder' width='100%'>");
    placeholder.attr("src", "slide2_1.jpg");
    $("#graphic").append(placeholder);
}

function slide2_2() {
    console.log("Displaying Slide 2.2");
    var config = {
        resNames: ["ISB", "SHA", "INV"],
        resColors: ["#0DC1F2", "#0D7AC4", "#0B55C4"],
        beginDate: "January 2003",
        endDate: "November 2016",
        pauseDate: "November 2012",
        stopDate: "November 2016"
    };
    makeLineChart("#graphic", "historical_data.json", config, function (progress) { curtain = progress["curtain"];
    stopXCoord = progress["stopDateXCoord"]; console.log(progress)});
}

function slide2_3() {
    console.log("Displaying Slide 2.3");
    curtain.transition().duration(2000).ease("linear").attr("x", stopXCoord);
}