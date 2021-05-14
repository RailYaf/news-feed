import React, { Component } from "react";
import "./News.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: [],
    };
  }

 /*  componentDidMount = () => {
    localStorage.setItem("dataLike", JSON.stringify(this.state.like));
  };

  componentDidUpdate = () => {
    const dataLike = JSON.parse(localStorage.getItem("dataLike"));
    this.setState({ like: dataLike });
  }; */

  handleClickDelete = (id) => {
    this.props.deleteNew(id);
  };

  getValueFavotites = (id) => {
    const currentIndex = this.state.like?.indexOf(id);
    const newChecked = [...this.state.like];
    if (currentIndex === -1) {
      newChecked.push(id);
      const newLocal = id + 1;
      this.props.addFavorites(newLocal);
    } else {
      this.props.deleteFavorites(id);
      newChecked.splice(currentIndex, 1);
      const newLocal = id + 1;
      this.props.deleteFavorites(newLocal);
    }
    this.setState({ like: newChecked });
  };

  handleClickArchive = (id) => {
    this.props.addArchive(id);
  };

  render() {
    let todo = this.props.todo;

    return (
      <List>
        {todo.map((item) => {
          return (
            <ListItem
              key={item.id}
              role={undefined}
              dense
              button
              onChange={() => this.getValueFavotites(item.id - 1)}
            >
              <ListItemText primary={`${item.body}`} />
              <ListItemIcon>
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  checked={this.state.like.indexOf(item.id - 1) !== -1}
                />
              </ListItemIcon>
              <Button
                className="acrhive"
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                size="small"
                onClick={() => this.handleClickArchive(item.id)}
              >
                в архив
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

export default News;
