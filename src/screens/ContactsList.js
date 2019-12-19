/**
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';

// $FlowFixMe
const ContactItem: () => React$Node = ({name, imageUrl, onPress, phoneNumber, age}) =>
  (
    <TouchableOpacity style={styles.contactContainer} onPress={onPress}>
      <View style={styles.contactImageContainer}>
        <Image style={styles.contactImage} source={{uri: imageUrl}} />
      </View>
      <View style={styles.contactInformationContainer}>
        <Text numberOfLines={1} style={styles.contactName}>{name}</Text>

        <Text style={styles.contactDescription}>
          {`Number: ${phoneNumber}`}
        </Text>
        <Text style={styles.contactDescription}>
          {`Age: ${age}`}
        </Text>
      </View>
    </TouchableOpacity>
  );

class ContactsList extends React.Component<{navigation: any}, {contactInformationList: Array<Object>, loading: boolean}> {
  state = {
    contactInformationList: [],
    loading: true,
  };

  async componentDidMount() {
    try {
      const randomUsersApiCall = await fetch('https://randomuser.me/api?results=10');
      const users = await randomUsersApiCall.json();
      this.setState({
        contactInformationList: users.results,
        loading: false,
      });
    } catch(err) {
      console.log("Error fetching data-----------", err);
    }
  }

  onItemPress = (itemData: Object) => {
    const navigation = this.props.navigation;
    navigation.push('ContactDetails', {contactData: itemData});
  }

  renderItem = (data: Object) => {
    const contactInformation = data.item;
    const {title: nameTitle, first: firstName, last: lastName} = contactInformation.name;

    return (<ContactItem 
    name={`${nameTitle} ${firstName} ${lastName}`}
    imageUrl={contactInformation.picture.large}
    phoneNumber={contactInformation.phone}
    age={contactInformation.dob.age}
    onPress={() => this.onItemPress(data.item)} />);
  }

  render() {
    const navigation = this.props.navigation;
    const {loading, contactInformationList} = this.state;

    let content: React$Node;
    let containerStyle: Object;
    if(!loading) {
      containerStyle = {};
      content = (
        <FlatList
        data={contactInformationList}
        renderItem={this.renderItem}
        keyExtractor={(item) => item.login.username} 
        />
      )
    } else {
      containerStyle = styles.center;
      content = (
      <View style={styles.center}>
        <ActivityIndicator size='large' />
      </View>
      );
    }

    return (
      <SafeAreaView style={containerStyle}>
        {content}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  contactContainer: {
    marginBottom: 16,
    padding: 24,
    width: '100%',
    backgroundColor: '#eeeefe',
    display: 'flex',
    flexDirection: 'row',
  },
  contactImageContainer: {
    marginRight: 20,
  },
  contactImage: {
    borderRadius: 20,
    width: 100,
    height: 100,
  },
  contactInformationContainer: {
    flex: 1,
    marginRight: 20,
  },
  contactName: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.black,
  },
  contactDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
});

export default ContactsList;
