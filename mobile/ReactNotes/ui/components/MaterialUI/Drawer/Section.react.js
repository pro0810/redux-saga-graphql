import React, { PureComponent, PropTypes } from 'react';
import { View } from 'react-native';
import Subheader from '../Subheader';
import Divider from '../Divider';
import ListItem from '../ListItem';

const propTypes = {
    title: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.string,
        value: PropTypes.string.isRequired,
        label: PropTypes.string,
        onPress: PropTypes.func,
        onLongPress: PropTypes.func,
        active: PropTypes.bool,
        disabled: PropTypes.bool,
    })),
    divider: PropTypes.bool,
};
const defaultProps = {
    style: {},
};
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

function getStyles(props, context) {
    const { drawerSection } = context.uiTheme;

    return {
        container: [
            drawerSection.container,
            props.style.container,
        ],
        item: [
            drawerSection.item,
            props.style.item,
        ],
        subheader: [
            drawerSection.subheader,
            props.style.subheader,
        ],
        icon: [
            drawerSection.icon,
            props.style.icon,
        ],
        value: [
            drawerSection.value,
            props.style.value,
        ],
        label: [
            drawerSection.label,
            props.style.label,
        ],
    };
}

class Section extends PureComponent {
    renderTitle = () => {
        const { title } = this.props;

        if (!title) {
            return null;
        }

        return <Subheader text={title} />;
    }
    render() {
        const { items, divider } = this.props;
        const { typography } = this.context.uiTheme;

        const styles = getStyles(this.props, this.context);

        return (
            <View>
                <View style={styles.container}>
                    {this.renderTitle(styles)}
                    {items && items.map((item, i) => {
                        let style = { primaryText: typography.buttons };

                        if (item.active) {
                            style = this.context.uiTheme.drawerSectionActiveItem;
                        }

                        return (
                            <ListItem
                                dense
                                key={`${i}-${item.icon}`}
                                leftElement={item.icon}
                                centerElement={item.value}
                                onPress={item.onPress}
                                style={style}
                            />
                        );
                    })}
                </View>
                {divider && <Divider />}
            </View>
        );
    }
}

Section.propTypes = propTypes;
Section.defaultProps = defaultProps;
Section.contextTypes = contextTypes;

export default Section;
