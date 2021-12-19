import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from './entities';
import Physics from './physics';
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function App() {
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [gameEngine, setGameEngine] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);

  useEffect(() => {
    setRunning(false);
  }, []);

  return (
    <View style={{flex: 1}}> 

      <Image
          style={{
            height: windowHeight,
            position: "absolute"
          }}
          source={require('./assets/mountain_background/sky.png')}
      />

      <GameEngine
        ref={(ref) => {
          setGameEngine(ref)}
        }
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'transparent',
        }}
        entities={entities()}
        systems={[Physics]}
        running={running}
        onEvent={(e) => {
          switch (e.type) {
            case "game_over":
              setRunning(false);
              setPaused(false);  // Make sure it is false
              gameEngine.stop();
              break;
            case "new_point":
              setCurrentPoints(currentPoints + 1);
              break;
          } 
        }}
      >

        <Text 
          style={{
            textAlign: "center",
            fontSize: 70,
            fontWeight: "bold",
            margin: 35,
            color: "white"
          }}
        >
          {currentPoints}
        </Text>

        <StatusBar style="auto" hidden={true} />
      </GameEngine>

      {/** Pause button */}
      
      {running ?
      <TouchableOpacity style={{
          shadowColor: "black",
          shadowOpacity: 0.4,
          shadowRadius: "25px",
          backgroundColor: "white",
          padding: 10,
          width: 67,
          height: 67,
          top: windowHeight - 67,
          left: windowWidth - 67,
          bottom: 0,
          zIndex: 1,
          textAlign: "center",
          alignSelf: "bottom"
        }}
        onPress={() => {
          setRunning(false);
          setPaused(true);
        }}>
        <Text style={{
          fontWeight: "bold",
          color: "black",
          fontSize: 14
        }}>
          PAUSE
        </Text>
      </TouchableOpacity>
      : null }

      {!running ?
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>

        {/** Fade the game window */}
        <View style={{
          backgroundColor: "black",
          opacity: 0.5,
          width: windowWidth,
          height: windowHeight,
          position: "absolute"
        }}></View>

        {/** RESUME button */}
        {paused ?
        <TouchableOpacity style={{
            shadowColor: "black",
            shadowOpacity: 0.7,
            shadowRadius: "25px",
            backgroundColor: "white",
            paddingHorizontal: 30,
            paddingVertical: 10
          }}
          onPress={() => {
            setRunning(true);
            setPaused(false);
          }}>
          <Text style={{
            fontWeight: "bold",
            color: "black",
            fontSize: 40
          }}>
            RESUME
          </Text>
        </TouchableOpacity>
        : null }

        {/** NEW GAME button */}
        <TouchableOpacity style={{
            shadowColor: "black",
            shadowOpacity: 0.4,
            shadowRadius: "25px",
            backgroundColor: "white",
            paddingHorizontal: 30,
            paddingVertical: 10,
            marginTop: 25
          }}
          onPress={() => {
            setRunning(true);
            gameEngine.swap(entities());
            setCurrentPoints(0);
          }}>
          <Text style={{
            fontWeight: "bold",
            color: "black",
            fontSize: 40
          }}>
            NEW GAME
          </Text>
        </TouchableOpacity>

        {/** HIGH SCORE button */}
        <TouchableOpacity style={{
            shadowColor: "black",
            shadowOpacity: 0.4,
            shadowRadius: "25px",
            backgroundColor: "white",
            paddingHorizontal: 30,
            paddingVertical: 10,
            marginTop: 25
          }}
          onPress={() => {
            // TODO: Show high score table
          }}>
          <Text style={{
            fontWeight: "bold",
            color: "black",
            fontSize: 40
          }}>
            HIGH SCORE
          </Text>
        </TouchableOpacity>

      </View> : null}

    </View>
  );
}
