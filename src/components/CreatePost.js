import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import UploadPostImage from "./UploadPostImage";

const CreatePost = () => {

  const [postUuid, setPostUuid] = useState(null);
  const [postData, setPostData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (name, value) => {
    setPostData({ ...postData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://192.168.1.7:8080/post", postData);
      console.log("Post created:", response.data);
      setPostUuid(response.data.uuid);
      setPostData({ title: "", description: "" });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={postData.title}
        onChangeText={(text) => handleChange("title", text)}
        placeholder="Enter Post Title"
      />
      <TextInput
        style={styles.input}
        value={postData.description}
        onChangeText={(text) => handleChange("description", text)}
        placeholder="Enter Post Description"
      />
      <Button title="Submit" onPress={handleSubmit} />
      {postUuid &&
        <UploadPostImage postUuid={postUuid} />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#eee",
  }
});

export default CreatePost;
