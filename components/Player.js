import Matter from "matter-js";
import React from "react";
import { View } from "react-native";

const Player = (props) => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

    const xBody = props.body.position.x - widthBody / 2;
    const yBody = props.body.position.y - heightBody / 2;

    const color = props.color;

    return (
        <View style={{
            backgroundColor: color,
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: widthBody,
            height: heightBody
        }}>
            <View style={{
                shadowColor: "green",
                shadowOpacity: 1.0,
                shadowRadius: "15px",

                backgroundColor: "green",
                position: 'absolute',
                left: widthBody / 4,
                top: heightBody / 4,
                width: widthBody - widthBody / 2,
                height: heightBody - heightBody / 2
            }}>
            </View>
        </View>
    )
}

export default (world, color, pos, size) => {
    const initialPlayer = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {label: "Player"}
    );
    Matter.World.add(world, initialPlayer);
    return {
        body: initialPlayer,
        color,
        pos,
        renderer: <Player/>
    }
}
