import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

import { Progress } from 'reactstrap';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
      progress_value: 2,
      animated: false,
      color: "danger",
      label: "",
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

    this.props.firebase.progress().on('value', snapshot => {
      console.log("getting progress value !!!");
      const progress_value = snapshot.child('value').val();
      const animated = snapshot.child('animated').val();
      const color = snapshot.child('color').val();
      const label = snapshot.child('label').val();
    

      this.setState({
        progress_value: progress_value,
        animated: animated,
        color: color,
        label: label,
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
      <div >
        <h1>Dynamic Progress</h1>
        <Progress  animated={this.state.animated} color={this.state.color} value={this.state.progress_value}>{this.state.label} </Progress>
        <br/>
        <br/>
        <Progress  animated={this.state.animated} color={this.state.color} value={this.state.progress_value}>{this.state.label} </Progress>
        <br/>
        <br/>
        <Progress  animated={this.state.animated} color={this.state.color} value={this.state.progress_value}>{this.state.label} </Progress>
        {/* {loading && <div>Loading ...</div>}
        <UserList users={users} /> */}
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