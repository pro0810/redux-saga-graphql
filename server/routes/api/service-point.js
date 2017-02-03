import {Router} from 'express'
import service_points from 'models/tables/Alop/service-points'
import { uploadImage } from 'data/helper/image'
import { getPagingRouter, getDetailRouter, getDeleteRouter } from 'routes/shared/utils'

import authorize from 'passport/authorize'
import {sequelize, DataTypes} from 'models/config'


const router  = new Router()

const RAD = Math.PI / 180
const DEGREE = 180 / Math.PI
const distance_unit = 111.045

router.get('/getNearByService', async (req, res) => {
  // tag is public
  const {lat, lng, distance:distance_in_kilometers = 0.1} = req.query

  if (lat && lng) {
    // calculate      
    const rad_lat = lat * RAD
    const rad_lng = lng * RAD
    const lat_cos = Math.cos(rad_lat)
    const lng_cos = Math.cos(rad_lng)
    const lat_sin = Math.sin(rad_lat)
    const lng_sin = Math.sin(rad_lng)

    const sql = `SELECT name, password, address,
acos(${lat_sin} * lat_sin + ${lat_cos} * lat_cos * cos((${lng} - lng) * ${RAD})) * ${DEGREE} * ${distance_unit} AS distance       
FROM ${service_points.tableName}
WHERE lat BETWEEN 
  ${lat} - (${distance_in_kilometers} / ${distance_unit}) 
  AND 
  ${lat} + (${distance_in_kilometers} / ${distance_unit})
  AND 
  lng BETWEEN ${lng} - (${distance_in_kilometers} / (${distance_unit} * ${lat_cos})) 
  AND 
  ${lng} + (${distance_in_kilometers} / (${distance_unit} * ${lat_cos}))  
HAVING distance <= ${distance_in_kilometers}  ORDER BY distance LIMIT 10`
     
  // use spread instead of then, or two result will be merged
  sequelize.query(sql, { type: DataTypes.SELECT})   
    .spread(items => res.send(items))
    .catch(e =>res.status(400).write('Error'))       
      
 } else {
  res.status(204).end() 
 }   

})

router.get('/index/:id', getDetailRouter(service_points, 
  ['id','name','address','phone','lat','lng','description','owner_id','image']))
router.get('/', getPagingRouter(service_points, 
  ['id','name','address','phone','lat','lng','description','owner_id','image']))
router.delete('/delete/:id', getDeleteRouter(service_points))


// limit json post
router.post('/update', async (req, res) => {
  // check authorize first, for update, also check author_id for post
  authorize(req)
  // currently we not process items, let it for edit phrase
  const {item:{image, ...data}, id} = req.body
  
  data.user_id = req.user.id
  const rad_lat = data.lat * RAD
  const rad_lng = data.lng * RAD
  data.lat_cos = Math.cos(rad_lat)
  data.lng_cos = Math.cos(rad_lng)
  data.lat_sin = Math.sin(rad_lat)
  data.lng_sin = Math.sin(rad_lng)

  // update from post data
  const item = id 
    ? await service_points.findById(id)
    : await service_points.create(data)

  // return client so they will not wait and ready to update without create new
  if(!id)
    res.send({id:item.id})

  uploadImage(image, `service_point/image/${item.id}`, imagePath => data.image=imagePath)

  // otherwise update
  item.updateAttributes(data)    

  // send back inserted id as graphql id
  res.send(item)
})


export default router