import React, { Component } from 'react';
import axios from 'axios';
import { Image, List, Container, Divider } from 'semantic-ui-react';

class LandingPage extends Component {
  state = {
    users: [],
    page: 1,
    loading: false,
    errorMessage: null
  };

  componentDidMount() {
    this.getUsers(this.state.page);

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    }

    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    )

    this.observer.observe(this.loadingRef)
  }

  getUsers(page) {
    this.setState({ loading: true });
    axios.get(`https://reqres.in/api/users?page=${page}`).then(response => {
      if (response.status === 200) {
        this.setState({
          users: [...this.state.users, ...response.data.data],
          loading: false
        });
      } else {
        this.setState({
          errorMessage: "Couldn't load users..",
          loading: false
        });
      }
    });
  }

  render() {
    const loadingTextCSS = { display: this.state.loading ? 'block' : 'none' };
    let userData = this.state.users;
    let users;
    const loadingCSS = {
      height: '100px',
      margin: '30px'
    };
    if (userData.length > 0) {
      users = userData.map(user => {
        return (
          <>
            <List.Item
              className='list-item'
              id={`user-${user.id}`}
              key={`user-${user.id}`}
            >
              <Image size='small' avatar src={user.avatar} />
              <List.Content>
                <List.Header id={`name-${user.id}`}>
                  {user.first_name} {user.last_name}
                </List.Header>
              </List.Content>
            </List.Item>
            <Divider />
          </>
        );
      });
    }

    return (
      <>
        <Container id='user-container'>
          <div id='users' style={{ minHeight: 'auto' }}>
            <List id='users' animated verticalAlign='middle'>
              {users}
            </List>
          </div>
        </Container>
        <div
          id='loading-ref'
          ref={loadingRef => (this.loadingRef = loadingRef)}
          style={loadingCSS}
        >
          <span style={loadingTextCSS}>
            <div>Loading...</div>
          </span>
        </div>
      </>
    );
  }
}

export default LandingPage;
