require('prototype.spawn');
require('prototype.creep');

module.exports.loop = function() {

    // run spawns
    var spawns = _.filter(Game.spawns, (spawn) => true)
    for (let spawnName in spawns) {
        let spawn = spawns[spawnName];
        spawn.spawnBasicCreeps();
    }

    // run creeps
    for (let name in Game.creeps) {
        Game.creeps[name].runRole();
    }

    // clear memory
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    // show notification
    for (var spawnname in Game.spawns) {
        let spawn = Game.spawns[spawnname];
        if (spawn.spawning) {
            let spawningCreep = Game.creeps[spawn.spawning.name];
            spawn.room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                spawn.pos.x + 1,
                spawn.pos.y, {
                    align: 'left',
                    opacity: 0.8
                });
        }
    };

}