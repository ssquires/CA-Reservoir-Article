var curtain;
var stopXCoord;

function slide2() {
    console.log("Displaying Slide 2");
    makeLineChart("#graphic", "historical_data.json", ["EXC", "ORO", "COY"], ["#0DC1F2", "#0D7AC4", "#0B55C4"], "June 2014", "December 2014", function (progress) { curtain = progress["curtain"];
    stopXCoord = progress["stopDateXCoord"]; console.log(progress)});
    
}

function slide2_2() {
    curtain.transition().duration(2000).ease("linear").attr("x", stopXCoord);
}
