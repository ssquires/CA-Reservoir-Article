var historicalData;
var resNames = [];
var arc;
var gauges = {};

function makePieCharts(dataFile, width, height, maxCharts) {
    // Read in data from file
    d3.json(dataFile, function(err, resData) {
        if (err) return console.error(err);
        historicalData = resData;
    
        var radius = Math.min(width, height) / 2;
        
        var color = d3.scaleOrdinal().range(["#2BC8F2", "#1D2731"]);

        arc = d3.arc().outerRadius(radius - 10)
                  .innerRadius(0);
        
        // Create pie charts
        var chartNum = 0;
        for (var key in resData[0]) {
            if (key === "PDSI") {
                continue;
            }
            if (key === "date") {
                $("#date").text(resData[0][key]);
                continue;
            }
            if (chartNum >= maxCharts) {
                break;
            }

            resNames.push(key);
            // Create a new div for the chart
            var d = $("<div id='chart" + chartNum + "' class='chart'><h2 class='res-name'>" + key + "</h2></div>");
            $("#graphic").append(d);

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
    });
}

function makeFillGauges(dataFile, width, height, maxCharts, containerDiv, mapDivID) {
    // Read in data from file
    d3.json(dataFile, function(err, resData) {
        if (err) return console.error(err);
        historicalData = resData;
        
        // Create fill gauges
        var chartNum = 0;
        for (var key in resData[0]) {
            if (key === "PDSI") {
                continue;
            }
            if (key === "date") {
                $("#date").text(resData[0][key]);
                continue;
            }
            if (chartNum >= maxCharts) {
                break;
            }

            var chartDiv = $("<div class='chart'></div>");
            containerDiv.append(chartDiv);
            resNames.push(key);
            var label = $("<h2 class='res-name' id='label-" + key + "'>" + key + "</h2>");
            chartDiv.append(label);
            
            var chartID = "chart-" + key;
            // Create a new div for the chart
            var d = $("<svg class='chartSVG' id='" + chartID + "' width='" + width + "' height='" + height + "' onclick='gauge5.update(NewValue());'></svg>");
            chartDiv.append(d);
            d.mouseover(function(e) {
                console.log("mouseover");
                var resName = e.target.id.split("-")[1];
                console.log(resName)
                $("#" + resName).attr("style", "fill: orange; stroke: orange;");
                console.log($("#" + resName));
                $("#" + e.target.id + " circle").attr("style", "fill: orange;");
                $("#" + e.target.id + " path").attr("style", "fill: orange;");
            });
            d.mouseout(function(e) {
                var resName = e.target.id.split("-")[1];
                $("#" + resName).attr("style", "fill: #FFF; stroke: #FFF;");
                $("#" + e.target.id + " circle").attr("style", "fill: #0D7AC4;");
                $("#" + e.target.id + " path").attr("style", "fill: #0D7AC4;");
            });
            
            var config = liquidFillGaugeDefaultSettings();
            config.circleThickness = 0.05;
            config.circleColor = "#0D7AC4";
            config.textColor = "navy";
            config.waveTextColor = "navy";
            config.waveColor = "#0D7AC4";
            config.textVertPosition = 0.8;
            config.waveAnimateTime = 2000;
            config.waveHeight = 0.05;
            config.waveAnimate = true;
            config.waveRise = false;
            config.waveHeightScaling = false;
            config.waveOffset = 0.25;
            config.textSize = 0.75;
            config.waveCount = 2;
            var gauge = loadLiquidFillGauge(chartID, resData[0][key][0]["percent"], config);
            
            gauges[key] = gauge;

            chartNum++;
        }
        if (mapDivID) {
            makeMap(mapDivID);
        }
    });
}

function makeSlider(dataFile, containerDiv) {
    var dateLabel = $("<h2 id='date'>January 2003</h2>");
    // Create date range slider
    d3.json(dataFile, function(err, resData) {
        var sliderMax = resData.length - 1;
        var s = $("<input type='range' min='0' max='" + sliderMax + "' value='0' class='slider' oninput='updateData(this.value)'>");
        containerDiv.append(dateLabel);
        containerDiv.append(s);
    });
}

function updateData(index) {
    $("#date").text(historicalData[index]["date"]);
    for (var j = 0; j < resNames.length; j++) {
        var gauge = gauges[resNames[j]];
        var percentFull = historicalData[index][resNames[j]][0]["percent"];
        gauge.update(percentFull.toFixed(1));
    }
}

function arcTween(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
        return arc(i(t));
    };
}




