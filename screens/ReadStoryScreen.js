import React from 'react';
import { Text, View, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import db from '../config'
import { ScrollView } from 'react-native-gesture-handler';



export default class Searchscreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allTransactions: [],
      lastVisibleTransaction: null,
      search: ''
    }
  }

  fetchMoreTransactions = async () => {
    var text = this.state.search.toUpperCase()


    const query = await db.collection("books").where('Author', '==', text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
    query.docs.map((doc) => {
      this.setState({
        allTransactions: [...this.state.allTransactions, doc.data()],
        lastVisibleTransaction: doc
      })
    })

  }

  searchTransactions = async (text) => {
    const transaction = await db.collection('books').where('Author', '==', text).get()
    transaction.docs.map((doc) => {
      this.setState({
        allTransactions: [...this.state.allTransactions, doc.data()],
        lastVisibleTransaction: doc
      })
    })
  }


  componentDidMount = async () => {
    const query = await db.collection("books").limit(10).get()
    query.docs.map((doc) => {
      this.setState({
        allTransactions: [],
        lastVisibleTransaction: doc
      })
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.bar}
            placeholder="Enter Book Name or Author's Name"
            onChangeText={(text) => { this.setState({ search: text }) }} />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => { this.searchTransactions(this.state.search) }}
          >
            <Text>Search</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.allTransactions}
          renderItem={({ item }) => (
            <View style={{ borderBottomWidth: 2 }}>
              <Text>{"Author: " + item.Author}</Text>
              <Text>{"Story Name:" + item.StoryTitle}</Text>
              <Text>{"Date: " + item.date.toDate()}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={this.fetchMoreTransactions}
          onEndReachedThreshold={0.7}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  searchBar: {
    flexDirection: 'row',
    height: 40,
    width: 'auto',
    borderWidth: 0.5,
    alignItems: 'center',
    backgroundColor: 'grey',
    marginTop: 30
  },
  bar: {
    borderWidth: 2,
    height: 30,
    width: 300,
    paddingLeft: 10,
   
  },
  searchButton: {
    borderWidth: 1,
    height: 30,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green'
  }
})