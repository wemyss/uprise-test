import React from 'react';

import AddCoachBlock from './AddCoachBlock';
import AdminCoachList from './AdminCoachList';

class Admin extends React.Component {
  render() {
    return (
      <div>
        <div className="control is-grouped">
          <p className="control">
            <button onClick={this.props.getCoaches} className="button is-success">
              <span className="icon is-small">
                <i className="fa fa-refresh" aria-hidden="true"></i>
              </span>
              <span>Refresh</span>
            </button>
          </p>
          <p className="control">
            <button onClick={this.props.removeAllCoaches} className="button is-danger">
              <span className="icon is-small">
                <i className="fa fa-times" aria-hidden="true"></i>
              </span>
              <span>Delete All</span>
            </button>
          </p>
        </div>
        <AddCoachBlock onSubmit={this.props.addCoach}/>
        <AdminCoachList
          coaches={this.props.coaches}
          toggleActive={this.props.toggleActive}
          changeName={this.props.changeName}
          changeEmail={this.props.changeEmail}
          removeCoach={this.props.removeCoach}
        />
      </div>
    );
  }
}


Admin.propTypes = {
  addCoach: React.PropTypes.func.isRequired,
  removeCoach: React.PropTypes.func.isRequired,
  getCoaches: React.PropTypes.func.isRequired,
  removeAllCoaches: React.PropTypes.func.isRequired,
  toggleActive: React.PropTypes.func.isRequired,
  changeName: React.PropTypes.func.isRequired,
  changeEmail: React.PropTypes.func.isRequired,
  coaches: React.PropTypes.array.isRequired
};

export default Admin;
