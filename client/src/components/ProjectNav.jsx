import React from 'react';

// nav bar for selecting project components
const ProjectNav = (props) => {
  return (
    <div className='project-nav'>
      <ul>
        <li onClick={() => props.setPage('synopsis')} className={props.currentPage === 'synopsis' ? 'selected' : ''}>
          Synopsis
        </li>
        <li onClick={() => props.setPage('chapters')} className={props.currentPage === 'chapters' ? 'selected' : ''}>
          Chapters
        </li>
        <li onClick={() => props.setPage('characters')} className={props.currentPage === 'characters' ? 'selected' : ''}>
          Characters
        </li>
        <li onClick={() => props.setPage('locations')} className={props.currentPage === 'locations' ? 'selected' : ''}>
          Locations
        </li>
      </ul>
    </div>
  )
}

export default ProjectNav;