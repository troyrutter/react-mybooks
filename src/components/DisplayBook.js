import React, { Component } from 'react'
import PropTypes from 'prop-types'

// This is the master DisplayBook component. It shows the books in both the default and search (query) states.

class DisplayBook extends Component {
  static propTypes = {
    book: PropTypes.shape({
    id: PropTypes.string,
    imageLinks: PropTypes.object,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array,
    shelf: PropTypes.string
  }),
    onChangeShelf: PropTypes.func,
  }

  render () {
    const { book, onChangeShelf } = this.props;
    // set up a default image for the cover just in case. Uploaded jpg to a public store
    let url = 'https://i.imgur.com/b3dwvna.jpg';
    if (book.imageLinks) {
    // reset http with https to stop ionsecure browsing warnings
        url = book.imageLinks.thumbnail.replace('http://', 'https://'); 
    }

    return (

      <li> 
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url( ${url} )`}}></div> }
            <div className="book-shelf-changer">
              <select id={book.id} value={book.shelf ? book.shelf : 'none'} onChange={onChangeShelf}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>  }
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

export default DisplayBook;