import React from 'react';

class AddCoachBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: ''
    };

    this.changeName = this.changeName.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.render = this.render.bind(this);
  }

  changeName(event) {
    this.setState({name: event.target.value});
  }

  changeEmail(event) {
    this.setState({email: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log('submitted');

    if (this.state.name !== '' && this.state.email !== '') {
      this.props.onSubmit(this.state.name, this.state.email);
      this.state.name = '';
      this.state.email = '';
    }
  }

  render() {
    return (
      <form className="control is-grouped" onSubmit={this.handleSubmit}>
        <p className="control has-icon">
          <input
            name="name"
            type="text"
            className="input"
            placeholder="Bob Ross"
            value={this.state.name}
            onChange={this.changeName}
          />
          <i className="fa fa-user" aria-hidden="true"></i>
        </p>
        <p className="control has-icon">
          <input
            name="email"
            type="email"
            className="input"
            placeholder="test@uprise.com"
            value={this.state.email}
            onChange={this.changeEmail}
          />
          <i className="fa fa-envelope"></i>
        </p>
        <p className="control">
          <input type="submit" value="Add Coach" className="button is-info" disabled={this.state.name === '' || this.state.email === ''}/>
        </p>
      </form>
    );
  }
}

AddCoachBlock.propTypes = {
  onSubmit: React.PropTypes.func
};

export default AddCoachBlock;
