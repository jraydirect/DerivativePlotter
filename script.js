var canvas = document.getElementById("plotCanvas");
var ctx = canvas.getContext("2d");
var tooltip = document.getElementById("tooltip");

document.getElementById("plotBtn").addEventListener("click", function() {
    var width = canvas.width;
    var height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    var funcStr = document.getElementById("functionSelect").value;
    var func = new Function("x", "return " + funcStr);

    // Calculate derivative
    var h = 0.0001; // Small increment for calculating derivative
    var derivative = function(x) {
        return (func(x + h) - func(x)) / h;
    };

    // Plot original function
    ctx.beginPath();
    ctx.strokeStyle = document.getElementById("plotColor").value;
    ctx.lineWidth = 2;
    var lineStyle = document.getElementById("lineStyle").value;
    if (lineStyle === "dashed") {
        ctx.setLineDash([5, 5]);
    } else if (lineStyle === "dotted") {
        ctx.setLineDash([2, 2]);
    }
    for (var x = -width / 2; x < width / 2; x++) {
        var y = -func(x / 50) * 50;
        ctx.lineTo(width / 2 + x, height / 2 + y);
    }
    ctx.stroke();

    // Plot derivative
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    for (var x = -width / 2; x < width / 2; x++) {
        var y = -derivative(x / 50) * 50;
        ctx.lineTo(width / 2 + x, height / 2 + y);
    }
    ctx.stroke();
});

document.getElementById("plotCanvas").addEventListener("mousemove", function(event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    var funcStr = document.getElementById("functionSelect").value;
    var func = new Function("x", "return " + funcStr);

    var mouseX = (x - canvas.width / 2) / 50;
    var mouseY = func(mouseX);

    tooltip.style.left = event.pageX + 10 + "px";
    tooltip.style.top = event.pageY + 10 + "px";
    tooltip.innerHTML = "X: " + mouseX.toFixed(2) + ", Y: " + mouseY.toFixed(2);
    tooltip.style.display = "block";
});

document.getElementById("plotCanvas").addEventListener("mouseout", function() {
    tooltip.style.display = "none";
});

document.getElementById("exportBtn").addEventListener("click", function() {
    var link = document.createElement('a');
    link.download = 'plot.png';
    link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    link.click();
});