import React from 'react';

import { RIEInput } from 'riek';

class AdminCoachList extends React.Component {
  constructor(props) {
    super(props);
    this.activeOnClick = this.activeOnClick.bind(this);
    this.deleteOnClick = this.deleteOnClick.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.render = this.render.bind(this);
  }

  activeOnClick(id) {
    this.props.toggleActive(id);
  }

  deleteOnClick(id) {
    this.props.removeCoach(id);
  }

  handleNameChange(obj, id) {
    this.props.changeName(obj.name, id);
  }

  handleEmailChange(obj, id) {
    this.props.changeEmail(obj.email, id);
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {this.props.coaches.map(coach => (
            <tr key={coach.id}>
              <td>
                <span className="is-pulled-left active-status">
                  <i
                    onClick={() => this.activeOnClick(coach.id)}
                    className={'fa fa-circle' + (coach.active ? ' is-green' : '-o is-grey')}
                    aria-hidden="true">
                  </i>
                </span>
                <RIEInput
                  value={coach.name}
                  change={(obj) => this.handleNameChange(obj, coach.id)}
                  propName={'name'}
                />
              </td>
              <td>
                <RIEInput
                  value={coach.email}
                  change={(obj) => this.handleEmailChange(obj, coach.id)}
                  propName={'email'}
                />
                <span className="is-pulled-right">
                  <i
                    onClick={() => this.deleteOnClick(coach.id)}
                    className="fa fa-times delete-icon"
                    aria-hidden="true">
                  </i>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

AdminCoachList.propTypes = {
  coaches: React.PropTypes.array.isRequired,
  removeCoach: React.PropTypes.func.isRequired,
  toggleActive: React.PropTypes.func.isRequired,
  changeName: React.PropTypes.func.isRequired,
  changeEmail: React.PropTypes.func.isRequired
};

export default AdminCoachList;
