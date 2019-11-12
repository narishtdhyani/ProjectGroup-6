const Sequelize = require('sequelize')
const db = require('../database/dbConfig.js')

module.exports = db.sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER(9),
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: Sequelize.STRING(50),
      required: true
    },
    last_name: {
      type: Sequelize.STRING(50),
      required: true
    },
    email: {
      type: Sequelize.STRING(100),
      required: true
      //validate: { isEmail: true },
      //unique: true
    },
    password: {
      type: Sequelize.STRING(200),
      required: true
    },
    type_of_user: {
      type: Sequelize.ENUM,
      values:['user','employer'],
      defaultValue:'user'
    },
    phone_num: {
      type: Sequelize.STRING(20),
      defaultValue : null
    },
    orgn_type: {
      type: Sequelize.STRING(200),
      defaultValue: null
    },
    address: {
      type: Sequelize.STRING(100),
      defaultValue: null
    },
    profile_img_file_name: {
      type: Sequelize.STRING(200),
      defaultValue : null
    },
    resume_file_name: {
      type: Sequelize.STRING(200),
      defaultValue:null
    },
    d_o_b: {
      type: Sequelize.DATEONLY,
      
    },
    created_on: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  },
  {
    timestamps: false
  }
)