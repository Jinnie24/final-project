import React from 'react';
import PropTypes from 'prop-types';
import SignUpForm from '../components/SignUpForm.js';
import Recaptcha from 'react-recaptcha';


class SignUpPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        email: '',
        name: '',
        password: ''
      },
      isVerified: false
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    if(this.state.isVerified) {
      // create a string for an HTTP body message
      const name = encodeURIComponent(this.state.user.name);
      const email = encodeURIComponent(this.state.user.email);
      const password = encodeURIComponent(this.state.user.password);
      const formData = `name=${name}&email=${email}&password=${password}`;
      console.log(formData);
      // create an AJAX request
      const xhr = new XMLHttpRequest();
      xhr.open('post', '/auth/signup');
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          // success

          // change the component-container state
          this.setState({
            errors: {}
          });

          // set a message
          localStorage.setItem('successMessage', xhr.response.message);

          // redirect user after sign up to login page
          this.props.history.push('/login');
        } else {
          // failure

          const errors = xhr.response.errors ? xhr.response.errors : {};
          errors.summary = xhr.response.message;

          this.setState({
            errors
          });
        }
      });
      xhr.send(formData);
    } else {
      alert("please verify that you're a human");
    }
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }
  recaptchaLoaded() {
    console.log('capcha successfully loaded');
  }

  verifyCallback(response) {
    if (response) {
      this.setState({
        isVerified: true
      })
    }
  }


  /**
   * Render the component.
   */
  render() {
    return (
      <div>
        <SignUpForm
          onSubmit={this.processForm}
          onChange={this.changeUser}
          errors={this.state.errors}
          user={this.state.user}
        />
        <div className='captcha'>
         <Recaptcha
            style={{}}
            sitekey="6Lc49HUUAAAAALKemP3hiacWrq0oEibuCUE_Cy7i"
            secretkey="6Lc49HUUAAAAAJbylooIy5svI1_iH6UCKfRHXL_3"
            render="explicit"
            onloadCallback={this.recaptchaLoaded}
            verifyCallback={this.verifyCallback}
          />
          </div>
      </div>
    );
  }

}

SignUpPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SignUpPage;
