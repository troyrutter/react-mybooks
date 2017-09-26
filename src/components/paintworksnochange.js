import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../API/BooksAPI'
import PropTypes from 'prop-types'
//import Book from './DisplayBook'

class Search extends Component {
        static propTypes = {
        changeShelf : PropTypes.func
    }
    
    state = {
        query: '',
        results: []
    }
    updateQuery = (query) => {
        this.setState({
            query: query
        })
        if (query){
            BooksAPI.search(query.trim(), 50).then((results) => {
                if(!results || results.error){
                    this.setState({results: []})
                } else {
                    this.setState({results:results})   
                }
            }              
         )}      
    }

   render(){
        const { changeShelf  } = this.props;
        const { results } = this.state
        return (
        <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" 
                        placeholder="Search by title or author"
                        value={this.state.query}
                        onChange={(event) => this.updateQuery(event.target.value)}/>

              </div>
            </div>
            <div className="search-books-results">
                  <ol className="books-grid">
                      {results.map((book)=>(
                            <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                    <select value={book.shelf}
                                        onChange={(e) => changeShelf (book,e.target.value)}>
                                        <option value="" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors && book.authors.map((author)=>{
                                return(
                                <div key={author} className="author">{author}</div>
                                        )
                            })}</div>
                        </div>
                        </li>
                        ))}             
                      
                      </ol>
            </div>
        </div>
        )
    }
}




export default Search