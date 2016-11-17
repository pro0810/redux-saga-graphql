import dataloaderSequelize from 'dataloader/sequelize'
import { taggingsProjectConnect } from '../shared/connect'
import { sequelize, DataTypes } from '../config'

const projects = sequelize.define("projects", {        
  type: {
    type: new DataTypes.VIRTUAL(DataTypes.STRING),
    get: () => 'Project',      
  },
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true },
  title        : DataTypes.STRING,
  description  : DataTypes.STRING,
  caption      : DataTypes.STRING,
  image        : DataTypes.STRING, 
  source_url   : DataTypes.STRING, 
  accepted     : DataTypes.BOOLEAN, 
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',

  getterMethods: {
    // do not use arrow function to have this as function context
    full_image: function() {
      return this.image ? `/uploads/project/image/${this.id}/${this.image}` : null
    }
  },

  classMethods: {
    associate: function() {        
      // we should use object instead of string to prevent errors prone
      this.belongsToMany(sequelize.models.tags, {
        through: taggingsProjectConnect,
        foreignKey: 'subject_id',
      })

    }
  },

  instanceMethods: {
    // arrow function can mislead this
    getProjectTags: function(attributes) {    
      // with where and attributes
      return this.getTags({          
        attributes,
      })
    },    
  }
})

dataloaderSequelize(projects)

export default projects