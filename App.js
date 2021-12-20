import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from './entities';
import Physics from './physics';
import { Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function App() {
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [gameEngine, setGameEngine] = useState(null);
  const [gameOverState, setGameOverState] = useState(false);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [highestPoint, setHighestPoint] = useState(0);
  const [showControls, setShowControls] = useState(false);

  const saveHighScore = () => {
    if (currentPoints > highestPoint) {
      setHighestPoint(currentPoints);
    }
  }

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
          setGameEngine(ref)
        }}
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
              setGameOverState(true);
              saveHighScore();
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
          fontSize: 24
        }}>
          <Ionicons name="md-pause-circle" size={42} color="black" class="mr-2" />
        </Text>
      </TouchableOpacity>
      : null }

      {/** Show controls */}
      {!running && showControls ?
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
        
        <View style={{
          backgroundColor: "black",
          opacity: 0.7,
          width: windowWidth,
          height: windowHeight,
          position: "absolute"
        }}></View>

        <Text style={{
          fontWeight: "bold",
          color: "white",
          fontSize: 20,
          margin: 10
        }}>
          Tap on the screen to jump with the bird.
        </Text>

        <Text style={{
          fontWeight: "bold",
          color: "white",
          fontSize: 17,
          margin: 10
        }}>
          <Ionicons name="md-add-circle" size={32} color="white" class="mr-2" />
          You get +1 point for each wall avoided.
        </Text>

        <Text style={{
          fontWeight: "bold",
          color: "white",
          fontSize: 17,
          margin: 10
        }}>
          <Ionicons name="md-arrow-forward-circle" size={32} color="white" class="mr-2" />
          Speed will increase with points.
        </Text>

        <TouchableOpacity style={{
            shadowColor: "black",
            shadowOpacity: 0.4,
            shadowRadius: "25px",
            backgroundColor: "white",
            paddingHorizontal: 30,
            paddingVertical: 10,
            marginTop: 25,
          }}
          onPress={() => {
            setShowControls(false);
          }}>
          <Text style={{
            fontWeight: "bold",
            color: "black",
            fontSize: 30
          }}>
            <Ionicons name="md-arrow-back-circle" size={32} color="black" class="mr-2" />
            BACK
          </Text>
        </TouchableOpacity>

      </View>: null}

      {!running && !showControls ?
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

        {gameOverState ?
          <Text 
          style={{
            textAlign: "center",
            fontSize: 60,
            fontWeight: "bold",
            margin: 10,
            color: "red",
          }}
        >
          GAME OVER
        </Text>
        : null}

        {/** Score text */}
        <Text 
          style={{
            textAlign: "center",
            fontSize: 42,
            fontWeight: "normal",
            margin: 15,
            color: "white",
          }}
        >
          {currentPoints} POINTS
        </Text>

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
            fontSize: 30
          }}>
            <Ionicons name="md-play" size={32} color="black" class="mr-2" />
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
            setGameOverState(false);
            gameEngine.swap(entities());
            setCurrentPoints(0);
          }}>
          <Text style={{
            fontWeight: "bold",
            color: "black",
            fontSize: 30
          }}>
            <Ionicons name="md-add-circle" size={32} color="black" class="mr-2" />
            NEW GAME
          </Text>
        </TouchableOpacity>

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
            setShowControls(true);
          }}>
          <Text style={{
            fontWeight: "bold",
            color: "black",
            fontSize: 30
          }}>
            <Ionicons name="md-settings" size={32} color="black" class="mr-2" />
            CONTROLS
          </Text>
        </TouchableOpacity>

        <Text 
          style={{
            textAlign: "center",
            fontSize: 25,
            fontWeight: "normal",
            margin: 20,
            color: "white",
          }}
        >
          HIGHEST SCORE: {highestPoint}
        </Text>

      </View> : null}

    </View>
  );
}
