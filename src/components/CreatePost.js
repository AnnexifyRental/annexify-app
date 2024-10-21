import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import UploadPostImage from "./UploadPostImage";

const CreatePost = () => {

  const [title, setTitle] = useState("Enter Post Details");
  const [hidePostForm, setHidePostForm] = useState(true);
  const [postId, setPostId] = useState(null);
  const [postData, setPostData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (name, value) => {
    setPostData({ ...postData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8082/post", postData);
      console.log("Post created:", response.data);
      setPostId(response.data.id);  
      setPostData({ title: "", description: "" });
      setTitle("Upload Pictures");
      setHidePostForm(false);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
      {hidePostForm &&
        <View>
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
          <Button title="Upload pictures" onPress={handleSubmit} />
        </View>
      }
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
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default CreatePost;
