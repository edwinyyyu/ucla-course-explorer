import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ForceGraph = ({ nodes, links }) => {
  const validLinks = links.filter(l =>
    nodes.filter(n => n.id === l.source).length > 0 &&
    nodes.filter(n => n.id === l.target).length > 0
  );

  const svgRef = useRef();
  const tooltipRef = useRef();

    useEffect(() => {
    const svg = d3.select(svgRef.current);

    const simulation = d3.forceSimulation(nodes)
      .force('center', d3.forceCenter(800, 600))
      .force('x', d3.forceX(800))
      .force('y', d3.forceY(600))
      .force('charge', d3.forceManyBody()
        .strength(Math.min(-100 + Math.sqrt(nodes.length), -10))
      )
      .force('link', d3.forceLink(validLinks)
        .id(d => d.id)
        .strength(1 / Math.log(validLinks.length))
      )
      .alphaTarget(0.3)
      .on('tick', () => {
        node
          .attr('cx', d => d.x)
          .attr('cy', d => d.y);
        link
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);
      });

    const link = svg.append('g')
      .selectAll('line')
      .data(validLinks)
      .join('line')
        .attr('stroke', '#88aa99')
        .attr('stroke-width', 1.5);

    const node = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
        .attr('r', 6)
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .attr('fill', color_level)
        .call(drag(simulation))
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseout', mouseout);

    const marker = svg.append('defs')
      .append('marker')
        .attr('id', 'directed-marker')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 18)
        .attr('refY', 0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto-start-reverse')
        .attr('fill', '#88aa99')
      .append('path')
        .attr('d', 'M0,-5 L10,0 L0,5');

    link.attr('marker-start', 'url(#directed-marker)');
  }, [nodes, validLinks]);

  const color_level = d => {
    console.log(d);
    if (d.level == 'Lower Division') {
      return '#33ff99';
    } else if (d.level == 'Upper Division') {
      return '#22aa66';
    } else {
      return '#115533';
    }
  };

  let dragging = false;
  const drag = simulation => {
    const drag_start = d => {
      if (!d.active) simulation.alphaTarget(0.3).restart();
      d.subject.fx = d.subject.x;
      d.subject.fy = d.subject.y;

      dragging = true;
      d3.select(tooltipRef.current)
        .style('visibility', 'hidden');
    };

    const dragged = d => {
      d.subject.fx = d.x;
      d.subject.fy = d.y;
    };

    const drag_end = d => {
      if (!d.active) simulation.alphaTarget(0);
      d.subject.fx = null;
      d.subject.fy = null;

      dragging = false;
    };

    return d3.drag()
      .on('start', drag_start)
      .on('drag', dragged)
      .on('end', drag_end);
  };

  const mouseover = (e, d) => {
    d3.select(e.target)
      .transition()
      .attr('r', 9)
      .attr('fill', '#bbffdd');

    if (!dragging) {
      d3.select(tooltipRef.current)
        .style('visibility', 'visible')
        .style('background-color', 'white')
        .style('width', '400px')
        .style('padding', '5px')
        .style('border-style', 'solid')
        .style('border-color', '#115533')
        .style('border-radius', '5px')
        .style('border-width', '2px')
        .style('color', '#115533')
        .style('font-family', 'sans-serif')
        .html(`${d.id}: ${d.name}<br>Units: ${d.units}<br>${d.description}`);
    }
  };

  const mousemove = (e) => {
    if (!dragging) {
      d3.select(tooltipRef.current)
        .style('position', 'absolute')
        .style('left', (e.pageX + 20) + 'px')
        .style('top', (e.pageY + 20) + 'px');
    }
  };

  const mouseout = (e) => {
    d3.select(e.target)
      .transition()
      .attr('r', 6)
      .attr('fill', color_level);

    if (!dragging) {
      d3.select(tooltipRef.current)
        .style('visibility', 'hidden');
    }
  };

  return (
    <div className='ForceGraph'>
      <svg ref={svgRef} width='1600' height='1200'></svg>
      <div ref={tooltipRef}></div>
    </div>
  );
};

export default ForceGraph;
