import React from 'react';

import UpdateItemForm from './update-item';
import {Button} from "react-bootstrap";
class Items extends React.Component {

  render() {

    return (
      <section>
        <h1>Items...</h1> 
        <>
        {
          this.props.itemsList.map( (item,idx) =>
            <div key={idx}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <blockquote>{item.notes}</blockquote>
              <UpdateItemForm item={item} handleUpdate={this.props.handleUpdate} />
              <Button
              variant="info"
              style={{ marginTop: "2rem" }}
              data-testid={`delete-button-${item.name}`}
              onClick={() => this.props.handleDelete(item._id)}
            >
              Delete Item
            </Button>
            </div>
          )
        }
        </>
      </section>
    );
  }
}

export default Items;