import React from 'react';

// form for creating new chapters
const NewChapterForm = (props) => {
  return (
    <div className="chaptercreateform">
      <form onSubmit={props.handleChapterSubmit}>
        <input
          type='text'
          name='chapterNumber'
          value={props.chapterNumber}
          placeholder='#'
          onChange={props.handleInputChange}
        />
        <input
          type='text'
          name='chapterTitle'
          value={props.chapterTitle}
          placeholder='title'
          onChange={props.handleInputChange}
        />
        <div className='buttons'>
          <button className='submit-button' type='submit' title="Submit"><i className="fa fa-share" aria-hidden="true"></i></button>
          <button className='cancel-button' onClick={props.toggleCreateChapter} title="Cancel"><i className="fa fa-times" aria-hidden="true"></i></button>
        </div>
      </form>
    </div>
  )
}

export default NewChapterForm;