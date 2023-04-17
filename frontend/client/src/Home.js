import { useEffect, useState } from 'react';
import * as d3 from 'd3';

import ForceGraph from './components/ForceGraph';

const Home = () => {
  const [nodes, setNodes] = useState(null);
  const [links, setLinks] = useState(null);
  /*
  let nodes = [
    {id: 'COM SCI M146'},
    {id: 'COM SCI 32'},
    {id: 'COM SCI 31'},
    {id: 'EC ENGR C147'},
    {id: 'EC ENGR 131A'},
    {id: 'EC ENGR 102'},
    {id: 'MATH 33A'},
    {id: 'MATH 33B'},
    {id: 'MATH 32A'},
    {id: 'MATH 32B'}
  ];

  let links = [
    { source: 'COM SCI M146', target: 'EC ENGR C147' },
    { source: 'EC ENGR 131A', target: 'EC ENGR C147' },
    { source: 'COM SCI 32', target: 'COM SCI M146' },
    { source: 'EC ENGR 131A', target: 'COM SCI M146' },
    { source: 'MATH 33A', target: 'COM SCI M146' },
    { source: 'COM SCI 31', target: 'COM SCI 32' },
    { source: 'EC ENGR 102', target: 'EC ENGR 131A' },
    { source: 'MATH 32B', target: 'EC ENGR 102' },
    { source: 'MATH 33B', target: 'EC ENGR 102' },
    { source: 'MATH 32A', target: 'MATH 33A' },
    { source: 'MATH 32A', target: 'MATH 32B' }
  ];
  */

  useEffect(() => {
    fetch('http://localhost:4000/api/courses/subject/Mathematics')
    .then(response => response.json())
    .then(courses => {
      setNodes(courses.map(course => {
        return {
          id: `${course.subject} ${course.number}`
        };
      }));
    })
    fetch('http://localhost:4000/api/requisites/source/subject/Mathematics')
    .then(response => response.json())
    .then(requisites => {
      setLinks(requisites.map(requisite => {
        return {
          source: `${requisite.source_subject} ${requisite.source_number}`,
          target: `${requisite.target_subject} ${requisite.target_number}`
        };
      }));
    })
  }, []);

  return (
    <div className='Home'>
      <h1>Hello world!</h1>
      {nodes && links && <ForceGraph nodes={nodes} links={links} />}
    </div>
  );
};

export default Home;
