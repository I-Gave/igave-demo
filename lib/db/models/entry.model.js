
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EntrySchema = new Schema({
  title: String
});

EntrySchema.index('title', {unique: true, dropDups: true});

EntrySchema.statics.get = function getAll(obj) {
  return this.model('Entry').find(obj).sort({title: 1});
};

EntrySchema.statics.save = function save(obj) {
  return this.model('Entry').create(obj);
};

EntrySchema.statics.delete = function del(obj) {
  return this.model('Entry').remove(obj);
};

module.exports = EntrySchema;
