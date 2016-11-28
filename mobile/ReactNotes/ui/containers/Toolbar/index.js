import React, { Component, PropTypes } from 'react'
import { View, StyleSheet } from 'react-native'


import { Toolbar, Button } from 'react-native-material-ui'

import Container from 'ReactNotes/ui/components/Container'

const styles = StyleSheet.create({
    container: {
        paddingTop: 16,
    },
})



export default class ToolbarSpec extends Component {

    static propTypes = {
        navigator: PropTypes.object.isRequired,
        route: PropTypes.object.isRequired,
    }

    render() {
        return (
            <Container>
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={() => this.props.navigator.pop()}
                    centerElement={this.props.route.title}
                />
                <View style={styles.container}>
                    <Toolbar
                        centerElement="With menu"
                        rightElement={{
                            actions: ['edit'],
                            menu: { labels: ['Item 1', 'Item 2'] },
                        }}
                    />
                </View>
                <View style={styles.container}>
                    <Toolbar
                        leftElement="menu"
                        centerElement="Searchable"
                        searchable={{
                            autoFocus: true,
                            placeholder: 'Search',
                        }}
                    />
                </View>
                <View style={styles.container}>
                    <Toolbar
                        leftElement="clear"
                        centerElement="With button"
                        rightElement={
                            <Button
                                text="Save"
                                style={{ text: { color: 'white' } }}
                            />
                        }
                    />
                </View>
                <View style={styles.container}>
                    <Toolbar
                        size={16}
                        leftElement="clear"
                        centerElement="Custom icon size"
                        rightElement={{
                            actions: ['edit'],
                            menu: { labels: ['Item 1', 'Item 2'] },
                        }}
                    />
                </View>
                <View style={styles.container}>
                    <Toolbar centerElement="Only title" />
                </View>
            </Container>
        )
    }
}
