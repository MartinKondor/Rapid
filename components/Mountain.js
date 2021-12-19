import Matter from "matter-js";
import React from "react";
import { View, Image } from "react-native";


const Mountain = (props) => {
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
                    height: heightBody,
                }}
                source={require('../assets/mountain_background/LargeMountain.png')}
            />

        </View>
    )
}

export default (world, color, pos, size) => {
    const initialMountain = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            label: "Mountain",
            isStatic: true
        }
    );

    initialMountain.collisionFilter = {
        'group': -1,
        'category': 2,
        'mask': 0,
    };

    Matter.World.add(world, initialMountain);
    return {
        body: initialMountain,
        color,
        pos,
        renderer: <Mountain/>
    }
}
