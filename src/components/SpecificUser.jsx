import React, { Component } from 'react'
import axios from 'axios'

class SingleUser extends Component {
  state = {
    user: null,
    errorMessage: null
  }

  componentDidMount() {
    this.getSpecificUser(this.props.match.params.id)
  }

  getSpecificUser(userId) {
    axios.get(`https://reqres.in/api/users/${userId}`).then(res => {
      if (res.status === 200) {
        debugger
        this.setState({
          user: res.data.data
        })
      } else {
        this.setState({
          errorMessage: "Couldn't load user.."
        })
      }
    })
  }

  render() {
    return (
      <>
        <h1>Specific User</h1>
      </>
    )
  }
}

export default SingleUser