import React from 'react';
import './app.scss';
const request = require('superagent');

import Admin from './Admin/Admin';
import CoachList from './CoachList';

class App extends React.Component {
  constructor() {
    super();
    this.getCoaches = this.getCoaches.bind(this);
    this.removeAllCoaches = this.removeAllCoaches.bind(this);
    this.addCoach = this.addCoach.bind(this);
    this.removeCoach = this.removeCoach.bind(this);
    this.toggleActive = this.toggleActive.bind(this);
    this.updateCoach = this.updateCoach.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.toggleAdmin = this.toggleAdmin.bind(this);
    this.displayCoaches = this.displayCoaches.bind(this);
    this.render = this.render.bind(this);

    this.state = {
      coaches: [],
      isAdmin: false
    };
  }

  componentDidMount() {
    this.getCoaches();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getCoaches() {
    const self = this;
    request
      .get('/coaches')
      .end((err, res) => {
        if (err) {
          throw err;
        }
        self.setState({coaches: res.body});
      });
  }

  removeAllCoaches() {
    const self = this;
    request
      .post('/coaches/removeAll')
      .send()
      .end((err, res) => {
        if (err || !res.ok) {
          console.error('error in removing all');
        } else {
          self.setState({coaches: res.body});
        }
      });
  }

  addCoach(name, email) {
    const self = this;
    request
      .post('/coaches/addOne')
      .send({name, email})
      .end((err, res) => {
        if (err || !res.ok) {
          console.error('error');
        } else {
          self.setState((prevState) => ({ coaches: [res.body].concat(prevState.coaches) }));
        }
      });
  }

  removeCoach(id) {
    const self = this;
    request
      .post(`/coaches/${id}/remove`)
      .send()
      .end((err, res) => {
        if (err || !res.ok) {
          console.error('error');
        } else {
          self.getCoaches();
        }
      });
  }

  toggleActive(coachId) {
    const pos = this.state.coaches.map((coach) => (coach.id)).indexOf(coachId);
    if (pos >= 0) {
      // const coaches = this.state.coaches;
      // coaches[pos].active = !coaches[pos].active;
      const c = this.state.coaches[pos];
      // this.setState({coaches});
      this.updateCoach(c.id, c.name, c.email, !c.active);
    }
  }

  updateCoach(id, name, email, active) {
    const data = {};
    if (name !== null) {
      data.name = name;
    }
    if (email !== null) {
      data.email = email;
    }
    if (active !== null) {
      data.active = active;
    }
    const self = this;
    request
      .post(`/coaches/${id}/update`)
      .send(data)
      .end((err, res) => {
        if (err || !res.ok) {
          console.error('error');
        } else {
          console.log('all good!');
          self.getCoaches();
        }
      });
  }

  changeName(newName, coachId) {
    this.updateCoach(coachId, newName, null, null);
  }

  changeEmail(newEmail, coachId) {
    this.updateCoach(coachId, null, newEmail, null);
  }

  toggleAdmin() {
    this.setState({isAdmin: !this.state.isAdmin});
  }

  displayCoaches() {
    let coachList = <CoachList coaches={this.state.coaches}/>;
    if (this.state.isAdmin) {
      coachList = (
        <Admin
          addCoach={this.addCoach}
          changeEmail={this.changeEmail}
          changeName={this.changeName}
          coaches={this.state.coaches}
          getCoaches={this.getCoaches}
          removeAllCoaches={this.removeAllCoaches}
          removeCoach={this.removeCoach}
          toggleActive={this.toggleActive}
        />
      );
    }
    return coachList;
  }

  render() {
    return (
      <div>
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Coaching System</h1>
              <h2 className="subtitle">Sam Wemyss</h2>
              <div className="is-pulled-right">
                <button onClick={this.toggleAdmin} className="button is-primary is-inverted">
                  <span className="icon is-small">
                    <i className="fa fa-user" aria-hidden="true"></i>
                  </span>
                  <span>{this.state.isAdmin ? 'Logout' : 'Login'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>
        <div className="section">
          <div className="container">
            {this.displayCoaches()}
          </div>
        </div>
      </div>
    );
  }
}

App.defaultProps = {
};

export default App;
