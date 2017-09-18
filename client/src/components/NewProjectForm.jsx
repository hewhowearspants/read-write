import React from 'react';

const NewProjectForm = (props) => {
  return (
    <div className="projectcreateform">
      <form onSubmit={props.handleProjectSubmit}>
        <input
          type="text"
          name="projectTitle"
          value={props.projectTitle}
          placeholder="title"
          onChange={props.handleInputChange}
        />
        <input
          type="text"
          name="projectSubtitle"
          value={props.projectSubtitle}
          placeholder="subtitle"
          onChange={props.handleInputChange}
        />
        <input
          type="text"
          name="projectSynopsis"
          value={props.projectSynopsis}
          placeholder="synopsis"
          onChange={props.handleInputChange}
        />
        <input type="submit" value="Submit" />
        <button onClick={props.toggleCreateProject}>Cancel</button>
      </form>
    </div>
  )
}

export default NewProjectForm;