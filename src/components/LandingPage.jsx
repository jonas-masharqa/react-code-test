import React, { Component } from 'react';
import axios from 'axios';
import { Image, List, Container } from 'semantic-ui-react';

class LandingPage extends Component {
  state = {
    users: [],
    errorMessage: null
  };

  componentDidMount() {
    this.getUsers();
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
          <List.Item className='list-item' id={`user-${user.id}`} key={`user-${user.id}`}>
            <Image size='small' avatar src={user.avatar} />
            <List.Content>
              <List.Header id={`name-${user.id}`}>
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
        <Container id='user-container'>
          <List id='users' divided relaxed animated verticalAlign='middle'>
            {users}
          </List>
        </Container>
      </>
    );
  }
}

export default LandingPage;
