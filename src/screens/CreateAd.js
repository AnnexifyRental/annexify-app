import React, { useState } from "react";
import CreatePost from "../components/CreatePost";
import UploadPostImage from "../components/UploadPostImage";
import { StyleSheet, View } from "react-native";

const CreateAd = () => {

  return (
    <View style={styles.container}>
      <CreatePost />
      <UploadPostImage />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});



export default CreateAd;
