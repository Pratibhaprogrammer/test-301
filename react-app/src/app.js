import React from 'react';

import axios from 'axios';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import AddNewItem from './components/add-item.js';
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
    try{
      // console.log(item);
    // this.state.items.push(item);
    await axios.post(`${API_SERVER}/items`, { name: item.name, description: item.description });
    this.getItems();
    }catch(err){
      console.log(err.message);
    }
    
  }


  deleteItem = async (id) => {
    await axios.delete(`${API_SERVER}/items/${id}`);
    this.getItems();
  }

  updateItem = async (item) => {
    try{ 
      await axios.put(`${API_SERVER}/items/${item._id}`, item);
      // console.log('in update', this.state.items);
      await this.getItems();
    } catch(err){
      console.log(err.message);
    }
  }

  async componentDidMount() {
    this.getItems();
  }

  getItems = async () => {
    console.log()
    try {
      const response = await axios.get(`${API_SERVER}/items`);
      const items = response.data;
      console.log('response', response);
      this.setState({ items });
    } catch (err) {
      console.log(err.message);
    }
  }

  render() {
    return (
      <Container className='mainbody' >
      <Form>
        <div>
          <h1>Our Items</h1>
          <AddNewItem handleAddItem={this.addItem} />
          <hr />
          <Items
            handleUpdate={this.updateItem}
            handleDelete={this.deleteItem}
            itemsList={this.state.items} />
        </div>
      </Form>
      </Container>
    );
  }
}


export default App;
