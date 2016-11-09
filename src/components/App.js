import React from 'react';
import './app.scss';
const request = require('superagent');


class App extends React.Component {
  constructor() {
    super();
    this.getCoaches = this.getCoaches.bind(this);
    this.addCoach = this.addCoach.bind(this);
    this.render = this.render.bind(this);

    this.state = {
      users: []
    };
  }

  getCoaches() {
    request
      .get('/coaches')
      .end((err, res) => {
        if (err) {
          throw err;
        }
        this.setState({
          users: res
        });
      });
  }

  addCoach() {
    request
      .post('/coaches/addOne')
      .send({name: 'big dog', email: 'bigdog@email.com'})
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err || !res.ok) {
          alert('error');
        } else {
          alert('added one i think!');
        }
      });
  }

  render() {
    return (
      <div className="index">
        <div className="notice">
          <h1>Coaching system</h1>
          <button onClick={this.getCoaches}>Get Coaches</button>
          <button onClick={this.addCoach}>Add Coach</button>
        </div>
      </div>
    );
  }
}

App.defaultProps = {
};

export default App;
