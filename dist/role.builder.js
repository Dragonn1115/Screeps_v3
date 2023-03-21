require('prototype.creep');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        if (creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }
        if (creep.memory.working) {
            creep.buildingAndUpgrading();
        } else {
            creep.getEnergy();
        }
    }
};

module.exports = roleBuilder;