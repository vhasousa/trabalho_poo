import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import api from '../../services/api';

import ImageShow from './ImageShow/index'

import {
  Container,
  Title,
  FormColumn,
  InputColumn,
  Button,
  ButtonTable,
  Table,
  Actions
} from "./style";


export default class Books extends Component {

  state = {
    title: "",
    description: "",
    author: "",
    page_number: "",
    year: "",
    publishing_company: "",
    price: "",
    isbn: "",
    selectedFile: "",
    list: [],
    bookInfo: {},
    imgInfor: {},
    page: 1,
    updateId: '',
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { title, description, author, page_number, year, publishing_company, price, isbn, avatar_id, list, updateId, page } = this.state;

    if (!!updateId) {
      await api.put(`/books/${updateId}`, {
        title,
        description,
        author,
        page_number,
        year,
        publishing_company,
        price,
        isbn,
        avatar_id,
      });

      this.setState({
        title: '',
        description: '',
        author: '',
        page_number: '',
        year: '',
        publishing_company: '',
        price: '',
        isbn: '',
        avatar_id: '',
      });

      this.componentDidMount(page);
      return;

    }

    const response = await api.post('/books', {
      title,
      description,
      author,
      page_number,
      year,
      publishing_company,
      price,
      isbn,
      avatar_id,
    });

    this.setState({
      list: [...list, response.data],
      title: '',
      description: '',
      author: '',
      page_number: '',
      year: '',
      publishing_company: '',
      price: '',
      isbn: '',
      avatar_id: '',
    })
  }

  async componentDidMount(page = 1) {
    const response = await api.get(`/books?page=${page}`);
    const { data, ...bookInfo } = response
    this.setState({ list: data, bookInfo, page });
  }

  prevPage = () => {
    const { page } = this.state;
    if (page === 1) return;
    const pageNumber = page - 1;
    this.componentDidMount(pageNumber)
  }

  nextPage = () => {
    const { page, bookInfo } = this.state;
    if (page === bookInfo.pages) return;
    const pageNumber = page + 1;
    this.componentDidMount(pageNumber);
  }

  handleDelete = async id => {
    const { page } = this.state
    if (window.confirm('Tem certeza (S/N)?')) {
      await api.delete(`/books/${id}`);
      this.componentDidMount(page);
    }
  }

  handleUpdate = async id => {
    const response = await api.get(`/books/${id}`);
    const { title, description, author, page_number, year, publishing_company, price, isbn } = response.data;


    this.setState({
      title,
      description,
      author,
      page_number,
      year,
      publishing_company,
      price,
      isbn,
      updateId: id
    })
  }

  render() {

    const { title, description, author, page_number, year, publishing_company, price, isbn, avatar_id, list } = this.state

    return (
      <Container>
        <div className="container mb-10">
          <Title>Cadastro de Livros</Title>
          <FormColumn onSubmit={this.handleSubmit}>

            <InputColumn
              type="text"
              name="title"
              id="title"
              placeholder="Digite o nome do livro"
              value={title}
              onChange={e => this.setState({ title: e.target.value })}
            />
            <InputColumn
              type="text"
              name="description"
              id="description"
              placeholder="Digite a descrição do livro"
              value={description}
              onChange={e => this.setState({ description: e.target.value })}
            />
            <InputColumn
              type="text"
              name="author"
              id="author"
              placeholder="Digite o nome do autor"
              value={author}
              onChange={e => this.setState({ author: e.target.value })}
            />
            <InputColumn
              type="text"
              name="author"
              id="author"
              placeholder="Digite o número de páginas"
              value={page_number}
              onChange={e => this.setState({ page_number: e.target.value })}
            />
            <InputColumn
              type="text"
              name="year"
              id="year"
              placeholder="Digite o ano de publicação"
              value={year}
              onChange={e => this.setState({ year: e.target.value })}
            />
            <InputColumn
              type="text"
              name="publishing_company"
              id="publishing_company"
              placeholder="Digite a editora"
              value={publishing_company}
              onChange={e => this.setState({ publishing_company: e.target.value })}
            />
            <InputColumn
              type="text"
              name="price"
              id="price"
              placeholder="Digite o preço do livro"
              value={price}
              onChange={e => this.setState({ price: e.target.value })}
            />
            <InputColumn
              type="text"
              name="isbn"
              id="isbn"
              placeholder="Digite ISBN"
              value={isbn}
              onChange={e => this.setState({ isbn: e.target.value })}
            />
            <ImageShow>
            <InputColumn
              type='file'
              name='avatar_id'
              value={avatar_id}
              onChange={e => this.setState({ avatar_id: e.target.value })}
            />
            </ImageShow>
            <div>
              <Button type="submit" tipo="add">Salvar</Button>
              <Button tipo="remove">Cancelar</Button>
            </div>
          </FormColumn>

          <Table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Autor</th>
                <th>Número de páginas</th>
                <th>Ano</th>
                <th>Editora</th>
                <th>Preço</th>
                <th>ISBN</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {list.map(book => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.description}</td>
                  <td>{book.author}</td>
                  <td>{book.page_number}</td>
                  <td>{book.year}</td>
                  <td>{book.publishing_company}</td>
                  <td>{book.price}</td>
                  <td>{book.isbn}</td>
                  <td>
                    <ButtonTable onClick={() => this.handleUpdate(book.id)} tipo="put">Alterar</ButtonTable>
                    <ButtonTable onClick={() => this.handleDelete(book.id)} tipo="del">Excluir</ButtonTable>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Actions>
            <button onClick={this.prevPage}>Anterior</button>
            <button onClick={this.nextPage}>Próximo</button>
          </Actions>
        </div>
      </Container>
    )
  }
}
