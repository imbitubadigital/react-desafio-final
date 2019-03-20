import React, { Fragment, Component } from 'react';
import api from '~/services/api';
import PropTypes from 'prop-types';
import Files from 'react-files';
import { toastr } from 'react-redux-toastr';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

import {
  BoxNew,
  Image,
  Drop,
  Checks,
  Box,
  ButtonSubmit,
} from '../styles';

class FormMeetup extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    loader: PropTypes.bool.isRequired,
    meetup: PropTypes.shape({
      title: PropTypes.string,
      date: PropTypes.string,
      description: PropTypes.string,
      location: PropTypes.string,
      file: PropTypes.shape({
        url: PropTypes.string,
      }),

    }),
  };

  static defaultProps = {
    meetup: null,
  };

  constructor(props) {
    super(props);
    const { meetup } = props;

    this.state = {
      categories: !meetup ? [] : meetup.categories.map(({ id }) => id),
      cats: [],
      title: meetup ? meetup.title : '',
      description: meetup ? meetup.description : '',
      location: meetup ? meetup.location : '',
      date: meetup ? moment(meetup.date).toDate() : new Date(),
      images: [],
    };
  }

  async componentDidMount() {
    const response = await api.get('/preferences');
    this.setState({ cats: response.data });
  }

  checkedPreference = (id) => {
    const { categories } = this.state;
    return categories.indexOf(id) > -1;
  }

  handleCheckboxChange = async (e) => {
    const { categories } = this.state;
    const { target } = e;
    const value = parseInt(target.value, 16);

    if (target.checked) {
      this.setState({ categories: [...categories, value] });
    } else {
      const newPref = categories.filter(p => p !== value);
      this.setState({ categories: newPref });
    }
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleInputDate = (dateForm) => {
    this.setState({ date: dateForm });
  }

  handleFilesChange = (files) => {
    this.setState({ images: files });
  }

  handleFilesError = (error) => {
    const { meetup } = this.props;
    switch (error.code) {
      case 1:
        return toastr.warning('Atenção', 'Tipo de arquivo inválido!');
      case 2:
        return toastr.warning('Atenção', 'Arquivo muito grande!');
      case 3:
        return toastr.warning('Atenção', 'Arquivo muito pequeno!');
      case 4:
        return toastr.warning('Atenção', meetup ? 'Selecione outra imagem se desejar!' : 'Selecione uma imagem!');
      default:
        return false;
    }
  }


  handleSubmit = (e) => {
    e.preventDefault();
    const {
      categories, title, description, location, date, images,
    } = this.state;
    const { onSubmit } = this.props;
    onSubmit(
      categories, title, description, location, date, images,
    );
  }

  render() {
    const {
      cats, images, title, description, location, date,
    } = this.state;


    const { loader, meetup } = this.props;
    return (
      <Fragment>

        <BoxNew encType="multipart/form-data" onSubmit={this.handleSubmit}>
          <span>Titulo</span>
          <input
            name="title"
            placeholder="Digite o título do meetup"
            value={title}
            onChange={this.handleInputChange}
          />

          <span>Descrição</span>
          <textarea
            name="description"
            rows="5"
            value={description}
            placeholder="Descreva seu meetup"
            onChange={this.handleInputChange}
          />

          <Files
            className="files-dropzone"
            onChange={this.handleFilesChange}
            onError={this.handleFilesError}
            accepts={['image/png', 'image/jpg', '.jpg']}
            maxFiles={1}
            multiple={false}
            maxFileSize={10000000}
            minFileSize={0}
            clickable
          >
            { !meetup && images.length > 0
              ? images.map(img => (
                <div key={img.preview.url}>
                  <Image img={img.preview.url} />
                </div>
              )) : (
                <Fragment>
                  { meetup && images.length > 0
                    ? images.map(img => (
                      <div key={img.preview.url}>
                        <Image img={img.preview.url} />
                      </div>
                    )) : (
                      <Fragment>
                        { meetup && meetup.file
                          ? (
                            <div key={meetup.file.url}>
                              <Image img={meetup.file.url} />
                            </div>
                          ) : (
                            <Drop>
                              <i className="fa fa-camera" aria-hidden="true" />
                              Selecione uma imagem
                            </Drop>
                          )
                        }
                      </Fragment>
                    )
                  }
                </Fragment>
              )
            }
          </Files>
          <span>Localização</span>

          <input
            name="location"
            placeholder="Onde seu meetup irá acontecer?"
            value={location}
            onChange={this.handleInputChange}
          />

          <span>Data do evento</span>
          <DatePicker
            selected={date}
            onChange={this.handleInputDate}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="dd/MM/yyyy HH:mm:ss"
            timeCaption="time"
          />

          <span>Temas do Meetup</span>
          <Box>
            {cats && cats.map(cat => (
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
          {!loader
            ? (<ButtonSubmit type="submit">{meetup ? <span>Atualizar</span> : <span>Salvar</span>}</ButtonSubmit>)
            : (
              <ButtonSubmit type="button">
                <i className="fa fa-spinner" aria-hidden="true" />
              </ButtonSubmit>
            )
          }
        </BoxNew>
      </Fragment>
    );
  }
}

export default FormMeetup;
