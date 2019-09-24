# Svgjs

## Getting Started

Svg2.js is a JS library for creating SVG dynamically and using in your HTML.

```
 <script src="Svg2.js"></script>
 <script>
  // on this HTML document is loaded.
  function onload() {
    // Create the container for SVG shapes.
    var c = new SvgContainer(640, 480);
    // Create a circle.
    var circle1 = new SvgCircle(240, 240, 220);
    // Change options of the circle.
    circle1.borderWidth = 2;
    circle1.fgColor = "blue";
    circle1.bgColor = "#f0f0ff";
    // Add the circle to the container.
    c.add(circle1);
    // Insert the HTML converted to SVG for the element identified by the "circles".
    SvgContainer.setSvgById("circles", c.toString());
  }
 </script>
</head>

<body onload="onload()">
  ...

 <div id="circles"></div>
  ...

```
