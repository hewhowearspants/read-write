import React, { Component } from 'react';
import axios from 'axios';

import Auth from '../modules/Auth';

class CharLocList extends Component {
    constructor() {
    super();

    this.state = {
      data: null,
      dataLoaded: false,
    }
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