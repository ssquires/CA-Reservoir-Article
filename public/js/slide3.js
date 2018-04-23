function slide3() {
    console.log("Displaying Slide 3");
    var vizContainer = $("<div id='vizContainer'></div>");
    var gaugesDiv = $("<div id='gauges'></div>");
    var mapDiv = $("<div id='map'></div>");
    var sliderDiv = $("<div id='slider'></div>");
    $("#graphic").append(vizContainer);
    vizContainer.append(mapDiv);
    vizContainer.append(gaugesDiv);
    $("#graphic").append(sliderDiv);
    makeFillGauges("historical_data.json", 70, 70, 12, gaugesDiv, "#map");
    makeSlider("historical_data.json", sliderDiv);
}