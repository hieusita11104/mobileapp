import React from 'react';
import { View, FlatList, StyleSheet, Text, Image, TouchableOpacity, Alert } from 'react-native';

type ContactType = {
  name: string;
  email: string;
  position: string;
  photo: string;
};

const contacts: ContactType[] = [
  {
    name: 'Nguyễn Văn A',
    email: 'vana@example.com',
    position: 'Manager',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    name: 'Trần Thị B',
    email: 'thib@example.com',
    position: 'Developer',
    photo: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    name: 'Lê Văn C',
    email: 'c.le@example.com',
    position: 'Tester',
    photo: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
];

const ContactItem = ({ contact }: { contact: ContactType }) => (
  <View style={styles.listItem}>
    <Image source={{ uri: contact.photo }} style={styles.avatar} />
    <View style={styles.bodyItem}>
      <Text style={styles.nameText}>{contact.name}</Text>
      <Text>{contact.position}</Text>
    </View>
    <TouchableOpacity
      style={styles.btnCall}
      onPress={() => Alert.alert('Gọi cho', contact.name)}
    >
      <Text style={styles.callText}>Call</Text>
    </TouchableOpacity>
  </View>
);

export default function ContactList() {
  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={({ item }) => <ContactItem contact={item} />}
        keyExtractor={(item) => item.email}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 28,
    marginRight: 12,
  },
  bodyItem: {
    flex: 1,
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#2c3e50',
  },
  btnCall: {
    backgroundColor: '#3498db',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  callText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
