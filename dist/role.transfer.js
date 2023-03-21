require('prototype.creep');
const allMineralList = ["H", "O", "U", "L", "K", "Z", "X", "G", "OH", "ZK", "UL", "UH", "UO", "KH", "KO", "LH", "LO", "ZH", "ZO", "GH", "GO"]
const barList = ["utrium_bar"]

var roleTransfer = {

    /** @param {Creep} creep **/
    run: function(creep, mineralList) {
        if (creep.store.getUsedCapacity() == 0) {
            creep.memory.transfer = false
        } else if (creep.store.getFreeCapacity() == 0) {
            creep.memory.transfer = true
        }

        if (creep.memory.transfer == false) {
            creep.getEnergy();
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_CONTAINER) &&
                        structure.store.getUsedCapacity(RESOURCE_ENERGY) > creep.store.getFreeCapacity() / 2);
                }
            });
            for (let mineral of allMineralList) {
                creep.withdraw(target, mineral)
            }
            for (let bar of barList) {
                creep.withdraw(target, bar)
            }
        } else {

            if (creep.store.getUsedCapacity(RESOURCE_ENERGY) < creep.store.getUsedCapacity()) {

                for (let item of allMineralList) {
                    creep.transfer(creep.room.storage, item)
                }
                for (let bar of barList) {
                    creep.transfer(creep.room.storage, bar)
                }
                if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage);
                }
            } else {
                creep.transferEnergy();
            }
        }
    }
};

module.exports = roleTransfer;