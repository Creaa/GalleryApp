import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      numberOfPhotos: 12,
      fade: "FadeIn 2s forwards",
      page: 0,
      imagesToShow: [],
      fetchData: true // To avoid infinite loop
    }
  }
  componentDidMount = () => {
    this.fetchData()
  }
  componentDidUpdate = () => {
    this.fetchData()
  }
  fetchData = () => {
    if (this.state.fetchData) {
      fetch(`https://jsonplaceholder.typicode.com/photos?_start=${this.state.page * this.state.numberOfPhotos}&_limit=${this.state.numberOfPhotos}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then((data) => {
          let imagesToJoin = []; // temporary variable to save objects without state's changing
          data.forEach((el) => {
            imagesToJoin.push(el)
          })
          this.setState({
            fade: "FadeIn 2s forwards",
            imagesToShow: imagesToJoin,
            fetchData: false
          })
        })
    }
  }
  imgClickHandler = (e) => {
    this.setState({
      clickedPhotoUrl: e.target.getAttribute('url'),
      photoToShow: e.target.getAttribute('thumb'),
      clickedPhotoThumb: e.target.getAttribute('thumb')
    })
  }
  photoHoverHandler = () => {
    this.setState({
      photoToShow: this.state.clickedPhotoUrl
    })
  }

  photoHoverOutHandler = () => {
    this.setState({
      photoToShow: this.state.clickedPhotoThumb
    })
  }

  nextPage = () => {
    this.setState({
      fade: "FadeOut 1s forwards",
      page: this.state.page + 1,
      fetchData: true,
    })
  }

  prevPage = () => {
    if (this.state.page > 0) {
      this.setState({
        fade: "FadeOut 1s forwards",
        page: this.state.page - 1,
        fetchData: true,
      })
    }
    else return false;
  }
  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <div className="first-column">
            <h1 className="gallery-title">My Gallery!</h1>
            <ul className="gallery-list">
              {this.state.imagesToShow.map((el, k) => {
                return <li
                  className="gallery-element"
                  key={k}
                  style={{ animation: `${this.state.fade}` }}
                >
                  <a className="gallery-link"
                    onClick={this.imgClickHandler}
                    thumb={el.thumbnailUrl}
                    url={el.url}
                    style={{
                      background: `url(${el.url}) center/cover`
                    }}>
                  </a>
                  <p className="photo-title">{el.title}</p>
                </li>
              })}
            </ul>
            <div className="pagination">
              <span onClick={this.prevPage} className="pageArrow">&lt;</span>
              <p className="numberOfPage">{this.state.page + 1}</p>
              <span onClick={this.nextPage} className="pageArrow">&gt;</span>
            </div>
          </div>
          <div className="second-column">
            <img src={this.state.photoToShow} onMouseLeave={this.photoHoverOutHandler} onMouseOver={this.photoHoverHandler} alt="" className="view-photo" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
