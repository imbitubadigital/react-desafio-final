import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import moment from 'moment';

import {
  Article, Image, BoxDetail, Detail, Categories,
} from '../styles';

class ItemMeetup extends Component {
  static propTypes = {
    setMeetupUpdate: PropTypes.func.isRequired,
    deleteMeetupRequest: PropTypes.func.isRequired,
    item: PropTypes.shape({
      id: PropTypes.number,
      user_id: PropTypes.number,
      title: PropTypes.string,
      subscribes: PropTypes.arrayOf(PropTypes.shape()),
      file: PropTypes.shape({
        url: PropTypes.string,
      }),
    }).isRequired,
    auth: PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.number,
      }),
    }).isRequired,
  };

  constructor(props) {
    super(props);
    const { item } = props;

    this.state = {
      id: item.id,
      url: item.file.url,
      userId: item.user_id,
      title: item.title,
      subscribes: item.subscribes,
      date: moment(item.date).format('DD/MM/YYYY'),
      slug: item.slug,
      categories: item.categories,
    };
  }


  deleteMeetup = (id) => {
    const { deleteMeetupRequest } = this.props;
    const toastrConfirmOptions = {
      onOk: () => deleteMeetupRequest(id),
      onCancel: () => {},
      okText: 'Deletar',
      cancelText: 'Cancelar',
    };
    toastr.confirm('Deseja deletar este Meetup!', toastrConfirmOptions);
  }

  updateMeetup = () => {
    const { setMeetupUpdate, item } = this.props;
    setMeetupUpdate(item);
  }

  render() {
    const { auth } = this.props;
    const {
      id, title, url, userId, subscribes, date, slug, categories,
    } = this.state;

    return (
      <Article>
        <Image img={url}>
          <img src={`${url}?${Math.random()}`} alt={title} />
          {userId !== auth.user.id
            ? (
              <Fragment />
            ) : (
              <div>
                <Link to="meetup/update" type="button" onClick={() => this.updateMeetup()}>
                  <i className="fa fa-pencil" aria-hidden="true" />
                </Link>
                <button type="button" onClick={() => this.deleteMeetup(id)}>
                  <i className="fa fa-trash" aria-hidden="true" />
                </button>
              </div>
            )
          }
        </Image>
        <BoxDetail>
          <Detail>
            <h2>{title}</h2>
            <p>
              <span>
                {`${subscribes.length} Membro`}
                {subscribes.length > 1 && <span>s</span>}
              </span>
              <span>{date}</span>
            </p>
          </Detail>

          <Link to={`/meetup/inscricao/${slug}`} onClick={() => this.updateMeetup()}>
            <i className="fa fa-chevron-right" aria-hidden="true" />
          </Link>
        </BoxDetail>
        {categories[0] && (
          <Categories>
            {categories.map(c => <span key={c.id}>{c.name}</span>)}
          </Categories>
        )}
      </Article>


    );
  }
}

export default ItemMeetup;
