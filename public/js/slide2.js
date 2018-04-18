var curtain;
var stopXCoord;

function slide2() {
    console.log("Displaying Slide 2");
    var config = {
        resNames: ["EXC", "ORO", "COY"],
        resColors: ["#0DC1F2", "#0D7AC4", "#0B55C4"],
        beginDate: "January 2010",
        endDate: "December 2016",
        pauseDate: "June 2014",
        stopDate: "June 2016"
    };
    makeLineChart("#graphic", "historical_data.json", config, function (progress) { curtain = progress["curtain"];
    stopXCoord = progress["stopDateXCoord"]; console.log(progress)});
    
}

function slide2_2() {
    curtain.transition().duration(2000).ease("linear").attr("x", stopXCoord);
}
