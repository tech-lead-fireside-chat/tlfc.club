import React from "react";
import PropTypes from "prop-types";
import { withRouter, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  FormText,
  Input,
} from "reactstrap";
import Widget from "../../components/Widget/Widget.js";
import Footer from "../../components/Footer/Footer.js";
import Login from "../login/Login.js";

import loginImage from "../../assets/registerImage.svg";
import SofiaLogo from "../../components/Icons/SidebarIcons/TLFCLogo.js";
import GoogleIcon from "../../components/Icons/AuthIcons/GoogleIcon.js";
import TwitterIcon from "../../components/Icons/AuthIcons/TwitterIcon.js";
import FacebookIcon from "../../components/Icons/AuthIcons/FacebookIcon.js";
import GithubIcon from "../../components/Icons/AuthIcons/GithubIcon.js";
import LinkedinIcon from "../../components/Icons/AuthIcons/LinkedinIcon.js";
import { registerUser } from "../../actions/register.js";

class Register extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.doRegister = this.doRegister.bind(this);
  }

  changeEmail(event) {
    this.setState( { email: event.target.value });
  }

  changePassword(event) {
    this.setState({ password: event.target.value });
  }

  doRegister(e) {
    e.preventDefault();
    this.props.dispatch(registerUser({
      creds: {
        email: this.state.email,
        password: this.state.password,
      },
      history: this.props.history
    }));
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/app' } };

    if (Login.isAuthenticated(JSON.parse(localStorage.getItem('authenticated')))) {
      return (
        <Redirect to={from} />
      );
    }

    return (
      <div className="auth-page">
        <Container className="col-12">
          <Row className="d-flex align-items-center">
            <Col xs={12} lg={6} className="left-column">
              <Widget className="widget-auth widget-p-lg">
                <div className="d-flex align-items-center justify-content-between py-3">
                  <p className="auth-header mb-0">Sign Up</p>
                  <div className="logo-block">
                    <SofiaLogo />
                    <p className="mb-0">SOFIA</p>
                  </div>
                </div>
                <div className="auth-info my-2">
                  <p>This is a real app with Node.js backend - use <b>"admin@flatlogic.com / password"</b> to login!</p>
                </div>
                <form onSubmit={this.doRegister}>
                  <FormGroup className="my-3">
                    <FormText>Email</FormText>
                    <Input id="email" className="input-transparent pl-3" value={this.state.email} onChange={this.changeEmail} type="email" required name="email" placeholder="Henry Monk" />
                  </FormGroup>
                  <FormGroup  className="my-3">
                    <div className="d-flex justify-content-between">
                      <FormText>Password</FormText>
                      <Link to="/error">Forgot password?</Link>
                    </div>
                    <Input id="password" className="input-transparent pl-3" value={this.state.password} onChange={this.changePassword} type="password" required name="password" placeholder="Place your password here"/>
                  </FormGroup>
                  <div className="bg-widget d-flex justify-content-center">
                    <Button className="rounded-pill my-3" type="submit" color="secondary-red">Sign Up</Button>
                  </div>
                  <p className="dividing-line my-3">&#8195;Or&#8195;</p>
                  <div className="d-flex align-items-center my-3">
                    <p className="social-label mb-0">Login with</p>
                    <div className="socials">
                      <a href="https://flatlogic.com/"><GoogleIcon /></a>
                      <a href="https://flatlogic.com/"><TwitterIcon /></a>
                      <a href="https://flatlogic.com/"><FacebookIcon /></a>
                      <a href="https://flatlogic.com/"><GithubIcon /></a>
                      <a href="https://flatlogic.com/"><LinkedinIcon /></a>
                    </div>
                  </div>
                  <Link to="/login">Enter the account</Link>
                </form>
              </Widget>
            </Col>
            <Col xs={0} lg={6} className="right-column">
              <div>
                <img src={loginImage} alt="Error page" />
              </div>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage,
  };
}

export default withRouter(connect(mapStateToProps)(Register));
