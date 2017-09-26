import React, { Component } from 'react'
import PropTypes from 'prop-types'

class DisplayBook extends Component {
  static propTypes = {
    book: PropTypes.shape({
    id: PropTypes.string,
    imageLinks: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array,
    shelf: PropTypes.string
  }),
    onChangeShelf: PropTypes.func,
  }

  render () {
    const { book, onChangeShelf } = this.props;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
            <div className="book-shelf-changer">
              <select id={book.id} value={book.shelf ? book.shelf : 'none'} onChange={onChangeShelf}>
              {console.log({book})}
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
             
                <option value="none">None</option>
             }
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
            {book.authors && book.authors.map(author => (
            <div key={author} className="book-authors">{author}</div>
          ))}
        </div>
      </li>
    )
  }
}

export default DisplayBook