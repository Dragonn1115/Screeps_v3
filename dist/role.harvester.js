module.exports = {
    run: function(creep) {
        if (creep.store.getUsedCapacity() == 0) {
            creep.memory.capacityEmpty = true;
            creep.memory.capacityFull = false;
        } else if (creep.store.getFreeCapacity() == 0) {
            creep.memory.capacityEmpty = false;
            creep.memory.capacityFull = true;
        }

        if (creep.memory.capacityFull) {
            if (creep.room.controller.level < 4) {
                if (!creep.transferEnergy()) {
                    creep.buildingAndUpgrading();
                }
            } else {
                creep.buildingAndUpgrading();
            }
        } else if (creep.memory.capacityEmpty) {
            creep.harvestEnergy();
        }
    }
};