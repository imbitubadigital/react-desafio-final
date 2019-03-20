import React, { Fragment, Component } from 'react';
import api from '~/services/api';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserActions from '~/store/ducks/user';
import Header from '~/components/Header';

import {
  Container,
  BoxNew,
  Checks,
  Box,
  ButtonSubmit,
} from '../styles';

class Profile extends Component {
  static propTypes = {
    updateUserRequest: Proptypes.func.isRequired,
    user: Proptypes.shape({
      loader: Proptypes.bool,
    }).isRequired,
  };

  state = {
    categories: [],
    preferences: [],
    username: '',
    password: '',
    passwordConfirmation: '',
  };

  async componentDidMount() {
    const response = await api.get('/preferences');
    this.setState({ categories: response.data });

    const getPreferences = await api.get('/my-preferences');

    const { myPreference, user: { username } } = getPreferences.data;
    this.setState({ username });

    if (myPreference) {
      this.setState({ preferences: myPreference });
    }
  }

  checkedPreference = (id) => {
    const { preferences } = this.state;
    return preferences.indexOf(id) > -1;
  }

  handleCheckboxChange = async (e) => {
    const { preferences } = this.state;
    const { target } = e;
    const value = parseInt(target.value, 16);

    if (target.checked) {
      this.setState({ preferences: [...preferences, value] });
    } else {
      const newPref = preferences.filter(p => p !== value);
      this.setState({ preferences: newPref });
    }
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      username, password, passwordConfirmation, preferences,
    } = this.state;
    const { updateUserRequest } = this.props;
    updateUserRequest(username, password, passwordConfirmation, preferences);
  }

  render() {
    const { user } = this.props;
    const { categories, username } = this.state;
    return (
      <Fragment>
        <Header />
        <Container>
          <h1>Meu perfil</h1>
          <BoxNew enctype="multipart/form-data" onSubmit={this.handleSubmit}>
            <span>Nome</span>
            <input
              name="username"
              placeholder="Digite seu nome completo"
              value={username}
              onChange={this.handleInputChange}
            />

            <span>Senha</span>
            <input
              name="password"

              type="password"
              placeholder="Sua senha secreta"
              onChange={this.handleInputChange}
            />

            <span>Repetição de senha</span>
            <input
              name="passwordConfirmation"
              type="password"
              placeholder="Repita sua senha"
              onChange={this.handleInputChange}
            />
            <span>Preferências</span>
            <Box>
              {categories.map(cat => (
                <Checks key={cat.id}>
                  <input
                    type="checkbox"
                    value={cat.id}
                    name="categories"
                    checked={this.checkedPreference(cat.id)}
                    onChange={this.handleCheckboxChange}
                  />
                  <span>{cat.name}</span>
                </Checks>
              ))}
            </Box>
            {!user.loader
              ? (<ButtonSubmit type="submit">Salvar</ButtonSubmit>)
              : (
                <ButtonSubmit type="button">
                  <i className="fa fa-spinner" aria-hidden="true" />
                </ButtonSubmit>
              )
            }
          </BoxNew>
        </Container>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
