StructureSpawn.prototype.createCustomCreep =
    function(energy, roleName) {
        var body = [];
        var partsList = {
            harvester: 3,
            maintainer: 10,
            pioneer: 10,
            transfer: 10,
            attacker: 5
        }
        if (roleName == 'harvester') {
            if (this.room.controller.level < 4) {
                var numberOfParts = Math.floor(energy / 200);
                var bodyParts = [WORK, CARRY, MOVE, MOVE]
            } else {
                var numberOfParts = Math.floor(energy / 250);
                var bodyParts = [WORK, WORK, MOVE]
            }


        } else if (roleName == 'maintainer' || roleName == 'pioneer') {
            var numberOfParts = Math.floor(energy / 200);
            var bodyParts = [WORK, CARRY, MOVE]

        } else if (roleName == 'transfer') {
            var numberOfParts = Math.floor(energy / 150);
            var bodyParts = [CARRY, CARRY, MOVE]

        } else if (roleName == 'attacker') {
            var numberOfParts = Math.floor(energy / 200);
            var bodyParts = [TOUGH, TOUGH, ATTACK, MOVE, MOVE, MOVE];

        }

        if (numberOfParts > partsList[roleName]) {
            var numberOfParts = partsList[roleName]
        }

        for (let i = 0; i < numberOfParts; i++) {
            for (var name in bodyParts) {
                body.push(bodyParts[name])
            }
        }

        return this.spawnCreep(body, roleName + Game.time, {
            memory: {
                role: roleName
            }
        });
    }

StructureSpawn.prototype.spawnBasicCreeps =
    function() {

        let creepInRoom = this.room.find(FIND_MY_CREEPS)
        let my_room = this.room
        let my_room_name = this.pos.roomName

        let containers = my_room.find(FIND_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_CONTAINER
        });

        my_room.memory.harvester = 8

        my_room.memory.transfer = my_room.find(FIND_SOURCES).length
        if (my_room.storage) {
            my_room.memory.maintainer = my_room.storage.store.getUsedCapacity(RESOURCE_ENERGY) / (5 * my_room.energyCapacityAvailable)
        }

        // console logs
        if (my_room.energyAvailable < my_room.energyCapacityAvailable) {
            //console.log(my_room_name + ' EnergyAvailable:' + my_room.energyAvailable + '/' + my_room.energyCapacityAvailable);
        }

        // auto-respawning

        var energy = my_room.energyCapacityAvailable

        if (my_room.controller.level < 4) {
            var singleRoomRoleList = ['harvester']
        } else {
            var singleRoomRoleList = ['harvester', 'transfer', 'maintainer']
        }

        for (let roleName of singleRoomRoleList) {
            var numberOfThisRole = _.sum(creepInRoom, (creep) => creep.memory.role == roleName)
            if (numberOfThisRole < my_room.memory[roleName]) {
                this.createCustomCreep(energy, roleName)
            }
        }

    }