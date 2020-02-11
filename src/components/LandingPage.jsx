import React, { Component } from 'react';

class LandingPage extends Component {
  state = {
    users: [],
    errorMessage: null
  };

  getUsers() {
    axios.get(`https://reqres.in/api/users?page=1`).then(response => {
      if (response.status === 200) {
        this.setState({
          users: response.data.data
        });
      } else {
        this.setState({
          errorMessage: "Couldn't load users.."
        });
      }
    });
  }

  render() {
    let users;

    return <></>;
  }
}

export default LandingPage;
