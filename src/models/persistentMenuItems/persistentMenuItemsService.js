const PersistentMenuItems = require('./persistentMenuItems');

PersistentMenuItems.methods(['get', 'post', 'put', 'delete']);
PersistentMenuItems.updateOptions({ new: true, runValidators: true });

module.exports = PersistentMenuItems;
