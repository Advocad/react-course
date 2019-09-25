import React from 'react'; // подключение библиотеки React
import './App.css'; // подключение файла стилей
import { Add } from './components/AddNews';
import { News } from './components/News';

class App extends React.Component {
  state = {
    news: null,
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch('http://localhost:3000/data/DataNews.json')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          news: data,
          isLoading: false,
        });
      });
  }


  handleAddNews = (data) => {
    const nextNews = [data, ...this.state.news];
    this.setState({ news: nextNews });
  };

  render() {
    const { news, isLoading } = this.state;

    return (
      <React.Fragment>
        <Add onAddNews={this.handleAddNews} />
        <h3>Новости</h3>
        {isLoading && <p>Загружаю...</p>}
        {Array.isArray(news) && <News data={news} />}
      </React.Fragment>
    );
  }
}

// скопировано все кроме ReactDOM.render

// добавился export
export default App;
