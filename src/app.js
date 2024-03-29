//list of Pokemons and a search functionality. This code uses the [PokeAPI](https://pokeapi.co/) to fetch a list of 50 Pokemons and display them in a `FlatList`. A `TextInput` is used to provide users with search functionality. Users can type in the input field to filter the list of Pokemons based on their names.

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=50')
      .then((response) => response.json())
      .then((data) => setPokemons(data.results));
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemon ESL</Text>
      <TextInput
        style={styles.searchInput}
        onChangeText={setSearch}
        value={search}
        placeholder="Search Pokemon"
      />
      <FlatList
        data={filteredPokemons}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchInput: {
    width: '90%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  listItem: {
    width: '90%',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  listItemText: {
    fontSize: 18,
  },
});

export default App;