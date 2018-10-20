import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';

const Dashboard = ({ secretData, user }) => (
  <Card className="container" id="dashboard-container">
    <CardTitle
      style={{fontFamily: 'Kaushan Script'}}
      title="Dashboard"
      subtitle="You should get access to this page only after authentication."
    />
  {secretData && <CardText style={{ fontSize: '16px', color: 'green', fontFamily: 'Alice'}}>Welcome <strong>{user.name}</strong>!<br />{secretData}</CardText>}
    <CardText style={{ fontSize: '16px', fontFamily: 'Alice'}}>
      <p>This is a simple inventory app, that will keep track of incoming products and the products that you sell.</p>
      <p>To start using the app go to the Inventory page and add some products to your inventory from "Income" part.</p>
      <p>We hope you will love our app!</p>
      </CardText>
  </Card>
);

Dashboard.propTypes = {
  secretData: PropTypes.string.isRequired
};

export default Dashboard;
