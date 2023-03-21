const allMineralList = ["H", "O", "U", "L", "K", "Z", "X", "G", "OH", "ZK", "UL", "UH", "UO", "KH", "KO", "LH", "LO", "ZH", "ZO", "GH", "GO"]
const barList = ["utrium_bar"]

Creep.prototype.runRole =
    function() {
        let roles = {
            harvester: require('role.harvester'),
            upgrader: require('role.maintainer'),
            builder: require('role.maintainer'),
            pioneer: require('role.pioneer'),
            transfer: require('role.transfer'),
            terminalt: require('role.roomtransfer'),
            attacker: require('role.attacker'),
            maintainer: require('role.maintainer')
        };
        roles[this.memory.role].run(this);
    };

Creep.prototype.transferEnergy =
    function() {
        var target = this.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION && structure.energy < structure.energyCapacity ||
                    structure.structureType == STRUCTURE_SPAWN && structure.energy < structure.energyCapacity ||
                    structure.structureType == STRUCTURE_TOWER && structure.energy < 950 ||
                    structure.structureType == STRUCTURE_LAB && structure.store.getFreeCapacity('energy') > 0 ||
                    structure.structureType == STRUCTURE_FACTORY && structure.store.getUsedCapacity('energy') < 2000 ||
                    structure.structureType == STRUCTURE_LINK && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 199 ||
                    structure.structureType == STRUCTURE_NUKER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0 ||
                    structure.structureType == STRUCTURE_POWER_SPAWN && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
            }
        });
        if (target && this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.moveTo(target);
        } else if (this.room.storage && this.transfer(this.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.moveTo(this.room.storage)
        }
        if (target) {
            return true
        } else {
            return false
        }
    };

Creep.prototype.getEnergy =
    function() {
        const downresource = this.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
        if (downresource) {
            if (this.pickup(downresource) == ERR_NOT_IN_RANGE) {
                this.moveTo(downresource);
            }
        } else {
            if (this.memory.role == 'transfer') {
                var sourcetarget = this.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_CONTAINER) &&
                            structure.store.getUsedCapacity(RESOURCE_ENERGY) > this.store.getFreeCapacity() / 2);
                    }
                });
            } else {
                var sourcetarget = this.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_CONTAINER ||
                                structure.structureType == STRUCTURE_STORAGE ||
                                structure.structureType == STRUCTURE_LAB) &&
                            structure.store.getUsedCapacity(RESOURCE_ENERGY) > this.store.getFreeCapacity() / 2);
                    }
                });
            }
            if (!sourcetarget) {
                var sourcetarget = this.room.storage
            }
            if (sourcetarget && this.withdraw(sourcetarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(sourcetarget)
            }
        }
    }

Creep.prototype.harvestEnergy =
    function() {
        const target = this.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
        if (target) {
            if (this.harvest(target) == ERR_NOT_IN_RANGE) {
                this.moveTo(target);
            }
        }
    }

Creep.prototype.buildingAndUpgrading =
    function() {
        var target = this.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        if (!target) {
            if (this.upgradeController(this.room.controller) == ERR_NOT_IN_RANGE) {
                this.moveTo(this.room.controller);
            }
        } else {
            if (this.build(target) == ERR_NOT_IN_RANGE) {
                this.moveTo(target);
            }
        }
    }