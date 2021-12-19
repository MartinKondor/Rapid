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

    const MIN_Y = 125;
    const MAX_Y = windowHeight - 125;

    const pipeTop1 = {
        pos: {
            x: windowWidth + addToPosX,
            y: getRandom(MIN_Y, MIN_Y + sizeProps.height)
        },
        size: sizeProps
    };
    const pipeTop2 = {
        pos: {
            x: windowWidth + addToPosX,
            y: getRandom(MIN_Y + 1.5 * sizeProps.height, MIN_Y + 2.5 * sizeProps.height)
        },
        size: sizeProps
    };
    const pipeBottom1 = {
        pos: {
            x: windowWidth + addToPosX,
            y: getRandom(MIN_Y + 3 * sizeProps.height, MIN_Y + 6 * sizeProps.height)
        },
        size: sizeProps
    };
    const pipeBottom2 = {
        pos: {
            x: windowWidth + addToPosX,
            y: getRandom(MIN_Y + 6.5 * sizeProps.height, MAX_Y)
        },
        size: sizeProps
    };
    return {pipeTop1, pipeBottom1, pipeTop2, pipeBottom2};
}
