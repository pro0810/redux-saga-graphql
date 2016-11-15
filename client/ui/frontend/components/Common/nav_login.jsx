import React, {Component} from 'react'
import LoadingButton from './loading_button'
import {Link} from 'react-router'
import { connect } from 'react-redux'

import {logout, clearError} from 'store/actions/login'

class NavLogin extends Component {
  constructor (props) {
    super(props)
    this._logout = this._logout.bind(this)
    this._clearError = this._clearError.bind(this)
  }

  render () {
    let navButtons = this.props.loggedIn ? (
      <div>
        <Link to='/dashboard'>Dashboard</Link>
        {' '}
        {this.props.currentlySending ? (
          <LoadingButton className='btn--nav' />
        ) : (
          <a href='javascript:void(0)' onClick={this._logout}>Logout</a>
        )}
      </div>
    ) : (
      <div>
        <Link to='/register' className='btn btn--login btn--nav' onClick={this._clearError}>Register</Link>
        {' '}
        <Link to='/login' className='btn btn--login btn--nav' onClick={this._clearError}>Login</Link>
      </div>
    )

    return (
      <div className='nav'>
        <div className='nav__wrapper'>
          <Link to='/' className='nav__logo-wrapper' onClick={this._clearError}>
            <h1 className='nav__logo'>Login&nbsp;Flow</h1>
          </Link>
          {navButtons}
        </div>
      </div>
    )
  }

  _logout () {
    this.props.dispatch(logout())
  }

  _clearError () {
    this.props.dispatch(clearError())
  }
}

NavLogin.propTypes = {
  loggedIn: React.PropTypes.bool,
  currentlySending: React.PropTypes.bool,
  dispatch: React.PropTypes.func
}

// actions is map dispatch to props, by default dispatch is pass to if there is no action creator
// and ofcourse don't listen to any store (part of the whole state)
export default connect()(NavLogin)
