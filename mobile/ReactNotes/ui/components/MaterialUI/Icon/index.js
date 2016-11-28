import { default as VectorIcon } from 'react-native-vector-icons/MaterialIcons';
import React, { PureComponent, PropTypes } from 'react';

const propTypes = {
    name: PropTypes.string.isRequired,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    size: PropTypes.number,
    color: PropTypes.string,
};
const defaultProps = { };
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

class Icon extends PureComponent {
    render() {
        const { name, style, size, color } = this.props;
        const { palette, spacing } = this.context.uiTheme;

        const iconColor = color || palette.secondaryTextColor;
        const iconSize = size || spacing.iconSize;

        return (
            <VectorIcon
                name={name}
                size={iconSize}
                color={iconColor}
                style={style}
            />
        );
    }
}

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;
Icon.contextTypes = contextTypes;

export default Icon;
