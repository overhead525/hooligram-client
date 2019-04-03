import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { appStartup } from 'hg/actions/app'
import { websocketConnect } from 'hg/actions/websocket'
import { colors, dimensions } from 'hg/constants'
import { setTopLevelNavigator } from 'hg/middlewares/navigation'
import Navigation from 'hg/navigation'

class App extends Component {
  static propTypes = {
    appStartup: PropTypes.func.isRequired,
    isWebsocketOnline: PropTypes.bool.isRequired
  }

  render () {
    return (
      <>
        {!this.props.isWebsocketOnline && (
          <View
            style={{
              alignItems: 'center',
              backgroundColor: colors.GOOGLE_RED,
              justifyContent: 'center',
              paddingVertical: dimensions.PADDING
            }}
          >
            <Text
              style={{
                color: colors.WHITE
              }}
            >
              You are offline. Reconnecting...
            </Text>
          </View>
        )}
        <Navigation ref={setTopLevelNavigator}/>
      </>
    )
  }

  componentDidMount () {
    this.props.appStartup()
    this.props.websocketConnect()
  }
}

const mapDispatchToProps = dispatch => {
  return {
    appStartup: () => {
      dispatch(appStartup())
    },

    websocketConnect: () => {
      dispatch(websocketConnect())
    }
  }
}

const mapStateToProps = (state) => {
  const {
    app: {
      isWebsocketOnline
    }
  } = state

  return {
    isWebsocketOnline
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
