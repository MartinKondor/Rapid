import Matter from "matter-js";
import React from "react";
import { View } from "react-native";


const Ceil = (props) => {
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
        </View>
    )
}

export default (world, color, pos, size) => {
    const initialCeil = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            label: "Ceil",
            isStatic: true
        }
    );
    Matter.World.add(world, initialCeil);
    return {
        body: initialCeil,
        color,
        pos,
        renderer: <Ceil/>
    }
}
