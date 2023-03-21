/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.maintainer');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run: function(creep) {
        if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
            creep.memory.working = false;
        }
        if (creep.store.getFreeCapacity() == 0) {
            creep.memory.working = true;
        }
        if (creep.memory.working) {
            creep.buildingAndUpgrading();
        } else {
            creep.getEnergy();
        }
    }
};