import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

import { Progress } from 'reactstrap';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    console.log("did mount users !!!");

    this.props.firebase.users().on('value', snapshot => {
      console.log("getoing users !!!");
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    }, error => {
      console.error(error);
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }
  
  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h1>Admin</h1>
        {loading && <div>Loading ...</div>}
        <UserList users={users} />
        {/* <Progress /> */}
      </div>
    );
  }
}


const UserList = ({ users }) => (
  <div>
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <span>
          <strong>E-Mail:</strong> {user.email}
        </span>
        <span>
          <strong>Username:</strong> {user.username}
        </span>
      </li>
    ))}
  </ul>
  </div>
);

export default withFirebase(Home);