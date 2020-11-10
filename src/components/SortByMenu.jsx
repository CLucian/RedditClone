import React from 'react'

import BestSVG from './svg-components/BestSVG'
import HotSVG from './svg-components/HotSVG'
import NewSVG from './svg-components/NewSVG'
import RisingSVG from './svg-components/RisingSVG'
import TopSVG from './svg-components/TopSVG'

class SortByMenu extends React.Component {
    render() {
        return (
            <div className="sort-container">
                <div className="sortByMenuContainer">
                    <div className="sort-by-text">Sort By:</div>
                    <div className="menu-svg-container">
                        <BestSVG />
                        <div className="sort-by-text">Best</div>
                    </div>
                    <div className="menu-svg-container">
                        <HotSVG />
                        <div className="sort-by-text">Hot</div>
                    </div>
                    <div className="menu-svg-container">
                        <NewSVG />
                        <div className="sort-by-text">New</div>
                    </div>
                    <div className="menu-svg-container">
                        <TopSVG />
                        <div className="sort-by-text">Top</div>
                    </div>
                    <div className="menu-svg-container">
                        <RisingSVG />
                        <div className="sort-by-text">Rising</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SortByMenu
