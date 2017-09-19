import React from 'react';

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
        <input type='submit' value='Submit' />
        <button onClick={props.toggleCreateChapter}>Cancel</button>
      </form>
    </div>
  )
}

export default NewChapterForm;