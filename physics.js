import Matter from "matter-js"
import { getPipeSizePosPair } from "./utils/random";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Physics = (entities, {touches, time, dispatch}) => {
    let engine = entities.physics.engine;

    touches.filter(t => t.type === "press")
    .forEach(t => {
        Matter.Body.setVelocity(entities.Player.body, {
            x: 0,
            y: -4
        });
    });

    Matter.Engine.update(engine, time.delta);
    
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

        Matter.Body.translate(entities[`ObstacleTop${i}1`].body, {x: -3, y: 0});
        Matter.Body.translate(entities[`ObstacleBottom${i}1`].body, {x: -3, y: 0});
        Matter.Body.translate(entities[`ObstacleTop${i}2`].body, {x: -3, y: 0});
        Matter.Body.translate(entities[`ObstacleBottom${i}2`].body, {x: -3, y: 0});
    }

    /*
    for (let index = 1; index <= 2; index++) {

        if (entities[`ObstacleTop${index}`].body.bounds.max.x <= 50 && !entities[`ObstacleTop${index}`].point) {
            entities[`ObstacleTop${index}`].point = true;
            dispatch({type: "new_point"});
        }
        else if (entities[`ObstacleTop${index}`].body.bounds.max.x > 50) {
            entities[`ObstacleTop${index}`].point = false;
        }

        if (entities[`ObstacleTop${index}`].body.bounds.max.x <= 0) {
            const pipeSizePos = getPipeSizePosPair(windowWidth * 0.9);
            Matter.Body.setPosition(entities[`ObstacleTop${index}`].body, pipeSizePos.pipeTop.pos);
            Matter.Body.setPosition(entities[`ObstacleBottom${index}`].body, pipeSizePos.pipeBottom.pos);
        }

        Matter.Body.translate(entities[`ObstacleTop${index}`].body, {x: -3, y: 0});
        Matter.Body.translate(entities[`ObstacleBottom${index}`].body, {x: -3, y: 0});
    }
    */

    Matter.Events.on(engine, "collisionStart", (event) => {
        dispatch({ type: "game_over" });
    });
    return entities;
}

export default Physics;
