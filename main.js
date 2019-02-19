var width = 960,
    height = 1160

var svg = d3.select('body').append('svg')
    .attr("width", width)
    .attr("height", height)

var projection = d3.geoAlbers()
    .center([0, 55.4])
    .rotate([4.4, 0])
    .parallels([50, 60])
    .scale(5000)
    .translate([width / 2, height / 2])

var path = d3.geoPath()
    .projection(projection)

d3.json("uk.json", function(error, uk) {
    if (error) return console.error(error)
  
    svg.selectAll('.subunit')
        .data(topojson.feature(uk, uk.objects.subunits).features)
        .enter().append('path')
        .attr('class', function(d) {return 'subunit ' + d.id})
        .attr('d', path)

    svg.append('path')
        .datum(topojson.mesh(uk, uk.objects.subunits, function(a, b) { return a !== b && a.id !== "IRL"; }))
        .attr("d", path)
        .attr("class", "subunit-boundary")

    svg.append("path")
        .datum(topojson.mesh(uk, uk.objects.subunits, function(a, b) { return a === b && a.id === "IRL"; }))
        .attr("d", path)
        .attr("class", "subunit-boundary IRL")
})