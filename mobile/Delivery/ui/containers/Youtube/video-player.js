import React, {
  Component
} from 'react'

import {
  AlertIOS,
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { Avatar, Card, ListItem, Toolbar, Button } from 'react-native-material-ui'
import { connect } from 'react-redux'
import Video from 'react-native-video'
import { detailYoutube } from 'Delivery/store/actions/youtube'
import * as youtubeSelectors from 'Delivery/store/selectors/youtube'
import Container from 'Delivery/ui/components/Container'

@connect(state => ({  
  item: youtubeSelectors.getOpenItem(state),  
}), { detailYoutube })
class VideoPlayer extends Component {
  constructor(props) {
    super(props)
    this.onLoad = this.onLoad.bind(this)
    this.onProgress = this.onProgress.bind(this)
    props.detailYoutube(props.route.videoId)
  }
  state = {
    rate: 1,
    volume: 1,
    muted: false,
    resizeMode: 'contain',
    duration: 0.0,
    currentTime: 0.0,
    controls: false,
    paused: true,
    skin: 'custom'
  }

  onLoad(data) {
    this.setState({duration: data.duration})
  }

  onProgress(data) {
    this.setState({currentTime: data.currentTime})
  }

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration)
    } else {
      return 0
    }
  }

  renderSkinControl(skin) {
    const isSelected = this.state.skin == skin
    const selectControls = skin == 'native' || skin == 'embed'
    return (
      <TouchableOpacity onPress={() => { this.setState({
          controls: selectControls,
          skin: skin
        }) }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {skin}
        </Text>
      </TouchableOpacity>
    )
  }

  renderRateControl(rate) {
    const isSelected = (this.state.rate == rate)

    return (
      <TouchableOpacity onPress={() => { this.setState({rate: rate}) }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {rate}x
        </Text>
      </TouchableOpacity>
    )
  }

  renderResizeModeControl(resizeMode) {
    const isSelected = (this.state.resizeMode == resizeMode)

    return (
      <TouchableOpacity onPress={() => { this.setState({resizeMode: resizeMode}) }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {resizeMode}
        </Text>
      </TouchableOpacity>
    )
  }

  renderVolumeControl(volume) {
    const isSelected = (this.state.volume == volume)

    return (
      <TouchableOpacity onPress={() => { this.setState({volume: volume}) }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {volume * 100}%
        </Text>
      </TouchableOpacity>
    )
  }

  renderCustomSkin() {
    const flexCompleted = this.getCurrentTimePercentage() * 100
    const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100
    const {route, navigator, item} = this.props    
    return (
      <Container>
        <Toolbar
            leftElement="arrow-back"
            onLeftElementPress={() => navigator.pop()}
            centerElement={route.title}
        />
        {item.formats && 
          <TouchableOpacity style={styles.fullScreen} onPress={() => {this.setState({paused: !this.state.paused})}}>
            <Video
              source={{uri:item.formats[0].url}}
              style={styles.fullScreen}
              rate={this.state.rate}
              paused={this.state.paused}
              volume={this.state.volume}
              muted={this.state.muted}              
              onLoad={this.onLoad}
              onProgress={this.onProgress}
              onEnd={() => { AlertIOS.alert('Done!') }}
              playInBackground={true}
              playWhenInactive={true}
              repeat={true}
            />
          </TouchableOpacity>
        }
        
      </Container>
    )
  }

  

  render() {
    return this.renderCustomSkin()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    backgroundColor: "transparent",
    borderRadius: 5,
    position: 'absolute',
    bottom: 44,
    left: 4,
    right: 4,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2C2C2C',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    paddingBottom: 10,
  },
  skinControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: "white",
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
  nativeVideoControls: {
    top: 184,
    height: 300
  }
})

export default VideoPlayer