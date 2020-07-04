// these are the imports used in the solutions
// you can use others if you wish
import {select} from 'd3-selection';
import {scaleLinear} from 'd3-scale';
import {axisBottom} from 'd3-axis';
import {max} from 'd3-array';

export default function Chart1Rug() {
  fetch('./data/cars.json')
    .then(d => d.json())
    .then(d => rug(d));
}

// constants
const height = 150;
const width = 600;
const margin = {left: 10, top: 50, right: 10, bottom: 10};
const plotWidth = width - margin.left - margin.right;
const field = 'Displacement';
const lineHeight = 20;
const lineWidth = 2;
function rug(data) {
  // 1. construct a container and appropriate scale
  // YOUR WORK HERE  - approx 9 lines
  const svg = select('#chart-container') 
    .append('svg')
	.attr('height', height)
	.attr('width', width)
	.append('g');
	
  const domMax = max(data, val => val[field]);
  const scale = scaleLinear()
    .domain([0, domMax])
	.range([0, plotWidth]);
  // 2. render the lines
  // YOUR WORK HERE - approx 9 lines
  svg.selectAll('rect')
    .data(data)
	.join('rect')
	.attr('x', val => scale(val[field]))
	.attr('height', lineHeight)
	.attr('width', lineWidth)
	.attr('fill', 'steelblue')
	.attr('transform', 'translate(10, 60)');

  // 3. add axes and labels
  // YOUR WORK HERE - approx 5 lines
  const axis = axisBottom(scale);
  svg.append('g')
    .attr('transform', 'translate(10, 72.5)')
	.call(axis);
  svg.append('text')
    .attr('transform', 'translate(10, 30)')
    .text('Displacement');
}
