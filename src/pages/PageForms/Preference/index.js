import React, { Fragment, Component } from 'react';
import api from '~/services/api';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserActions from '~/store/ducks/user';
import logoRed from '~/assets/images/logo.svg';

import {
  Container,
  BoxNew,
  Checks,
  Box,
  ButtonSubmit,
  Logo,
} from '../styles';

class Preference extends Component {
  static propTypes = {
    attachPreferencesRequest: Proptypes.func.isRequired,
    user: Proptypes.shape({
      loader: Proptypes.bool,
    }).isRequired,
  };

  state = {
    categories: [],
    preferences: [],
    username: '',

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

  handleSubmit = (e) => {
    e.preventDefault();
    const { preferences } = this.state;
    const { attachPreferencesRequest } = this.props;
    attachPreferencesRequest(preferences);
  }

  render() {
    const { user } = this.props;
    const { categories, username } = this.state;
    return (
      <Fragment>
        <Container>
          <Logo img={logoRed} />
          <h1>{`Olá ${username}`}</h1>
          <p>
            Parece que é seu primeiro acesso por aqui,
            comece escolhendo algumas preferências para
            selecionarmos os melhores meetups pra você:
          </p>

          <BoxNew enctype="multipart/form-data" onSubmit={this.handleSubmit}>

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

export default connect(mapStateToProps, mapDispatchToProps)(Preference);
