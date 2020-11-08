import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  keyAvoidingView,
  ToastAndroid,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import * as firebase from 'firebase';
import db from '../config.js';

export default class WriteStoryScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      storyName: '',
      author: '',
      story: '',
    };
  }


  submitStory = async () => {
  db.collection('books').add({
      Author:this.state.author,
      Story: this.state.story,
      StoryTitle:this.state.storyName
    });

    this.setState({
      storyName: '',
      author: '',
      story: '',
    })
  };

  render() {
    
  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "All Your Base Are Belong To Us",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Write Story</Text>

        <TextInput
          style={styles.input1Box}
          placeholder="Story Title"
          onChangeText={(text) => {
            this.setState({
              storyName: text,
            });
          }}
          value={this.state.storyName}
        />

        <TextInput
          style={styles.input1Box}
          multiline={true}
          placeholder="Name of the Author"
          onChangeText={(text) => {
            this.setState({
              author: text,
            });
          }}
          value={this.state.author}
        />

        <TextInput
          style={styles.inputBox}
          multiline={true}
          placeholder="Type up your story"
          onChangeText={(text) => {
            this.setState({
              story: text,
            });
          }}
          value={this.state.story}
        />

        <TouchableOpacity
          onPress={() => {
        this.submitStory()
        showToastWithGravity() }
          }
          style={styles.SubmitButton}>
          <Text style={styles.buttonText}>Submit Story</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00ff00',
  },
  header: {
    fontSize: 20,
    marginTop: 15,
    marginLeft: 110,
  },
  input1Box: {
    backgroundColor: 'yellow',
    marginTop: 25,
    height: 30,
    borderWidth: 1.5,
    borderRightWidth: 1,
    fontSize: 20,
  },
  SubmitButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: 15,
    marginTop: 60,
    width: 200,
    height: 50,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
  inputBox: {
    backgroundColor: 'yellow',
    marginTop: 25,
    
    height: 140,
    borderWidth: 1.5,
    borderRightWidth: 1,
    fontSize: 20,
  },
});