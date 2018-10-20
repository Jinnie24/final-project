import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Auth from '../modules/Auth';

class HomePage extends React.Component {

  componentDidMount() {
    // update authenticated state on logout
    this.props.toggleAuthenticateStatus()
  }

  render() {
    return (
      <Card className="container" id ="home-page">
        <CardTitle style={{fontFamily: 'Kaushan Script'}} title="React Inventory Application" subtitle="This is the home page." />
          {Auth.isUserAuthenticated() ? (
            <CardText style={{ fontSize: '16px', color: 'green', fontFamily: 'Alice' }}>Welcome! You are logged in.</CardText>
          ) : (
            <CardText style={{ fontSize: '16px', color: 'green',  fontFamily: 'Alice'}}>You are not logged in.</CardText>
          )}
      </Card>
    )
  }
};

export default HomePage;
