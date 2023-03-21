var roleRoomtransfer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var workornot = Game.rooms['E28S32'].terminal.store.getFreeCapacity() == 0
        var factory = Game.rooms['E28S32'].find(FIND_STRUCTURES, {
            filter: (structure) => structure.structureType == STRUCTURE_FACTORY
        })[0];

        if (creep.store.getUsedCapacity() == 0) {
            creep.memory.transfer = false
        }
        if (creep.store.getFreeCapacity() == 0) {
            creep.memory.transfer = true
        }
        if (creep.memory.transfer) {
            var targett = Game.rooms['E28S32'].terminal
            if (workornot) {
                var targett = Game.rooms['E28S32'].storage
            }
            if (factory.store.getUsedCapacity() < 30000) {
                var targett = factory
            }
            if (creep.transfer(targett, 'Z') == ERR_NOT_IN_RANGE) {
                creep.moveTo(targett);
            }
            creep.transfer(targett, RESOURCE_UTRIUM_BAR)
            creep.transfer(targett, "O")
            creep.transfer(targett, "H")
            creep.transfer(targett, "U")
            creep.transfer(targett, "L")
            creep.transfer(targett, "K")
            creep.transfer(targett, "Z")
            creep.transfer(targett, "X")
            creep.transfer(targett, "G")
            creep.transfer(targett, "OH")
            creep.transfer(targett, "ZK")
            creep.transfer(targett, "UL")
            creep.transfer(targett, "UH")
            creep.transfer(targett, "UO")
            creep.transfer(targett, "KH")
            creep.transfer(targett, "KO")
            creep.transfer(targett, "LH")
            creep.transfer(targett, "LO")
            creep.transfer(targett, "ZH")
            creep.transfer(targett, "ZO")
            creep.transfer(targett, "GH")
            creep.transfer(targett, "GO")
        } else {
            for (var roomName in Game.rooms) {
                var storage = Game.rooms[roomName].storage
                if (storage &&
                    storage != Game.rooms['E28S32'].storage &&
                    storage.store.getUsedCapacity() > storage.store.getUsedCapacity(RESOURCE_ENERGY) + creep.store.getFreeCapacity())
                    var targett = storage
            }
            if (!targett && factory.store.getUsedCapacity() < 30000) {
                var targett = Game.rooms['E28S32'].terminal
            }
            if (targett) {
                if (creep.withdraw(targett, "Z") == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targett);
                }
                creep.withdraw(targett, RESOURCE_UTRIUM_BAR)
                creep.withdraw(targett, "H")
                creep.withdraw(targett, "O")
                creep.withdraw(targett, "U")
                creep.withdraw(targett, "L")
                creep.withdraw(targett, "K")
                creep.withdraw(targett, "Z")
                creep.withdraw(targett, "X")
                creep.withdraw(targett, "G")
                creep.withdraw(targett, "OH")
                creep.withdraw(targett, "ZK")
                creep.withdraw(targett, "UL")
                creep.withdraw(targett, "UH")
                creep.withdraw(targett, "UO")
                creep.withdraw(targett, "KH")
                creep.withdraw(targett, "KO")
                creep.withdraw(targett, "LH")
                creep.withdraw(targett, "LO")
                creep.withdraw(targett, "ZH")
                creep.withdraw(targett, "ZO")
                creep.withdraw(targett, "GH")
                creep.withdraw(targett, "GO")

            }
        }
    }

};

module.exports = roleRoomtransfer;