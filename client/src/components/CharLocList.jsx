import React, { Component } from 'react';
import axios from 'axios';

import Auth from '../modules/Auth';

import NewCharLocForm from './NewCharLocForm';

// this component displays either a list of characters or a list of locations, based on what is set in 'type' in props
// handles the CRUD functionality for both
class CharLocList extends Component {
  constructor() {
    super();

    this.state = {
      data: null,
      dataLoaded: false,
      creatingNew: false,
      dataToShow: null,
      dataToEdit: null,
      //form fields
      name: '',
      description: '',
    }

    this.toggleCreateNew = this.toggleCreateNew.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCharLocSubmit = this.handleCharLocSubmit.bind(this);
    this.handleCharLocEditSubmit = this.handleCharLocEditSubmit.bind(this);
    this.deleteCharLoc = this.deleteCharLoc.bind(this);
    this.setDataToShow = this.setDataToShow.bind(this);
    this.setDataToEdit = this.setDataToEdit.bind(this);
  }

  // loads character/location info from rails, based on props.type
  componentDidMount() {
    let type = this.props.type + 's';
    axios.get(`/projects/${this.props.projectData.id}/${type}`, {
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      }
    }).then((res) => {
      console.log(res.data);
      this.setState({
        data: res.data[type],
        dataLoaded: true,
      })
    }).catch((err) => {
      console.log(err);
    });
  }

  // toggles new character/location form
  toggleCreateNew() {
    this.setState((prevState) => {
      return {
        creatingNew: !prevState.creatingNew
      }
    })
  }

  // sets showing more character/location information
  setDataToShow(id) {
    this.setState({
      dataToShow: id,
      dataToEdit: null,
    })
  }

  // sets editing a character/location inline
  setDataToEdit(id) {
    if(id) {
      const dataToEdit = this.state.data.filter((charLoc) => {
        if (charLoc.id === id) {
          return true;
        }
      })[0];
      this.setState({
        dataToEdit: id,
        name: dataToEdit.name,
        description: dataToEdit.description,
        creatingNew: false,
      })
    } else {
      this.setState({
        dataToEdit: id,
        name: '',
        description: '',
        creatingNew: false,
      })
    }
  }

  // generic input change method
  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  }

  // sends character/location create request to server
  handleCharLocSubmit(event) {
    event.preventDefault();
    let type = this.props.type;
    axios(`/projects/${this.props.projectData.id}/${type}s`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      },
      data: {
        [type]: {
          name: this.state.name,
          description: this.state.description,
        }
      }
    }).then((res) => {
      console.log(res);
      this.setState((prevState) => {
        return {
          data: prevState.data.concat(res.data[type]),
          name: '',
          description: '',
          creatingNew: false,
        }
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  // sends character/location edit request to server
  handleCharLocEditSubmit() {
    let type = this.props.type;
    axios(`/projects/${this.props.projectData.id}/${type}s/${this.state.dataToEdit}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      },
      data: {
        [type]: {
          name: this.state.name,
          description: this.state.description,
        }
      }
    }).then((res) => {
      console.log(res);
      const newData = [...this.state.data];
      newData.forEach((charLoc, index, array) => {
        if (charLoc.id === res.data[type].id) {
          array[index] = res.data[type];
        }
      });
      this.setState((prevState) => {
        return {
          data: newData,
          name: '',
          description: '',
          dataToEdit: null,
        }
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  // does what it says
  deleteCharLoc(id) {
    let type = this.props.type;
    axios(`/projects/${this.props.projectData.id}/${type}s/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      }
    }).then((res) => {
      console.log(res);
      const newData = [...this.state.data];
      newData.forEach((charLoc, index, array) => {
        if (charLoc.id === id) {
          array.splice(index, 1);
        }
      });
      this.setState({
        data: newData
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  // renders character/location list
  renderData() {
    return this.state.data.map((data) => {
      return (
        <div className='char-loc-single' key={data.id}>
          <div className='char-loc-single-top'>
            {this.state.dataToEdit !== data.id ? (
              <p>{data.name}</p>
            ) : (
              <input
                type="text"
                name="name"
                value={this.state.name}
                placeholder="name"
                onChange={this.handleInputChange}
              />
            )}
            {this.state.dataToShow !== data.id ? (
              <button className='char-loc-info-toggle-button' onClick={() => this.setDataToShow(data.id)} title="More Info"><i className="fa fa-plus" aria-hidden="true"></i></button>
            ) : (
              <button className='char-loc-info-toggle-button' onClick={() => this.setDataToShow(null)} title="Less Info"><i className="fa fa-minus" aria-hidden="true"></i></button>
            )}
          </div>
          {this.state.dataToShow === data.id ? (
            <div className='char-loc-single-bottom'>
              {this.state.dataToEdit !== data.id ? (
                <p>{data.description}</p>
              ) : (
                <input
                  type="text"
                  name="description"
                  value={this.state.description}
                  placeholder="description"
                  onChange={this.handleInputChange}
                />
              )}
              {this.state.dataToEdit !== data.id ? (
                <div className='buttons'>
                  <button className='edit-button' onClick={() => this.setDataToEdit(data.id)} title="Edit"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                  <button className='delete-button' onClick={() => this.deleteCharLoc(data.id)} title="Delete"><i className="fa fa-trash" aria-hidden="true"></i></button>
                </div>
              ) : (
                <div className='buttons'>
                  <button className='submit-button' onClick={() => this.handleCharLocEditSubmit()} title="Submit"><i className="fa fa-share" aria-hidden="true"></i></button>
                  <button className='cancel-button' onClick={() => this.setDataToEdit(null)} title="Cancel"><i className="fa fa-times" aria-hidden="true"></i></button>
                </div>
              )}
            </div>
          ) : (
            ''
          )}
        </div>
      )
    })
  }

  render() {
    return (
      <div className="char-loc-list">
        {this.state.dataLoaded ? this.renderData() : <p>Loading...</p>}
        {/* conditionally displays either add new character/location button or new character/location create form */}
        {!this.state.creatingNew ? (
          <div className='char-loc-create-button' onClick={this.toggleCreateNew}>
            <p>Add {this.props.type}</p>
            <p>+</p>
          </div>
        ) : (
          <NewCharLocForm
            name={this.state.name}
            description={this.state.description}
            handleCharLocSubmit={this.handleCharLocSubmit}
            handleInputChange={this.handleInputChange}
            toggleCreateNew={this.toggleCreateNew}
          />
        )}
      </div>
    )
  }
}

export default CharLocList;