var roleClaimer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        let newroomflag = Game.flags[creep.memory.targetFlag];
        let ctrl = newroomflag.room.controller;
        if (newroomflag) {
            if (creep.room == newroomflag.room) {
                if (creep.claimController(ctrl) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(ctrl, {
                        visualizePathStyle: {
                            stroke: '#cc00cc'
                        }
                    });
                }
            } else {
                creep.moveTo(flag, {
                    visualizePathStyle: {
                        stroke: '#cc00cc'
                    }
                });
            }
        }
    }
};

module.exports = roleClaimer;