import { View } from 'react-native';
import React, { PureComponent, PropTypes } from 'react';
import RippleFeedback from '../RippleFeedback';

import Title from './Title.react';
import Content from './Content.react';
import Actions from './Actions.react';

const propTypes = {
    theme: PropTypes.string,
    overrides: PropTypes.shape({
        backgroundColor: PropTypes.string,
        rippleColor: PropTypes.string,
    }),
    elevation: PropTypes.number,
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    onPress: PropTypes.func,
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
};
const defaultProps = {
    style: {},
};
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

function getStyles(props, context) {
    const { dialog } = context.uiTheme;

    return {
        container: [
            dialog.container,
            props.style.container,
        ],
    };
}

class Dialog extends PureComponent {
    render() {
        const { onPress, children } = this.props;

        const styles = getStyles(this.props, this.context);

        return (
            <RippleFeedback onPress={onPress} >
                <View style={styles.container}>
                    {children}
                </View>
            </RippleFeedback>
        );
    }

}

Dialog.propTypes = propTypes;
Dialog.defaultProps = defaultProps;
Dialog.contextTypes = contextTypes;

Dialog.Title = Title;
Dialog.Content = Content;
Dialog.Actions = Actions;

export default Dialog;
