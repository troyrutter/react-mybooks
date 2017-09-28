import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './API/BooksAPI'
import Bookshelf from './components/BookShelf'
import Search from './components/Search'
import './App.css'

class MyReadsApp extends React.Component {
  state = {
    listBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({listBooks: books})
    });
  }


  changeShelf = (event) => {
    BooksAPI.update({id: event.target.id}, event.target.value).then((response) => {
       BooksAPI.getAll().then((books) => {
        this.setState({listBooks: books})
      });
    });
  }

  render() {
    const { listBooks } = this.state;
    return (
      <div className="app">
        <Route exact path='/' render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf 
                  title='Currently Reading' 
                  books={listBooks.filter((book) => book.shelf === 'currentlyReading')} 
                  onChangeShelf={this.changeShelf} />
                <Bookshelf 
                  title='Want to Read' 
                  books={listBooks.filter((book) => book.shelf === 'wantToRead')} 
                  onChangeShelf={this.changeShelf} />
                <Bookshelf 
                  title='Read' 
                  books={listBooks.filter((book) => book.shelf === 'read')} 
                  onChangeShelf={this.changeShelf} />
              </div>
            </div>
             <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}
        />
        <Route path='/search' render={({history})=>(
          <Search 
            currentBooks={listBooks} 
            onShelfSelect={(event)=>{
            this.changeShelf(event)
            history.push('/')
          }}/>
        )}
        />
      </div>
    )
  }
}

export default MyReadsApp
