import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const SVG_WIDTH = 1600;
const SVG_HEIGHT = 1200;

const ALPHA_TARGET = 0.3;

const ForceGraph = ({ nodes, links }) => {
  let validLinks = links.filter(l =>
    nodes.filter(n => n.id === l.source).length > 0 &&
    nodes.filter(n => n.id === l.target).length > 0
  );

  const containerRef = useRef(null);

  useEffect(() => {
    const graphCleanup = graph(containerRef.current, nodes, validLinks);

    return () => {
      graphCleanup();
    };
  }, [nodes, validLinks]);

  return (
    <div ref={containerRef} className='ForceGraph'/>
  );
};

const colorLevel = level => {
  if (level == 'Lower Division') {
    return '#33ff99';
  } else if (level == 'Upper Division') {
    return '#22aa66';
  } else {
    return '#115533';
  }
};

const graph = (container, nodes, links) => {
  const svg = d3.select(container).append('svg')
    .attr('width', SVG_WIDTH)
    .attr('height', SVG_HEIGHT);

  const simulation = d3.forceSimulation(nodes)
    .alphaTarget(ALPHA_TARGET)
    .force('center', d3.forceCenter(SVG_WIDTH / 2, SVG_HEIGHT / 2))
    .force('x', d3.forceX(SVG_WIDTH / 2))
    .force('y', d3.forceY(SVG_HEIGHT / 2))
    .force('charge', d3.forceManyBody()
      .strength(Math.min(-10, -100 + Math.sqrt(nodes.length)))
    )
    .force('link', d3.forceLink(links)
      .id(d => d.id)
      .strength(1 / Math.log(links.length))
    )

  const link = svg.append('g')
    .selectAll('line')
    .data(links)
    .join('line')
      .attr('class', 'graphLink');

  const node = svg.append('g')
    .selectAll('circle')
    .data(nodes)
    .join('circle')
      .attr('class', 'graphNode')
      .attr('r', 6)
      .attr('fill', d => colorLevel(d.level));

  const marker = svg.append('defs')
    .append('marker')
      .attr('id', 'dirMarker')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 18)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto-start-reverse')
    .append('path')
      .attr('d', 'M0,-5 L10,0 L0,5');

  link.attr('marker-start', 'url(#dirMarker)');

  const tooltip = d3.select(container).append('div')
    .attr('id', 'graphTooltip')
    .style('visibility', 'hidden');

  let dragging = false;
  const drag = () => {
    const drag_start = d => {
      d.subject.fx = d.subject.x;
      d.subject.fy = d.subject.y;
      dragging = true;
      tooltip
        .style('visibility', 'hidden');
    };

    const dragged = d => {
      d.subject.fx = d.x;
      d.subject.fy = d.y;
    };

    const drag_end = d => {
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
      tooltip
        .style('visibility', 'visible')
        .html(`${d.id}: ${d.name}<br>Units: ${d.units}<br>${d.description}`);
    }
  };

  const mousemove = e => {
    if (!dragging) {
      tooltip
        .style('left', (e.pageX + 20) + 'px')
        .style('top', (e.pageY + 20) + 'px');
    }
  };

  const mouseout = (e) => {
    d3.select(e.target)
      .transition()
      .attr('r', 6)
      .attr('fill', d => colorLevel(d.level));

    if (!dragging) {
      tooltip
        .style('visibility', 'hidden');
    }
  };

  simulation.on('tick', () => {
    node
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);

    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);
  });

  node.call(drag())
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseout', mouseout);

  return () => {
    simulation.stop();
    d3.select(container).selectAll('svg').remove();
    d3.select(container).selectAll('div').remove();
  };
};

export default ForceGraph;
