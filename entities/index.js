import Matter from "matter-js"
import Player from "../components/Player";
import Obstacle from "../components/Obstacle";
import Ceil from "../components/Ceil";
import Floor from "../components/Floor";
import Cloud from "../components/Cloud";
import Sun from "../components/Sun";
import Mountain from "../components/Mountain";
import SmallMountain from "../components/SmallMountain";
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

        Sun: Sun(world, 'transparent', {x: windowWidth - 184/2/2, y: 184/2/2}, {height: 184/2, width: 196/2}),

        Cloud1: Cloud(world, 'transparent', {x: 3 * windowWidth / 4, y: windowHeight*0.2}, {height: 255/2, width: 317/2}),
        Cloud2: Cloud(world, 'transparent', {x: windowWidth + 3 * windowWidth / 4, y: windowHeight*0.3}, {height: 255/2, width: 317/2}),
        Cloud3: Cloud(world, 'transparent', {x: windowWidth / 4, y: windowHeight*0.4}, {height: 255/3, width: 317/3}),
        Cloud4: Cloud(world, 'transparent', {x: windowWidth + windowWidth / 4, y: windowHeight*0.5}, {height: 255/4, width: 317/4}),

        Mountain1: Mountain(world, 'transparent', {x: windowWidth / 2, y: windowHeight - 84 - 260/2}, {height: 260, width: 775}),
        Mountain2: Mountain(world, 'transparent', {x: windowWidth + windowWidth / 2 + (775-150)/2, y: windowHeight - 84 - 260/2}, {height: 260, width: 775}),

        SmallMountain1: SmallMountain(world, 'transparent', {x: windowWidth / 2, y: windowHeight - 84 - 143/2}, {height: 143, width: 405}),
        SmallMountain2: SmallMountain(world, 'transparent', {x: windowWidth + windowWidth / 2 + 143/2, y: windowHeight - 84 - 143/2}, {height: 143, width: 405}),

        Player: Player(world, 'transparent', {x: 40, y: windowHeight / 2}, {height: 1.5*20, width: 1.5*20}),

        ObstacleTop11: Obstacle(world, 'ObstacleTop11', 'transparent', pipeSizePosA.pipeTop1.pos, pipeSizePosA.pipeTop1.size),
        ObstacleBottom11: Obstacle(world, 'ObstacleBottom11', 'transparent', pipeSizePosA.pipeBottom1.pos, pipeSizePosA.pipeBottom1.size),
        ObstacleTop12: Obstacle(world, 'ObstacleTop12', 'transparent', pipeSizePosA.pipeTop2.pos, pipeSizePosA.pipeTop2.size),
        ObstacleBottom12: Obstacle(world, 'ObstacleBottom12', 'transparent', pipeSizePosA.pipeBottom2.pos, pipeSizePosA.pipeBottom2.size),

        ObstacleTop21: Obstacle(world, 'ObstacleTop21', 'transparent', pipeSizePosB.pipeTop1.pos, pipeSizePosB.pipeTop1.size),
        ObstacleBottom21: Obstacle(world, 'ObstacleBottom21', 'transparent', pipeSizePosB.pipeBottom1.pos, pipeSizePosB.pipeBottom1.size),
        ObstacleTop22: Obstacle(world, 'ObstacleTop22', 'transparent', pipeSizePosB.pipeTop2.pos, pipeSizePosB.pipeTop2.size),
        ObstacleBottom22: Obstacle(world, 'ObstacleBottom22', 'transparent', pipeSizePosB.pipeBottom2.pos, pipeSizePosB.pipeBottom2.size),

        Floor1: Floor(world, 'transparent', {x: windowWidth / 2, y: windowHeight - 125 / 2}, {height: 125, width: windowWidth}),
        Floor2: Floor(world, 'transparent', {x: windowWidth + windowWidth / 2, y: windowHeight - 125 / 2}, {height: 125, width: windowWidth}),

        Ceil: Ceil(world, 'transparent', {x: windowWidth / 2, y: 0}, {height: 25, width: windowWidth})
    }
}
