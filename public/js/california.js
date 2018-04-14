var resData;
var dataFile = "reservoirData.json";

var width = 150,
    height = 150,
    radius = Math.min(width, height) / 2;

var color = d3.scaleOrdinal().range(["#2BC8F2", "#1D2731"]);

var arc = d3.arc().outerRadius(radius - 10)
                  .innerRadius(0);

var resNames = [];




d3.json(dataFile, function(err, data) {
    if (err) return console.error(err);
    
    // Get features from JSON
    resData = data;
    createPieCharts();
    createSlider();
    createGraph();
});

function sliderMove(v) {
    updateData(v);
}

function createPieCharts() {
    // Create pie charts
    var chartNum = 0;
    for (var key in resData[0]) {
        console.log(key);
        console.log(resData[0][key]);
        if (key === "date") {
            $("#date").text(resData[0][key]);
            continue;
        }

        resNames.push(key);
        // Create a new div for the chart
        var d = $("<div id='chart" + chartNum + "' class='chart'><h2 class='res-name'>" + key + "</h2></div>");
        $("#pieChart").append(d);

        // Add pie chart to pies array
        var pie = d3.pie()
                .value(function(d) { return d.percent }).sort(null)(resData[0][key]);

        // Add pie chart to div
        var svg = d3.select("#chart" + chartNum)
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", 
                      "translate(" + width / 2 + 
                      "," + height / 2 + ")");

        var g = svg.selectAll("arc").data(pie).enter().append("g").attr("class", "arc");

        g.append("path").attr("d", arc)
                    .style("fill", function(d) { return color(d.data.name);})
                    .each(function(d) { this._current = d; });

        var percentLabel = $("<h3 id='label" + chartNum + "'>" + resData[0][key][0]["percent"] +"%</h3>");
        d.append(percentLabel);

        chartNum++;
    }
}

function createSlider() {
    // Create date range slider
    var sliderMax = resData.length - 1;
    var s = $("<input type='range' min='0' max='" + sliderMax + "' value='0' class='slider' oninput='sliderMove(this.value)'>");
    $("#sliderContainer").append(s);
}

function createGraph() {
    
}

function updateData(index) {
    $("#date").text(resData[index]["date"]);
    for (var j = 0; j < resNames.length; j++) {
        var reservoirData = resData[index][resNames[j]];
        var pie = d3.pie().value(function(d) { return d.percent;}).sort(null)(reservoirData);
        
        path = d3.select("#chart" + j).selectAll("path").data(pie);
        path.transition().duration(500).attrTween("d", arcTween);
        
        $("#label" + j).text(reservoirData[0]["percent"] + "%");
    }
}



/*************************************
 *        HELPER FUNCTIONS           *
 *************************************/

function arcTween(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
        return arc(i(t));
    };
}
