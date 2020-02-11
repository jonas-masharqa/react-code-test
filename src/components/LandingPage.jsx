import React, { Component } from 'react';
import Loader from './Loader';
import axios from 'axios';
import { NavLink } from 'react-router-dom'
import { Image, List, Container, Divider, Message } from 'semantic-ui-react';

class LandingPage extends Component {
  state = {
    users: [],
    page: 1,
    lastY: 0,
    noUsers: false,
    loading: false,
    errorMessage: null
  };

  componentDidMount() {
    this.getUsers(this.state.page);
    this.setState({ page: this.state.page + 1 });

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    };

    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );

    this.observer.observe(this.loadingRef);
  }

  handleObserver(entries, observer) {
    const y = entries[0].boundingClientRect.y;
    if (this.state.lastY > y) {
      this.getUsers(this.state.page);
      this.setState({ page: this.state.page + 1 });
    }
    this.setState({ lastY: y });
  }

  getUsers(page) {
    this.setState({ loading: true });

    this.state.page > 1
      ? setTimeout(
          /* Second + time calling getUsers */
          () =>
            axios.get(`https://reqres.in/api/users?page=${page}`).then(res => {
              if (res.data.data.length === 0 && res.status === 200) {
                this.setState({
                  noUsers: true,
                  loading: false
                });
                this.observer.disconnect();
              } else if (res.status === 200) {
                this.setState({
                  users: [...this.state.users, ...res.data.data],
                  loading: false
                });
              } else {
                this.setState({ errorMessage: "Couldn't load users.." });
              }
            }),
          3000
        )
      : axios.get(`https://reqres.in/api/users?page=${page}`).then(res => {
          /* First time calling getUsers */

          if (res.status === 200) {
            this.setState({
              users: [...this.state.users, ...res.data.data],
              loading: false
            });
          } else {
            this.setState({ errorMessage: "Couldn't load users.." });
          }
        });
  }

  render() {
    const loadingTextCSS = { display: this.state.loading ? 'block' : 'none' };
    let userData = this.state.users;
    let users, noMoreUsers, errorMessage;
    const loadingCSS = {
      height: '100px',
      margin: '30px'
    };

    if (this.state.noUsers) {
      noMoreUsers = (
        <Message color='teal' id='no-users'>
          <Message.Header>
            End of the line! There are no more users to load.
          </Message.Header>
        </Message>
      );
    }

    if (this.state.error) {
      errorMessage = (
        <Message id='error' negative>
          <Message.Header>{this.state.errorMessage}</Message.Header>
        </Message>
      );
    }

    if (userData.length > 0) {
      users = userData.map(user => {
        return (
          <NavLink id={`user_${user.id}`} key={user.id} to={`/user/${user.id}`}>
            <List.Item
              className='list-item'
              id={`user-${user.id}`}
              key={`user-${user.id}`}
            >
              <Image size='small' avatar src={user.avatar} />
              <List.Content>
                <List.Header className='user-name' id={`name-${user.id}`}>
                  {user.first_name} {user.last_name}
                </List.Header>
              </List.Content>
            </List.Item>
            <Divider />
          </NavLink>
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
          {noMoreUsers}
        </Container>
        {errorMessage}
        <div
          id='loading-ref'
          ref={loadingRef => (this.loadingRef = loadingRef)}
          style={loadingCSS}
        >
          <span style={loadingTextCSS}>
            <Loader />
          </span>
        </div>
      </>
    );
  }
}

export default LandingPage;
