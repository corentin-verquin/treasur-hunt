import mapGenerator from './data/mapGenerator.js'
import MapDrawer from './render/mapDrawer.js'


const mapDrawer = new MapDrawer('map')
await mapDrawer.init()

const map = await mapGenerator()
mapDrawer.map = map

mapDrawer.draw()