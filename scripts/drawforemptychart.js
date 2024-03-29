var viewportwidth = window.innerWidth;
if (viewportwidth == 1280) {
  // ширина окна равна, 1280px
  var hgh = 300;
  alert("as");
} else if (viewportwidth >= 1280) {
  var hgh = 450;

} else if (viewportwidth == 768) {
  // ширина окна равна, 768px
  var hgh = 250;
} else {
  var hgh = 250;
}
console.log(viewportwidth);
console.log(hgh);

var width = 450,
  height = hgh,
  radius = Math.min(width, height) / 2,
  innerRadius = 0.1 * radius;


var pie = d3.layout.pie()
  .sort(null)
  .value(function (d) {
    return d.width;
  });


var arc = d3.svg.arc()
  .innerRadius(innerRadius)
  .outerRadius(function (d) {
    return (radius - innerRadius) * (d.data.score / 10.0) + innerRadius;
  });

var outlineArc = d3.svg.arc()
  .innerRadius(innerRadius)
  .outerRadius(radius);

var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")



d3.csv('../data/empty-data.csv', function (error, data) {

  data.forEach(function (d) {
    d.id = d.id;
    d.order = +d.order;
    d.color = d.color;
    d.weight = +d.weight;
    d.score = +d.score;
    d.width = +d.weight;

  });

  /* little-circle */

  var path = svg.selectAll(".solidArc")
    .data(pie(data))
    .enter().append("path")
    .attr("fill", function (d) {
      return d.data.color;
    })
    .attr("class", "solidArc")
    .attr("stroke", "gray")

    .attr("d", arc)

  /* big-circle */
  var outerPath = svg.selectAll(".outlineArc")
    .data(pie(data))
    .enter().append("path")
    .attr("fill", "none")
    .attr("stroke", "#fff")
    .style('stroke-width', '2px')
    .style('fill', '2px')
    .attr("class", "outlineArc")
    .attr("d", outlineArc);


  // calculate the weighted mean score
  /*   var score =
      data.reduce(function (a, b) {
        console.log('a:' + a + ', b.score: ' + b.score + ', b.weight: ' + b.weight);
        return a + (b.score * b.weight);
      }, 0) /
      data.reduce(function (a, b) {
        return a + b.weight;
      }, 0); */
});