import React from 'react'
import PropTypes from 'prop-types'
import DisplayBook from './DisplayBook'

// This component renders the main bookshelf for the default state and maps through the shelves

bookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array,
}


function bookShelf({title, books, onChangeShelf}) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <DisplayBook key={book.id} book={book} shelf={book.shelf} onChangeShelf={onChangeShelf} />
          ))}
        </ol>
      </div>
    </div>
  )
}

export default bookShelf