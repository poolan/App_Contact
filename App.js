import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import * as Contacts from "expo-contacts";
import React, { useState } from "react";

export default function App() {
  const [contact, setContact] = useState({});
  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      if (data.length > 0) {
        setContact(data);
      }
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={contact}
        renderItem={({ item }) => (
          <Text>
            {item.name} ({item.phoneNumbers[0].number})
          </Text>
        )}
        keyExtractor={(item) => item.lookupKey}
      />
      <View style={styles.buttoncontainer}>
        <Button title="Get Contacts" onPress={getContacts} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
