import { View, Text } from 'react-native';
import React, { PureComponent, PropTypes } from 'react';

const propTypes = {
    text: PropTypes.string.isRequired,
    inset: PropTypes.bool,
    lines: PropTypes.number,
    style: PropTypes.object,
};
const defaultProps = {
    style: {},
    inset: false,
    lines: 1,
};
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

function getStyles(props, context) {
    const { subheader } = context.uiTheme;

    return {
        container: [
            subheader.container,
            { paddingLeft: props.inset ? 72 : 16 },
            props.style.container,
        ],
        text: [
            subheader.text,
            props.style.text,
        ],
    };
}

class Subheader extends PureComponent {
    render() {
        const { text, lines } = this.props;

        const styles = getStyles(this.props, this.context);

        return (
            <View style={styles.container} >
                <Text numberOfLines={lines} style={styles.text}>
                    {text}
                </Text>
            </View>
        );
    }
}

Subheader.propTypes = propTypes;
Subheader.defaultProps = defaultProps;
Subheader.contextTypes = contextTypes;

export default Subheader;
