import React, { Fragment, Component } from 'react';
import Proptypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthActions from '~/store/ducks/auth';


import { Link } from 'react-router-dom';
import logoRed from '~/assets/images/logo.svg';

import {
  Container,
  BoxNew,
  ButtonSubmit,
  Logo,
  NavFooter,
} from '../styles';

class Signin extends Component {
  static propTypes = {
    user: Proptypes.shape({
      loginLoader: Proptypes.bool,
    }).isRequired,
    signInRequest: Proptypes.func.isRequired,
  };

  state = {
    email: '',
    password: '',
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      toastr.warning('Opps', 'Preencha seu email e senha para realizar seu login!');
    } else {
      const { signInRequest } = this.props;
      signInRequest(email, password);
    }
  }

  render() {

    const { user: { loginLoader } } = this.props;

    const { email, password } = this.state;

    return (
      <Fragment>
        <Container>
          <Logo img={logoRed} />
          <h1>Faça seu login</h1>
          <BoxNew enctype="multipart/form-data" onSubmit={this.handleSubmit}>
            <span>E-mail</span>
            <input
              type="email"
              name="email"
              placeholder="Seu melhor e-mail"
              value={email}
              onChange={this.handleInputChange}
            />

            <span>Senha</span>
            <input
              name="password"
              type="password"
              placeholder="Sua senha secreta"
              value={password}
              onChange={this.handleInputChange}
            />
            {loginLoader
              ? <ButtonSubmit type="button"><i className="fa fa-spinner" aria-hidden="true" /></ButtonSubmit>
              : <ButtonSubmit type="submit">Entrar</ButtonSubmit>
            }
          </BoxNew>
          <NavFooter>
            <Link to="/registrar">Criar conta grátis</Link>
          </NavFooter>
        </Container>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  user: state.auth,
});

const mapDispatchToProps = dispatch => bindActionCreators(AuthActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
