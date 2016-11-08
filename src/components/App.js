import React from 'react';
import './app.scss';


class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <div className="notice">
          <h1>hello sam wtf are you doing?</h1>
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
