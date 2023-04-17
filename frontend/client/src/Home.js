import { useEffect, useState } from 'react';

import ForceGraph from './components/ForceGraph';

const Home = () => {
  const [nodes, setNodes] = useState(null);
  const [links, setLinks] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/courses/subject/Mathematics')
    .then(response => response.json())
    .then(courses => {
      setNodes(courses.map(course => {
        return {
          id: `${course.subject} ${course.number}`,
          number: course.number,
          subject: course.subject,
          description: course.description,
          level: course.level,
          name: course.name,
          units: course.units
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
      <h1>UCLA Mathematics Courses</h1>
      {nodes && links && <ForceGraph nodes={nodes} links={links} />}
    </div>
  );
};

export default Home;
