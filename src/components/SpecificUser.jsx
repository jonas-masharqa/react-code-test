import React, { Component } from 'react';
import axios from 'axios';
import ScrollToTopOnMount from './ScrollToTopOnMount';
import { Image, Grid, Container } from 'semantic-ui-react';

class SingleUser extends Component {
  state = {
    user: null,
    errorMessage: null
  };

  componentDidMount() {
    this.getSpecificUser(this.props.match.params.id);
  }

  getSpecificUser(userId) {
    axios.get(`https://reqres.in/api/users/${userId}`).then(res => {
      if (res.status === 200) {
        debugger;
        this.setState({
          user: res.data.data
        });
      } else {
        this.setState({
          errorMessage: "Couldn't load user.."
        });
      }
    });
  }

  render() {
    let userData = this.state.user;
    let specificUser;

    if (this.state.user) {
      specificUser = (
        <Container>
          <Grid container columns={2} id='user-grid'>
            <Grid.Column width={6} verticalAlign='middle'>
              <Image src={userData.avatar} size='medium' circular />
            </Grid.Column>
            <Grid.Column verticalAlign='middle'>
              <div id='info'>
                <h2>{`${userData.first_name} ${userData.last_name}`}</h2>
                <h3>{userData.email}</h3>
              </div>
            </Grid.Column>
          </Grid>
        </Container>
      );
    }

    return (
      <>
        <ScrollToTopOnMount />
        {specificUser}
      </>
    );
  }
}

export default SingleUser;
