import React from 'react';

const NewCharLocForm = (props) => {
  return (
    <div className="char-loc-createform">
      <form onSubmit={props.handleCharLocSubmit}>
        <input
          type="text"
          name="name"
          value={props.name}
          placeholder="name"
          onChange={props.handleInputChange}
        />
        <input
          type="text"
          name="description"
          value={props.description}
          placeholder="description"
          onChange={props.handleInputChange}
        />
        <input type="submit" value="Submit" />
        <button onClick={props.toggleCreateNew}>Cancel</button>
      </form>
    </div>
  )
}

export default NewCharLocForm;