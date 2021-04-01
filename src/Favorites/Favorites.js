import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

class Favorites extends Component {
  render() {
    let todos = this.props.todos;
    return (
      <List>
        {todos.map((item) => {
          return (
            <ListItem key={item.id} dense button>
              <ListItemText primary={`${item.body}`} />
            </ListItem>
          );
        })}
      </List>
    );
  }
}

export default Favorites;
