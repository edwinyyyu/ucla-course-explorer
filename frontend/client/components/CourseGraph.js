import { useEffect, useState } from 'react';

import ForceGraph from './ForceGraph';

const CourseGraph = () => {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/courses/subject/Computer_Science')
    .then(response => response.json())
    .then(courses => {
      setNodes(n => extend(n, courses.map(courseNode)));
    });
    fetch('http://localhost:4000/api/requisites/source/subject/Computer_Science')
    .then(response => response.json())
    .then(requisites => {
      setLinks(l => extend(l, requisites.map(requisiteLink)));
    });
    fetch('http://localhost:4000/api/courses/subject/Electrical_and_Computer_Engineering')
    .then(response => response.json())
    .then(courses => {
      setNodes(n => extend(n, courses.map(courseNode)));
    });
    fetch('http://localhost:4000/api/requisites/source/subject/Electrical_and_Computer_Engineering')
    .then(response => response.json())
    .then(requisites => {
      setLinks(l => extend(l, requisites.map(requisiteLink)));
    });
  }, []);

  return (
    <div className='CourseGraph'>
      <h1>UCLA Course Explorer</h1>
      {nodes && links && <ForceGraph nodes={nodes} links={links} />}
      <p>WIP</p>
    </div>
  );
};

const extend = (array1, array2) => array1.concat(array2);

const courseNode = course => ({
  id: `${course.subject} ${course.number}`,
  number: course.number,
  subject: course.subject,
  description: course.description,
  level: course.level,
  name: course.name,
  units: course.units
});

const requisiteLink = requisite => ({
  source: `${requisite.source_subject} ${requisite.source_number}`,
  target: `${requisite.target_subject} ${requisite.target_number}`
});

export default CourseGraph;
