import React, { Component } from 'react';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MeetupActions from '~/store/ducks/meetup';

import ItemMeetup from '~/components/Dashboard/ItemMeetup';

import { Container, Content, SearchImput } from '~/components/Dashboard/styles';

import zoom from '~/assets/images/zoom.png';

class SearchResult extends Component {
  static propTypes = {
    searchRequest: PropTypes.func.isRequired,
    setMeetupUpdate: PropTypes.func.isRequired,
    deleteMeetupRequest: PropTypes.func.isRequired,
    searchClear: PropTypes.func.isRequired,
    meetups: PropTypes.shape({
      loader: PropTypes.bool,
      results: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        user_id: PropTypes.number,
        title: PropTypes.string,
        file: PropTypes.shape({
          url: PropTypes.string,
        }),
      })),
    }).isRequired,
    auth: PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.number,
      }),
    }).isRequired,
  };

  constructor(props) {
    super(props);
    const { searchRequest } = this.props;
    this.searchMeetup = debounce(searchRequest, 500);
  }

  state = {
    searchIntup: '',
  }

  componentDidMount() {
    const { searchClear } = this.props;
    searchClear();
    this.setState({ searchIntup: '' });
  }

  search = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    const { searchIntup } = this.state;
    this.searchMeetup(searchIntup);
  }

  render() {
    const { searchIntup } = this.state;
    const {
      setMeetupUpdate,
      deleteMeetupRequest,
      auth,
      meetups: { loader, results },
    } = this.props;
    const plural = results.length > 1 ? 's' : '';

    return (
      <Container>
        <SearchImput
          placeholder="Buscar mettups"
          name="searchIntup"
          bg={zoom}
          value={searchIntup}
          onChange={this.search}
        />
        <header>
          <h1>
            Resultados:
            {loader && (
              <span>
                <i className="fa fa-spinner" aria-hidden="true" />
              </span>
            )}
            {!loader && results[0] && (
              <small>{`${results.length} resultado${plural} encontrado${plural}`}</small>
            )}

          </h1>
        </header>
        <Content>
          {results.length > 0
            ? results.map(m => (
              <ItemMeetup
                key={m.id}
                item={m}
                setMeetupUpdate={setMeetupUpdate}
                deleteMeetupRequest={deleteMeetupRequest}
                auth={auth}
              />
            ))
            : <p>Utilize o campo de pesquisa acima e encontre seu meetup!</p>
          }
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  meetups: state.meetup,
  auth: state.auth,
});
const mapDispatchToProps = dispatch => bindActionCreators(MeetupActions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
