import React from 'react';
import './app.scss';
const request = require('superagent');

const CoachList = ({coaches}) => (
  <table className="table">
    <thead>
      <tr>
        <th>Active</th>
        <th>Name</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      {coaches.map(coach => (
        <tr key={coach.id}>
          <td>
            <i
              className={'fa fa-circle' + (coach.active ? ' is-green' : '-o is-grey')}
              aria-hidden="true">
            </i>
          </td>
          <td>{coach.name}</td>
          <td>{coach.email}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
CoachList.propTypes = {
  coaches: React.PropTypes.array
};


class App extends React.Component {
  constructor() {
    super();
    this.getCoaches = this.getCoaches.bind(this);
    this.removeAllCoaches = this.removeAllCoaches.bind(this);
    this.addCoach = this.addCoach.bind(this);
    this.render = this.render.bind(this);

    this.state = {
      coaches: []
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.getCoaches(), 600);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getCoaches() {
    request
      .get('/coaches')
      .end((err, res) => {
        if (err) {
          throw err;
        }
        console.log(res);
        this.setState({
          coaches: res.body
        });
      });
  }

  removeAllCoaches() {
    request
      .post('/coaches/removeAll')
      .send()
      .end((err, res) => {
        if (err || !res.ok) {
          console.error('error in removing all');
        } else {
          console.log('all good!');
        }
      });
  }

  addCoach() {
    const d = new Date();

    request
      .post('/coaches/addOne')
      .send({name: `coach  ${d.getTime()}`, email: 'bigdog@email.com'})
      .end((err, res) => {
        if (err || !res.ok) {
          console.error('error');
        } else {
          console.log('added one i think!');
        }
      });
  }

  render() {
    return (
      <div>
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Coaching System</h1>
              <h2 className="subtitle">Sam Wemyss</h2>
            </div>
          </div>
        </section>
        <div className="section">
          <div className="container">
            <div className="control is-grouped">
              <p className="control">
                <a onClick={this.getCoaches} className="button is-info">Get Coaches</a>
              </p>
              <p className="control">
                <a onClick={this.addCoach} className="button is-info">Add Coach</a>
              </p>
              <p className="control">
                <a onClick={this.removeAllCoaches} className="button is-info">Remove All</a>
              </p>
            </div>
            <CoachList coaches={this.state.coaches}/>
          </div>
        </div>
      </div>
    );
  }
}

App.defaultProps = {
};

export default App;
