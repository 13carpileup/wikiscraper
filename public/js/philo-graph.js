function createGraph(path) {
    // Create nodes and links from the path
    const nodes = path.map((name, index) => ({
      id: index,
      name: name
    }));

    const links = path.slice(0, -1).map((_, index) => ({
      source: index,
      target: index + 1
    }));

    // Set up the SVG
    const width = document.getElementById('graph').clientWidth;
    const height = 400;

    const svg = d3.select('#graph')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Create a group that will contain all the graph elements
    const g = svg.append('g');

    // Define arrow marker
    svg.append('defs').append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 20)
      .attr('refY', 0)
      .attr('markerWidth', 8)
      .attr('markerHeight', 8)
      .attr('orient', 'auto')
      .append('path')
      .attr('fill', '#93c5fd')
      .attr('d', 'M0,-5L10,0L0,5');

    // Add links
    const link = g.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#93c5fd')
      .attr('stroke-width', 2)
      .attr('marker-end', 'url(#arrow)');

    // Create node groups
    const node = g.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    // Add circles for nodes
    node.append('circle')
      .attr('r', 6)
      .attr('fill', '#2563eb');

    // Add labels
    node.append('text')
      .text(d => d.name)
      .attr('x', 8)
      .attr('y', 4)
      .attr('font-family', 'sans-serif')
      .attr('font-size', '12px')
      .attr('fill', '#1e293b');

    // Create the simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // Add zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.5, 2])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Drag functions
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Update positions on tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      const newWidth = document.getElementById('graph').clientWidth;
      svg.attr('width', newWidth);
      simulation.force('center', d3.forceCenter(newWidth / 2, height / 2));
      simulation.alpha(0.3).restart();
    });
  }
