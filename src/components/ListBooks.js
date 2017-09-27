import React from 'react'
import PropTypes from 'prop-types'
import Book from './DisplayBook'

// This component renders the main bookshelf for the default state and maps through the books to display them on the correct shelf

ListBooks.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array
}

function ListBooks({title, books, onChangeShelf}) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <Book key={book.id} book={book} onChangeShelf={onChangeShelf} />
          ))}
        </ol>
      </div>
    </div>
  )
}

export default ListBooks