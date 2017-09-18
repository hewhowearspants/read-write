import React, { Component } from 'react';
import axios from 'axios';

import Auth from '../modules/Auth';

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

  toggleCreateNew() {
    this.setState((prevState) => {
      return {
        creatingNew: !prevState.creatingNew
      }
    })
  }

  setDataToShow(id) {
    this.setState({
      dataToShow: id,
    })
  }

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

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  }

  // sends character or location create request to server
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

  // sends character or location create request to server
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

  renderData() {
    return this.state.data.map((data) => {
      return (
        <div className='char-loc-single' key={data.id}>
          <p>{data.name}</p>
          <p>{data.description}</p>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="char-loc-list">
        {this.state.dataLoaded ? this.renderData() : <p>Loading...</p>}
        <div className='char-loc-create-button'>
          <p>Add {this.props.type}</p>
          <p>+</p>
        </div>
      </div>
    )
  }
}

export default CharLocList;