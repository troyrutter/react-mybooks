import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './API/BooksAPI'

import Search from './components/Search'
import Shelves from './components/Shelves'
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
         <Shelves />
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
