import React, { Component } from "react";
import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "./Template/TabPanel";
import Snackbar from "@material-ui/core/Snackbar";
import News from "./News/News";
import Archive from "./Archive/Archive";
import Favorites from "./Favorites/Favorites";
import Alert from "./Template/Alert";
import { changeArchive } from "./utils";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      content: [],
      openDelete: false,
      openArchive: false,
      openRecovery: false,
    };
  }

  // Получение новостей
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ content: data });
        // localStorage.setItem("dataStore", JSON.stringify(this.state.content));
      });
  }

  /* componentDidMount = () => {
    const dataStore = JSON.parse(localStorage.getItem("dataStore"));
    const dataArchive = JSON.parse(localStorage.getItem("dataArchive"));
    const dataFavorites = JSON.parse(localStorage.getItem("dataFavorites"));
    if (dataStore !== null) {
      this.setState({ content: dataStore });
      this.setState({ archive: dataArchive });
      this.setState({ favorites: dataFavorites });
    }
  }; */

  // Переключение вкладок
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  // Удаление новости
  deleteNew = (id) => {
    this.setState((state) => {
      let copy = [...this.state.content];
      let arr = {
        ...state,
        content: copy.filter((item) => item.id !== id),
      };
      return {
        content: arr.content,
        openDelete: !state.openDelete,
      };
    });
    console.log(this.state.content);
  };

  // Восстановление новости из архива
  recoveryNews = (id) => {
    let arr = this.state.archive;
    let arr2 = this.state.content;
    let itemArchive = arr.filter((item) => item.id !== id);
    let itemNews = arr.find((item) => item.id === id);
    this.setState({
      archive: itemArchive,
      content: [...arr2, itemNews].sort((a, b) => a.id - b.id),
      openRecovery: true, // Всплывающее окно "Новость восстановлена!"
    });
  };

  // Добавление новости в избранное
  addFavorites = (id) => {
    let arr2 = this.state.content;
    let result = arr2.find((item) => item.id === id);
    this.setState({
      favorites: [...this.state.favorites, result],
    });
  };

  // Убрать новость из избранных
  deleteFavorites = (id) => {
    let arr = this.state.favorites;
    let itemFavorites = arr.filter((item) => item.id !== id);
    this.setState({ favorites: itemFavorites });
  };

  // Закрыть высплывающие окна
  handleClose = () => {
    this.setState({ openDelete: false });
    this.setState({ openArchive: false });
    this.setState({ openRecovery: false });
  };

  render() {
    const { content, archive, favorites } = this.state;

    return (
      <div className="wrapper">
        <AppBar position="static">
          <Tabs value={this.state.value} onChange={this.handleChange}>
            <Tab label="Новости"></Tab>
            <Tab label="Архив"></Tab>
            <Tab label="Избранное"></Tab>
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
          <News
            todo={content}
            deleteNew={this.deleteNew}
            addFavorites={(value) =>
              this.setState({
                content: changeArchive(value, content, true, "like"),
              })
            }
            addArchive={(value) =>
              this.setState({
                content: changeArchive(value, content, true, "archive"),
              })
            }
            deleteFavorites={(value) =>
              this.setState({
                content: changeArchive(value, content, false, "like"),
              })
            }
          />
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          <Archive
            archive={content}
            deleteArchive={(value) =>
              this.setState({
                content: changeArchive(value, content, false, "archive"),
              })
            }
            recoveryNews={this.recoveryNews}
          />
        </TabPanel>
        <TabPanel value={this.state.value} index={2}>
          <Favorites todos={content} />
        </TabPanel>
        <div>
          <Snackbar
            open={this.state.openDelete}
            autoHideDuration={3000}
            onClose={this.handleClose}
          >
            <Alert onClose={this.handleClose} severity="success">
              Новость удалена!
            </Alert>
          </Snackbar>
          <Snackbar
            open={this.state.openArchive}
            autoHideDuration={3000}
            onClose={this.handleClose}
          >
            <Alert onClose={this.handleClose} severity="success">
              Новость добавлена в архив!
            </Alert>
          </Snackbar>
          <Snackbar
            open={this.state.openRecovery}
            autoHideDuration={3000}
            onClose={this.handleClose}
          >
            <Alert onClose={this.handleClose} severity="info">
              Новость восстановлена!
            </Alert>
          </Snackbar>
        </div>
      </div>
    );
  }
}
export default App;
