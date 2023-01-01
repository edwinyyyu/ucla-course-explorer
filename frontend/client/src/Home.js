import * as d3 from 'd3';

import ForceGraph from './components/ForceGraph';

const Home = () => {
  const nodes = d3.range(50).map((n) => {
    return { id: n, r: 5 }
  });

  const links = d3.range(50).map((n) => {
    return { source: n, target: 5 }
  });

  return (
    <div className='Home'>
      <h1>Hello world!</h1>
      <ForceGraph nodes={nodes} links={links} />
    </div>
  );
};

export default Home;
