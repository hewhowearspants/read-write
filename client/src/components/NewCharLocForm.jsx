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
        <div className='buttons'>
          <button className='submit-button' type="submit" title="Submit"><i className="fa fa-share" aria-hidden="true"></i></button>
          <button className='cancel-button' onClick={props.toggleCreateNew} title="Cancel"><i className="fa fa-times" aria-hidden="true"></i></button>
        </div>
      </form>
    </div>
  )
}

export default NewCharLocForm;