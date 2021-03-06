var mongoose = require('mongoose-bird')();
var _ = require('lodash');

var DomoModel;

var setName = function(name) {
  return _.escape(name).trim();
};

var DomoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  age: {
    type: Number,
    min: 0,
    required: true,
  },

  hp: {
    type: Number,
    min: 0,
    required: true,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});


DomoSchema.methods.toAPI = function() {
  return {
    name: this.name,
    age: this.age,
    hp: this.hp,
  };
};

DomoSchema.statics.findByOwner = function(ownerId, callback) {
  return DomoModel
    .find({owner: mongoose.Types.ObjectId(ownerId),})
    .select('name age hp')
    .exec(callback);
};

DomoSchema.statics.destroyById = function(domoId, cb) {
  return DomoModel.findByIdAndRemove(domoId, cb);
};

DomoModel = mongoose.model('Domo', DomoSchema);

module.exports.DomoModel = DomoModel;
module.exports.DomoSchema = DomoSchema;
