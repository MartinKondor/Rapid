import { Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const getPipeSizePosPair = (addToPosX=0) => {
    const sizeProps = {
        height: 128 / 2,
        width: 128
    }

    const pipeTop1 = {
        pos: {
            x: windowWidth + addToPosX,
            y: getRandom(sizeProps.height / 2, windowHeight / 2 - sizeProps.height / 2)
        },
        size: sizeProps
    };
    const pipeBottom1 = {
        pos: {
            x: windowWidth + addToPosX,
            y: getRandom(windowHeight - sizeProps.height / 2, windowHeight / 2 + sizeProps.height / 2)
        },
        size: sizeProps
    };
    const pipeTop2 = {
        pos: {
            x: windowWidth + addToPosX,
            y: getRandom(sizeProps.height / 2, windowHeight / 2 - sizeProps.height / 2)
        },
        size: sizeProps
    };
    const pipeBottom2 = {
        pos: {
            x: windowWidth + addToPosX,
            y: getRandom(windowHeight - sizeProps.height / 2, windowHeight / 2 + sizeProps.height / 2)
        },
        size: sizeProps
    };
    return {pipeTop1, pipeBottom1, pipeTop2, pipeBottom2};
}
