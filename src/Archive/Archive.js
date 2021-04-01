import React, { Component } from "react";
import "./Archive.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

class Archive extends Component {
  handleClickDelete = (id) => {
    this.props.deleteArchive(id);
  };

  handleClickRecovery = (id) => {
    this.props.recoveryNews(id);
  };

  render() {
    let archive = this.props.archive;
    return (
      <List>
        {archive.map((item) => {
          return (
            <ListItem key={item.id} dense button>
              <ListItemText primary={`${item.body}`} />
              <Button
                variant="contained"
                color="inherit"
                size="small"
                onClick={() => this.handleClickRecovery(item.id)}
              >
                Восстановить
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                size="small"
                onClick={() => this.handleClickDelete(item.id)}
              >
                Удалить
              </Button>
            </ListItem>
          );
        })}
      </List>
    );
  }
}

export default Archive;
