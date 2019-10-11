var mq = window.matchMedia('(max-width: 1280px)');
console.log(mq);
if (mq.matches) {
  // ширина окна меньше, чем 1280px
  var hgh = 300;

} else {
  // ширина окна больше, чем 1280px

  var hgh = 450;

}

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
  .outerRadius(radius)


var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")



d3.csv('../data/prizma-data.csv', function (error, data) {

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
    .attr("stroke", "#cecece")
    .attr("d", arc)
    .on("click", function () {
      d3.select(this)
        .style("opacity", "0")
    })


  /* big-circle */
  var outerPath = svg.selectAll(".outlineArc")
    .data(pie(data))
    .enter().append("path")
    .attr("fill", "none")
    .attr("stroke", "#fff")
    .style('stroke-width', '3px')
    .style('fill', '0px')
    .attr("class", "outlineArc")
    .attr("d", outlineArc);

});