///////////////////////////////////////////////////////////////////////////////
//////////////////////// DATA READING AND MAP DRAWING /////////////////////////
///////////////////////////////////////////////////////////////////////////////
function makeMap(containerDivID) {
    d3.json("ca_counties.geojson", function(err, data) {
        if (err) return console.error(err);

        var width = 220, height = 300;
        // SVG Canvas
        var svg = d3.select(containerDivID).append('svg').attr('viewBox', '0 0 ' + width + ' ' + height).attr('width', '200px') ;
                                                       
        // Calculated Scale for Map Overlay
        var scale = 1215;

        // Map
        var projection = d3.geo.mercator()
                .center([-119.3,37.786874])
                .scale(scale)
                .translate([width/2, height/2]);

        // Path Generator to draw regions on map
        var path = d3.geo.path().projection(projection);

        // Get features from JSON
        var features = data.features;
        // Create SVG paths to draw zip code boundaries
        svg.selectAll('.ca')
            .data(features)
            .enter().append('path')
            .attr('d', path)
            .attr("stroke", "#0D7AC4")
            .attr("fill", "#0D7AC4")
            .attr("stroke-width", "1")
            .attr("id", "ca-map");
        
        d3.json("reservoir_data.json", function(err, data) {
            console.log(data);
            svg.selectAll('.res')
            .data(data.filter(function(resObj) {
                return resNames.includes(resObj.Name);
            }))
            .enter().append('circle')
            .attr('cx', function (d) { return projection([d.Longitude, d.Latitude])[0]})
            .attr('cy', function (d) { return projection([d.Longitude, d.Latitude])[1]})
            .attr('r', '3px')
            .attr('fill', '#FFF')
            .attr('stroke', '#FFF')
            .attr('id', function(d) { return d.Name })
            .attr('class', 'res')
            .on("mouseover", reservoirMouseover)
            .on("mouseout", reservoirMouseout);
            
        });
    });
}

var tooltip = d3.select("body")
		      .append("div")
    		  .attr("class", "tooltip")
    		  .style("opacity", 1)
              .style("border-radius", "8px");

function makeTooltipHTML(d) {
    var name = d.LakeName + ' (' + d.Name + ')';
    var html = "<p><strong>" + name + "</strong></p>"
    return html;
}
            
function reservoirMouseover(d) {
   tooltip.transition().duration(200).style("opacity", 0.9);
    tooltip.html(makeTooltipHTML(d))  
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY) - 30 + "px")
            .style("color","white")
            .style("background-color", "rgba(0, 0, 0, 0.5)")
            .style("pointer-events", "auto");
    
    $("#chart-" + d.Name + " circle").attr("style", "fill: orange;");
    $("#chart-" + d.Name + " path").attr("style", "fill: orange;");
    $("#" + d.Name).attr("style", "fill: orange; stroke: orange;");
} 

function reservoirMouseout(d) {
    tooltip.transition().duration(500).style("opacity", 0).style("pointer-events", "none");
    $("#chart-" + d.Name + " circle").attr("style", "fill: #0D7AC4;");
    $("#chart-" + d.Name + " path").attr("style", "fill: #0D7AC4;");
    $("#" + d.Name).attr("style", "fill: #FFF; stroke: #FFF;");
}

///////////////////////////////////////////////////////////////////////////////
//////////////////////// LINE CHARTS /////////////////////////
///////////////////////////////////////////////////////////////////////////////

function makeLineChart(containerDivID, dataFile, resNames, resColors, pauseDate, stopDate, callback) {
    var margin = {top: 30, right: 20, bottom: 30, left: 50};
    
    var width = 500, height = 200;
    var svg = d3.select(containerDivID)
                .append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .attr("id", "line-graph")
                .append("g")
                    .attr("transform", 
                    "translate(" + margin.left + "," + margin.top + ")");
    
    var x = d3.time.scale().rangeRound([0, width]);
    var y = d3.scale.linear().rangeRound([height, 0]);
    
    var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

    var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);
    
    var parseDate = d3.time.format("%B %Y").parse
    
    
    
    d3.json(dataFile, function(err, data) {
        if (err) return console.error(err);
        
        x.domain(d3.extent(data, function(d) {
            return parseDate(d["date"])}));
        y.domain([0, 100]);
        
        var pauseDateXCoord = x(parseDate(pauseDate));
        var stopDateXCoord = x(parseDate(stopDate));

        var totalLength;
        for (var i = 0; i < resNames.length; i++) {
            var resName = resNames[i];
            var resColor = resColors[i];
            var line = d3.svg.line()
                .x(function(d) { return x(parseDate(d["date"])) })
                .y(function(d) { return y(d[resName][0]["percent"])});
            var path = svg.append("path").attr("class", "line")
                .attr("fill", "none")
                .attr("stroke", resColor)
                .attr("stroke-width", 2)
                .attr("d", line(data));
        }
        
        var curtain = svg.append("rect")
            .attr("fill", "#FFF")
            .attr("stroke", "none")
            .attr("width", width)
            .attr("height", height)
            .attr("x", 0);
    
        curtain.transition().duration(6000).ease("linear").attr("x", pauseDateXCoord);
        
        

        svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);
        
        svg.append("g").attr("class", "y axis").call(yAxis);
        
        callback({"curtain": curtain, "stopDateXCoord": stopDateXCoord});
    });
    
}