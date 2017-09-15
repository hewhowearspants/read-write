import React, { Component } from 'react';

class FeedbackModal extends Component {
  render() {
    if (!this.props.show) {
      return null;
    }

    return(
      <div className='modal-backdrop'>
        <div className='feedback-modal'>
          <p>What did you think of the book?</p>
          <form>
            <div className='rating'>
              <input onChange={this.props.handleInputChange} className="star star-5" id="star-5" type="radio" name="bookRating" value='5'/>
              {/* <label className="star star-5" for="star-5"></label> */}
              <input onChange={this.props.handleInputChange} className="star star-4" id="star-4" type="radio" name="bookRating" value='4'/>
              {/* <label className="star star-4" for="star-4"></label> */}
              <input onChange={this.props.handleInputChange} className="star star-3" id="star-3" type="radio" name="bookRating" value='3'/>
              {/* <label className="star star-3" for="star-3"></label> */}
              <input onChange={this.props.handleInputChange} className="star star-2" id="star-2" type="radio" name="bookRating" value='2'/>
              {/* <label className="star star-2" for="star-2"></label> */}
              <input onChange={this.props.handleInputChange} className="star star-1" id="star-1" type="radio" name="bookRating" value='1'/>
              {/* <label className="star star-1" for="star-1"></label> */}
            </div>
            <textarea onChange={this.props.handleInputChange} name='bookComment' type='text' placeholder='Well...'></textarea>
          </form>
          <button onClick={this.props.onClose}>Cancel</button>
          <button onClick={() => this.props.handleFeedbackSubmit(this.props.bookToRate)}>Submit</button>
        </div>
      </div>
    )
  }
}

export default FeedbackModal;