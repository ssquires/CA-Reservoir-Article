function slide2() {
    console.log("Displaying Slide 2");
    $("#graphic").append('<svg id="fillgauge5" width="100%" height="200" onclick="gauge5.update(NewValue());"></svg>');
    
    var config4 = liquidFillGaugeDefaultSettings();
    config4.circleThickness = 0.05;
    config4.circleColor = "#0D7AC4";
    config4.textColor = "navy";
    config4.waveTextColor = "navy";
    config4.waveColor = "#0D7AC4";
    config4.textVertPosition = 0.8;
    config4.waveAnimateTime = 1000;
    config4.waveHeight = 0.05;
    config4.waveAnimate = true;
    config4.waveRise = false;
    config4.waveHeightScaling = false;
    config4.waveOffset = 0.25;
    config4.textSize = 0.75;
    config4.waveCount = 2;
    var gauge5 = loadLiquidFillGauge("fillgauge5", 60.44, config4);
}

