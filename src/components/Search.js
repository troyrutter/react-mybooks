import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../API/BooksAPI'
import PropTypes from 'prop-types'
import DisplayBook from './DisplayBook'

// This component sets of the search state and calls the appropriate API and calls ther DisplayBook component for every response

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
            BooksAPI.search(query.trim()).then((results) => {
                if(!results || results.error){
                    this.setState({results: []})
                } else {
                  results.map(book => (this.props.currentBooks.filter((b) => 
                        b.id === book.id).map(b => book.shelf = b.shelf)))
                    this.setState({results:results})   
                }
            }   
         )}      
        else {
             this.setState({results: []})
            }  
    }


   render(){
        const { results } = this.state;
        //console.log(this.props.currentBooks) //echo our current books props to make sure we are getting data
        //console.log(results)
        //console.log(booksList.length)
        
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
               
              <DisplayBook key={book.id} book={book} shelf={book.shelf} onChangeShelf={this.props.onShelfSelect}/>
            ))}
              
          </ol>
            </div>
        </div>
        )
    }
    
}

export default Search