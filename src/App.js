import React, { Component } from 'react';
import * as firebase from "firebase";
import config from './firebase-config';
import './App.css';

class App extends Component {
  constructor() {
    super();

    // Initialize Firebase
      if (firebase.app.length === 0) firebase.initializeApp(config);
  }

  componentWillMount() {
    let postsRef = firebase.database().ref('post');

    let _this = this;

    postsRef.on('value', function (snapshot){
      console.log(snapshot.val());


      _this.setState({
        posts : snapshot.val(),
        loading : false
      });
    });
  }

    render() {
    return(
        <div className="App">
          {this.props.children && React.cloneElement(
              this.props.children, {
                firebaseRef : firebase.database().ref('posts'),
                posts : this.state.posts,
                loading : this.state.loading
              })}
        </div>
    );
  }
}

export default App;
