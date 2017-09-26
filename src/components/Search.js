import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../API/BooksAPI'
import PropTypes from 'prop-types'
import DisplayBook from './DisplayBook'

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
        const { results } = this.state;
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
            {
                results.map((book) => (
              <DisplayBook key={book.id} book={book} onChangeShelf={this.props.onShelfSelect}/>
            ))}
              
          </ol>
            </div>
        </div>
        )
    }
}






export default Search