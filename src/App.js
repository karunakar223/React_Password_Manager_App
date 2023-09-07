import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './App.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    passwordsList: [],
    isShow: false,
    isTrue: false,
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onAddContent = e => {
    e.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const firstLetter = websiteInput.slice(0, 1).toUpperCase()
    const setClassName = colorList[Math.floor(Math.random() * 5)]
    const newInputValues = {
      id: uuidv4(),
      initial: firstLetter,
      websiteName: websiteInput,
      username: usernameInput,
      password: passwordInput,
      addClassName: setClassName,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newInputValues],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  showPasswords = e => {
    if (e.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  deleteItem = id => {
    const {passwordsList} = this.state
    const newList = passwordsList.filter(eachPass => eachPass.id !== id)
    const inCase = newList.length !== 0
    this.setState({passwordsList: newList, isTrue: inCase})
  }

  render() {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      passwordsList,
      isShow,
      searchInput,
    } = this.state

    let {isTrue} = this.state
    const newList = passwordsList.filter(eachItem =>
      eachItem.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="inputs-container">
          <div className="add-passwords-container">
            <form className="form" onSubmit={this.onAddContent}>
              <h1 className="password-heading">Add New Password</h1>
              <div className="input-1">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  className="website"
                  alt="website"
                />
                <input
                  type="text"
                  className="text-box"
                  placeholder="Enter Website"
                  onChange={this.onChangeWebsite}
                  value={websiteInput}
                />
              </div>
              <div className="input-2">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  className="username"
                  alt="username"
                />
                <input
                  type="text"
                  className="username-box"
                  placeholder="Enter Username"
                  onChange={this.onChangeUsername}
                  value={usernameInput}
                />
              </div>
              <div className="input-3">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  className="password"
                  alt="password"
                />
                <input
                  type="password"
                  className="password-box"
                  placeholder="Enter Password"
                  onChange={this.onChangePassword}
                  value={passwordInput}
                />
              </div>
              <div className="btn-con">
                <button type="submit" className="add-btn">
                  Add
                </button>
              </div>
            </form>
          </div>

          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-img"
          />
        </div>
        <div className="get-your-password-container">
          <div className="wrap-container">
            <div className="passwords-count">
              <h1 className="your-pwd">Your Passwords</h1>
              <p className="length">{passwordsList.length}</p>
            </div>
            <div className="search-password-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="img-search"
              />
              <input
                type="search"
                className="search"
                onChange={this.onChangeSearchInput}
                placeholder="Search"
                value={searchInput}
              />
            </div>
          </div>
          <hr />
          <div className="checkbox-container">
            <input
              type="checkbox"
              onChange={this.showPasswords}
              className="checkbox"
              id="check"
            />
            <label htmlFor="check" className="check">
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className="empty-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="empty-img"
              />
              <p className="password-msg">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="non-empty-container">
              {newList.map(each => (
                <li className="li-item" id={each.id} key={each.id}>
                  <p className={`letter ${each.addClassName}`}>
                    {each.initial}
                  </p>
                  <div className="content-container">
                    <p className="website-name">{each.websiteName}</p>
                    <p className="username">{each.username}</p>
                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                        className="stars"
                      />
                    )}
                    {isShow && <p className="pass">{each.password}</p>}
                  </div>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => this.deleteItem(each.id)}
                    data-testid="delete"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      className="delete-icon"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
