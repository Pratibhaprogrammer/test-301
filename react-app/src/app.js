import React from 'react';

import axios from 'axios';

import Form from './components/add-item.js';
import Items from './components/items.js';


const API_SERVER = process.env.REACT_APP_API;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  addItem = async (item) => {
    console.log(item);
    await axios.post(`${API_SERVER}/items`, item);
    this.getItems();
  }

  deleteItem = async (id) => {
    console.log(id);
    await axios.delete(`${API_SERVER}/items/${id}`);
    this.getItems();
  }

  updateItem = async (item) => {
    await axios.put(`${API_SERVER}/items/${item._id}`, item);
    this.getItems();
  }

  getItems = async () => {
    //  e.preventDefault();
    console.log('items', this.state.items);
    console.log('hey', this.state.items);
    // const SERVER = 'http://localhost:3001';
    const response = await axios.get(`${API_SERVER}/items`, {params: {items: this.state.items}});
    const items = response.data;
    this.setState({items});
    
  }

  async componentDidMount() {
     this.getItems();
  }

  render() {
    return (
      <div>
        <h1>Our Items</h1>
        <Form handleAddItem={this.addItem} />
        <hr />
        <Items handleDelete={this.deleteItem} itemsList={this.state.items} />
      </div>
    );
  }
}

export default App;
