import React, { Component } from 'react';
import axios from 'axios'
import { Image, List } from 'semantic-ui-react';

class LandingPage extends Component {
  state = {
    users: [],
    errorMessage: null
  };

  componentDidMount () {
    this.getUsers()
  }

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
    let userData = this.state.users;
    let users;

    if (userData.length > 0) {
      users = userData.map(user => {
        return (
          <List.Item>
            <Image size='small' avatar src={user.avatar} />
            <List.Content>
              <List.Header>
                {user.first_name} {user.last_name}
              </List.Header>
            </List.Content>
          </List.Item>
        );
      });
    }

    return (
      <>
      <h1>hey</h1>
        <List animated verticalAlign='middle'>
          {users}
        </List>
      </>
    );
  }
}

export default LandingPage;
