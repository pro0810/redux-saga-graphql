
import React, { Component, PropTypes } from 'react'
import TARGET_TYPES from 'ui/shared/constants/targetTypes'
import Tooltip from './Tooltip'
import Image from 'ui/shared/components/Post/Image'
import Twitter from 'ui/shared/components/Post/Twitter'
import Text from 'ui/shared/components/Post/Text'

import ShowItem from 'ui/frontend/components/Post/Show/Item'

class Preview extends Component {

  static propTypes = {
    sortRank: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    handleDeleteItem: PropTypes.func.isRequired,
    handleMoveItem: PropTypes.func.isRequired,
    handleUpdateItem: PropTypes.func.isRequired
  }

  _handleUpdateItem = () => {
    this.props.handleUpdateItem(this.props.sortRank, { ...this.props.item, editing: true })
  }

  render() {
    const {sortRank, totalCount, item, handleDeleteItem, handleMoveItem} = this.props
    return (
      <div>
        <Tooltip
          sortRank={sortRank}
          totalCount={totalCount}
          handleUpdateItem={this._handleUpdateItem}
          handleDeleteItem={handleDeleteItem}
          handleMoveItem={handleMoveItem}
        />
        <ShowItem item={item} />
      </div>
    )
  }
}

export default Preview