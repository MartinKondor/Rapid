import Matter from "matter-js"
import { getPipeSizePosPair, getRandom } from "./utils/random";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let passedObstacles = 0;
let startTime = 0;

const Physics = (entities, {touches, time, dispatch}) => {
    let engine = entities.physics.engine;
    if (startTime == 0) {
        startTime = time.current;
    }

    // Increase speed with time
    const BASE_SPEED_X = 3 + (time.current - startTime) / 12500;

    touches.filter(t => t.type === "press")
    .forEach(t => {
        Matter.Body.setVelocity(entities.Player.body, {
            x: 0,
            y: -4
        });
    });

    Matter.Engine.update(engine, time.delta);

    // Move obstacles
    for (let i = 1; i <= 2; i++) {
        if (entities[`ObstacleTop${i}1`].body.bounds.max.x <= 50 && !entities[`ObstacleTop${i}1`].point) {
            entities[`ObstacleTop${i}1`].point = true;
            dispatch({type: "new_point"});
        }
        else if (entities[`ObstacleTop${i}1`].body.bounds.max.x > 50) {
            entities[`ObstacleTop${i}1`].point = false;
        }

        if (entities[`ObstacleTop${i}1`].body.bounds.max.x <= 0) {
            const pipeSizePos = getPipeSizePosPair(windowWidth * 0.9);
            Matter.Body.setPosition(entities[`ObstacleTop${i}1`].body, pipeSizePos.pipeTop1.pos);
            Matter.Body.setPosition(entities[`ObstacleBottom${i}1`].body, pipeSizePos.pipeBottom1.pos);
            Matter.Body.setPosition(entities[`ObstacleTop${i}2`].body, pipeSizePos.pipeTop2.pos);
            Matter.Body.setPosition(entities[`ObstacleBottom${i}2`].body, pipeSizePos.pipeBottom2.pos);
        }

        Matter.Body.translate(entities[`ObstacleTop${i}1`].body, {x: -BASE_SPEED_X, y: 0});
        Matter.Body.translate(entities[`ObstacleBottom${i}1`].body, {x: -BASE_SPEED_X, y: 0});
        Matter.Body.translate(entities[`ObstacleTop${i}2`].body, {x: -BASE_SPEED_X, y: 0});
        Matter.Body.translate(entities[`ObstacleBottom${i}2`].body, {x: -BASE_SPEED_X, y: 0});
    }

    // Moving things
    Matter.Body.translate(entities[`Floor1`].body, {x: -BASE_SPEED_X, y: 0});
    Matter.Body.translate(entities[`Floor2`].body, {x: -BASE_SPEED_X, y: 0});
    if (entities[`Floor1`].body.bounds.max.x <= 0) {
        Matter.Body.setPosition(entities[`Floor1`].body, {x: windowWidth / 2, y: windowHeight - 125 / 2});
        Matter.Body.setPosition(entities[`Floor2`].body, {x: windowWidth + windowWidth / 2, y: windowHeight - 125 / 2});
    }

    Matter.Body.translate(entities[`Cloud1`].body, {x: -(0.2)*BASE_SPEED_X, y: 0});
    Matter.Body.translate(entities[`Cloud2`].body, {x: -(0.18)*BASE_SPEED_X, y: 0});
    Matter.Body.translate(entities[`Cloud3`].body, {x: -(0.16)*BASE_SPEED_X, y: 0});
    Matter.Body.translate(entities[`Cloud4`].body, {x: -(0.14)*BASE_SPEED_X, y: 0});
    if (entities[`Cloud1`].body.bounds.max.x <= 0) {
        Matter.Body.setPosition(entities[`Cloud1`].body, {x: getRandom(windowWidth + 317/2, windowWidth + 2*317/2), y: getRandom(windowHeight*0.1, windowHeight*0.4)}, {height: 255/2, width: 317/2});
    }
    if (entities[`Cloud2`].body.bounds.max.x <= 0) {
        Matter.Body.setPosition(entities[`Cloud2`].body, {x: getRandom(windowWidth + 317/2, windowWidth + 2*317/2), y: getRandom(windowHeight*0.2, windowHeight*0.3)}, {height: 255/2, width: 317/2});
    }
    if (entities[`Cloud3`].body.bounds.max.x <= 0) {
        Matter.Body.setPosition(entities[`Cloud3`].body, {x: getRandom(windowWidth + 317/3, windowWidth + 2*317/3), y: getRandom(windowHeight*0.3, windowHeight*0.4)}, {height: 255/3, width: 317/3});
    }
    if (entities[`Cloud4`].body.bounds.max.x <= 0) {
        Matter.Body.setPosition(entities[`Cloud4`].body, {x: getRandom(windowWidth + 317/4, windowWidth + 2*317/4), y: getRandom(windowHeight*0.4, windowHeight*0.5)}, {height: 255/4, width: 317/4});
    }

    Matter.Body.translate(entities[`Mountain1`].body, {x: -(0.3)*BASE_SPEED_X, y: 0});
    Matter.Body.translate(entities[`Mountain2`].body, {x: -(0.3)*BASE_SPEED_X, y: 0});
    if (entities[`Mountain1`].body.bounds.max.x <= 0) {
        Matter.Body.setPosition(entities[`Mountain1`].body, {x: windowWidth + windowWidth / 2 + (775-150)/2, y: windowHeight - 84 - 260/2}, {height: 260, width: 775});
    }
    if (entities[`Mountain2`].body.bounds.max.x <= 0) {
        Matter.Body.setPosition(entities[`Mountain2`].body, {x: windowWidth + windowWidth / 2 + (775-150)/2, y: windowHeight - 84 - 260/2}, {height: 260, width: 775});
    }

    Matter.Body.translate(entities[`SmallMountain1`].body, {x: -(0.4)*BASE_SPEED_X, y: 0});
    Matter.Body.translate(entities[`SmallMountain2`].body, {x: -(0.4)*BASE_SPEED_X, y: 0});
    if (entities[`SmallMountain1`].body.bounds.max.x <= 0) {
        Matter.Body.setPosition(entities[`SmallMountain1`].body, {x: windowWidth + windowWidth / 2 + (405)/2, y: windowHeight - 84 - 143/2}, {height: 143, width: 405});
    }
    if (entities[`SmallMountain2`].body.bounds.max.x <= 0) {
        Matter.Body.setPosition(entities[`SmallMountain2`].body, {x: windowWidth + windowWidth / 2 + (405)/2, y: windowHeight - 84 - 143/2}, {height: 143, width: 405});
    }

    Matter.Body.translate(entities[`Sun`].body, {x: 0, y: -0.01});

    Matter.Events.on(engine, "collisionStart", (event) => {
        startTime = 0;
        dispatch({ type: "game_over" });
    });

    return entities;
}

export default Physics;
