import Home from './containers/Home'
import MapPage from './containers/Map'
import DrawerPage from './containers/Drawer'
import Youtube from './containers/Youtube'

// we can use animationType object for each route via Navigator.SceneConfigs
export default {
    home: {
        title: 'Select component',
        Page: Home,
    },    
    map: {
        title: 'Map',
        Page: MapPage,        
    },
    drawer: {
        title: 'Drawer',
        Page: DrawerPage,        
    },
    youtube: {
        title: 'Youtube',
        Page: Youtube,
    },
    
}
