import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RecommendedActions from '~/store/ducks/recommended';
import MeetupActions from '~/store/ducks/meetup';

import ItemMeetup from '../ItemMeetup';

import {
  Container, Content, LoadMore, Btn,
} from '../styles';

class Recommended extends Component {
  static propTypes = {
    recommendedsRequest: PropTypes.func.isRequired,
    setMeetupUpdate: PropTypes.func.isRequired,
    deleteMeetupRequest: PropTypes.func.isRequired,
    recommendeds: PropTypes.shape({
      loader: PropTypes.bool,
      loadMore: PropTypes.bool,
      page: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
    }).isRequired,
    auth: PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.number,
      }),
    }).isRequired,
  };


  componentDidMount() {
    const { recommendedsRequest } = this.props;
    const { recommendeds: { page } } = this.props;
    if (page < 1) recommendedsRequest(1);
  }

  handleLoadMore = (page) => {
    const { recommendedsRequest } = this.props;
    recommendedsRequest(page);
  }

  render() {
    const { setMeetupUpdate, deleteMeetupRequest } = this.props;
    const {
      recommendeds: {
        loader, data, page, loadMore,
      },
      auth,
    } = this.props;

    return (
      <Container>
        <header>
          <h1>Recomendados</h1>
        </header>
        <Content>
          {data[0]
            ? data.map(m => (
              <ItemMeetup
                key={m.id}
                item={m}
                setMeetupUpdate={setMeetupUpdate}
                deleteMeetupRequest={deleteMeetupRequest}
                auth={auth}
              />
            ))
            : <p>Ainda não existem eventos recomendados!</p>
          }
        </Content>
        <LoadMore>
          { loader && <i className="fa fa-spinner" aria-hidden="true" />}
          { loadMore && data[0]
            ? !loader && <Btn type="button" onClick={() => this.handleLoadMore(page + 1)}>Carregar mais</Btn>
            : data[0] && <Btn type="button">Não há mais resultados!</Btn>
          }
        </LoadMore>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  recommendeds: state.recommended,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  { ...RecommendedActions, ...MeetupActions },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(Recommended);
