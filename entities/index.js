import Matter from "matter-js"
import Player from "../components/Player";
import Obstacle from "../components/Obstacle";
import Ceil from "../components/Ceil";
import Floor from "../components/Floor";
import { getPipeSizePosPair } from "../utils/random";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const pipeSizePosA = getPipeSizePosPair();
const pipeSizePosB = getPipeSizePosPair(windowWidth * 0.9);

export default (restart) => {
    let engine = Matter.Engine.create({
        enableSleeping: false
    });
    let world = engine.world;
    world.gravity.y = 0.5;

    return {
        physics: {engine, world},
        Player: Player(world, 'white', {x: 40, y: windowHeight / 2}, {height: 20, width: 20}),

        ObstacleTop11: Obstacle(world, 'ObstacleTop11', 'transparent', pipeSizePosA.pipeTop1.pos, pipeSizePosA.pipeTop1.size),
        ObstacleBottom11: Obstacle(world, 'ObstacleBottom11', 'transparent', pipeSizePosA.pipeBottom1.pos, pipeSizePosA.pipeBottom1.size),
        ObstacleTop12: Obstacle(world, 'ObstacleTop12', 'transparent', pipeSizePosA.pipeTop2.pos, pipeSizePosA.pipeTop2.size),
        ObstacleBottom12: Obstacle(world, 'ObstacleBottom12', 'transparent', pipeSizePosA.pipeBottom2.pos, pipeSizePosA.pipeBottom2.size),

        ObstacleTop21: Obstacle(world, 'ObstacleTop21', 'transparent', pipeSizePosB.pipeTop1.pos, pipeSizePosB.pipeTop1.size),
        ObstacleBottom21: Obstacle(world, 'ObstacleBottom21', 'transparent', pipeSizePosB.pipeBottom1.pos, pipeSizePosB.pipeBottom1.size),
        ObstacleTop22: Obstacle(world, 'ObstacleTop22', 'transparent', pipeSizePosB.pipeTop2.pos, pipeSizePosB.pipeTop2.size),
        ObstacleBottom22: Obstacle(world, 'ObstacleBottom22', 'transparent', pipeSizePosB.pipeBottom2.pos, pipeSizePosB.pipeBottom2.size),

        Floor: Floor(world, 'transparent', {x: windowWidth / 2, y: windowHeight - 125 / 2}, {height: 125, width: windowWidth}),
        Ceil: Ceil(world, 'transparent', {x: windowWidth / 2, y: 0}, {height: 25, width: windowWidth})
    }
}
