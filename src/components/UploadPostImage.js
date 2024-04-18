import React, { useState } from "react";
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from "react-native";
import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const UploadPostImage = () => {
    const openImageLibrary = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
      style={styles.uploadBtnContainer}
        onPress={openImageLibrary}
      >
        <Text style={styles.uploadTxt}>Upload thumbnail</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadBtnContainer:{ 
    height: 200,
    width: '90%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    borderStyle: 'dashed',
    borderWidth: 1,
  },
  uploadTxt: {
    fontSize: 20,
    opacity: 0.5,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default UploadPostImage;
