'use client'

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Background = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    // Ensure the SVG fills the viewport
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      d3.select(svgRef.current).attr('width', width).attr('height', height);
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions(); // Initial dimension set

    const svg = d3.select(svgRef.current);

    // Function to create ripples
    function createRipple(event) {
      const [x, y] = d3.pointer(event, svgRef.current);
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Edge detection: Allow ripples only within 60 pixels of the screen edges
      const edgeThreshold = 360; // Pixels from each edge where ripples are allowed

      // Check if the event is within 60 pixels of any edge
      const isNearEdge =
        x <= edgeThreshold ||
        x >= width - edgeThreshold ||
        y <= edgeThreshold ||
        y >= height - edgeThreshold;

      if (isNearEdge) {
        // Generate multiple circles for a single ripple to enhance the fluid effect
        for (let i = 0; i < 3; i++) {
          const delay = i * 100; // Stagger the start of each circle's animation
          const initialRadius = i * 2; // Slightly larger initial radius for subsequent circles

          svg.append('circle')
          .attr('cx', x)
          .attr('cy', y)
          .attr('r', 1 + initialRadius)
          .style('stroke', 'white')
          .style('stroke-opacity', 0.8 - i * 0.3) // Decrease opacity for subsequent circles
            .style('fill', 'none')
            .transition()
          .delay(delay)
          .duration(2000 + delay) // Longer duration for a smoother, more gradual expansion
            .ease(d3.easeCubicOut)
            .attr('r', 100 + initialRadius * 10) // Larger final radius for a more expansive ripple
            .style('stroke-opacity', 0)
            .remove();
        }
      }
    }

    // Binding the event listener
    svg.on('mousemove', createRipple);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', updateDimensions);
      svg.on('mousemove', null);
    };
  }, []);

  return <svg ref={svgRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, width: '100%', height: '100%' }} />;
};

export default Background;
