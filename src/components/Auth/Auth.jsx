import React from 'react'
import './Auth.styl'
import { inject, observer } from 'mobx-react'
import { Button, Input, FormLabel } from '@material-ui/core'
import routes from '../../router/routes'
import logger from '../../utils/logger'
import { saveTokens } from '../../utils/helpers'

const AUTH_TYPE_LOGIN = 0
const AUTH_TYPE_REGISTER = 1

@inject('router')
@observer
class Auth extends React.Component {
  state = {
    email: '',
    password: ''
  }

  componentDidMount() {
    const { location } = this.props
    this.setState(state => ({
      ...state,
      type: location.pathname.indexOf('login') >= 0 ? AUTH_TYPE_LOGIN : AUTH_TYPE_REGISTER
    }))
  }

  onAuthorized = ({ login }) => {
    const { router } = this.props
    saveTokens(login)
    router.push(routes.home)
  }

  onAuthorizationError = error => logger.log(error)

  handleEmailChange = e => this.setState({ email: e.target.value })

  handlePwdChange = e => this.setState({ password: e.target.value })

  performAuth = (email, pwd) => {
    // TODO: login
  }

  render() {
    const { email, password, type } = this.state
    return (
      <div className="auth">
        <>
          <header>
            <h1>Auth</h1>
          </header>
          <form>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={this.handleEmailChange}
              placeholder="Enter email*"
            />
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={this.handlePwdChange}
              placeholder="Enter password*"
            />
            <Button
              style={{
                marginTop: 24,
                background: '#4877bf',
                height: 40,
                color: '#fff'
              }}
              onClick={this.performAuth(email, password)}
            >
              Sign {type === AUTH_TYPE_LOGIN ? ' In' : ' Up'}
            </Button>
            <a
              className="auth__change-type-link"
              href={
                type === AUTH_TYPE_LOGIN
                  ? routes.auth.signup.path
                  : routes.auth.login.path
              }
            >
              Go to Sign{type === AUTH_TYPE_LOGIN ? 'Up' : ' In'}
            </a>
          </form>
        </>
      </div>
    )
  }
}

export default Auth