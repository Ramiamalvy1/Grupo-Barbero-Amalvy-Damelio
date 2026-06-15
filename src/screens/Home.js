import { StyleSheet, Text, View } from 'react-native';
import Post from '../components/Post';
import React, { useEffect } from 'react';
import { db } from '../firebase/config';
import { FlatList } from 'react-native-web';

function Home(props) {

  const [posts, setPosteos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    db.collection('posts').onSnapshot(
      docs => {
        let posts = [];
        docs.forEach(doc => {
          posts.push({
            id: doc.id,
            data: doc.data()
          })
          setPosteos(posts)
          setLoading(false)
        })
      }
    )
  }, []);


  return (
    <View>
      <Text>Home Screen</Text>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Post data={item.data} id={item.id} navigation={props.navigation}/>}
      />
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f9fc',
    padding: 10,
  },
  header: {
    borderBottomWidth: 3,
    borderBottomColor: '#74acdf',
    paddingBottom: 5,
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#1e3d59',
  }
});