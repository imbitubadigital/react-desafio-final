import React, { Fragment, Component } from 'react';

import Proptypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserActions from '~/store/ducks/user';

import { Link } from 'react-router-dom';
import logoRed from '~/assets/images/logo.svg';

import {
  Container,
  BoxNew,
  ButtonSubmit,
  Logo,
  NavFooter,
} from '../styles';

class Signup extends Component {
  static propTypes = {
    createUserRequest: Proptypes.func.isRequired,
    user: Proptypes.shape({
      loader: Proptypes.bool,
    }).isRequired,
  }

  state = {
    username: '',
    email: '',
    password: '',
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = this.state;
    if (!username || !email || !password) {
      toastr.warning('Opps', 'Por favor preencha todos os campos!');
    } else {
      const { createUserRequest } = this.props;
      createUserRequest(username, email, password);
    }
  }

  render() {
    const { user: { loader } } = this.props;
    const { username, email, password } = this.state;

    return (
      <Fragment>
        <Container>
          <Logo img={logoRed} />
          <h1>Cadastre-se</h1>
          <BoxNew enctype="multipart/form-data" onSubmit={this.handleSubmit}>
            <span>Nome</span>
            <input
              name="username"
              placeholder="Digite seu nome completo"
              value={username}
              onChange={this.handleInputChange}
            />

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
              type="password"
              name="password"
              placeholder="Sua senha secreta"
              value={password}
              onChange={this.handleInputChange}
            />
            {!loader
              ? (<ButtonSubmit type="submit">Salvar</ButtonSubmit>)
              : (
                <ButtonSubmit type="button">
                  <i className="fa fa-spinner" aria-hidden="true" />
                </ButtonSubmit>
              )
            }
          </BoxNew>
          <NavFooter>
            <Link to="/login">Já tenho conta</Link>
          </NavFooter>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
