import axios from 'axios';
import { Component } from 'react';
import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import UserInfo from '../user-info-panel/user-info-panel';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        email: '',
        location: '',
        company: '',
        img: '',
        bio: '',
        languages: '',
        topRepos: '',
        toggle: false,
        error: false
    }
  }
  getData = (user) => {
    axios.get(`https://api.github.com/users/${user}`)
    .then(response => {

        console.log(response.data);
        const userInfo = response.data;

        axios.get(`https://api.github.com/users/${user}/repos`).then(response => {

          const userRepos = response.data;
          let languageArr = [];
          let topReposArr = [];

          console.log(userRepos);

          // Language percentage

          userRepos.forEach(obj => {
            obj.language ? languageArr.push(obj.language) : null;
          });

          const languages = languageArr.reduce((acc, rec) => {
              return (typeof acc[rec] !== 'undefined') 
                ? { ...acc, [rec]: acc[rec] + 1 } 
                : { ...acc, [rec]: 1 }
          }, {});

          let total = 0;
          const languageValues = Object.values(languages);
          const languageKeys = Object.keys(languages);

          for (let amount of languageValues) {
              total += amount;
          }

          languageKeys.forEach(key => languages[key] = Math.round(languages[key] * 100 / total) + '%');
          
          let str = '';

          for (const [key, value] of Object.entries(languages)) {
              str += `${key}(${value}), `;
          }

          this.setState({languages: str.length > 3 ? `Languages: ${str.slice(0,-2)}` : 'No repositories found'})

          // Top Repositories

          if (userRepos.length > 0) {

            let sortedByStars = userRepos.sort((prev, next) => next.stargazers_count - prev.stargazers_count);

            for (let i = 0; i < 3; i++) {
              topReposArr.push(sortedByStars[i])
            }

            const reposToRender = topReposArr.filter(item => item).map(obj => (
              {
                name: obj.name, 
                description: obj.description?.length > 80 ? `${obj.description.replace(/:[^:]+:/gi, '').slice(0, 80)}...` : obj.description, 
                stars: obj.stargazers_count, 
                forks: obj.forks
              }));
            
            this.setState({topRepos: reposToRender});
          } else {this.setState({topRepos: ''})}

        })
        
        this.setState({
          name: userInfo.name,
          email: userInfo.email,
          location: userInfo.location,
          company: userInfo.company,
          img: userInfo.avatar_url,
          bio: userInfo.bio,
          toggle: true,
          error: false
        })
    })
    .catch(error => {
      console.log(error.message);
      this.setState({error: true, toggle: false})
    })
  }

  render() {
    const {name, email, location, company, img, toggle, error, bio, languages, topRepos} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <div id="wrapper">
            <AppHeader/>
            <SearchPanel getData={this.getData}/>
            <UserInfo 
              name={name} 
              email={email} 
              location={location} 
              company={company} 
              img={img}
              bio={bio} 
              toggle={toggle} 
              error={error}
              languages={languages}
              topRepos={topRepos}/>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
