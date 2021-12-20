import Matter from "matter-js";
import React from "react";
import { View, Image } from "react-native";

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

            <Image
                style={{
                    width: widthBody,
                    height: heightBody
                }}
                source={require('../assets/bird/frame-2.png')}
            />

        </View>
    )
}

export default (world, color, pos, size) => {
    const initialPlayer = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            label: "Player"
        }
    );
    Matter.World.add(world, initialPlayer);
    return {
        body: initialPlayer,
        color,
        pos,
        renderer: <Player/>
    }
}
