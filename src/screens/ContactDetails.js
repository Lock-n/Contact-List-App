/**
 * @flow
 */

import React from 'react';
import { SafeAreaView, Text, Image, View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const ContactDetails: ({navigation: any}) => React$Node = ({navigation}) => {
    const contactData = navigation.getParam('contactData', {
        name: {
            title: 'mr',
            first: 'brad',
            last: 'gibson',
        },
        location: {
            street: {number: 9278, name: 'new road',},
            city: 'kilcoole',
        },
        dob: {age: 50},
        picture: {
            large: "https://randomuser.me/api/portraits/men/75.jpg",
        },
    });

    const contactName = `${contactData.name.first} ${contactData.name.last}`;
    const contactAddress = `${contactData.location.street.name}, ${contactData.location.street.number} - ${contactData.location.city}`;
    return (
        <SafeAreaView style={styles.body}>
            <ScrollView contentContainerStyle={styles.body}>
                <Text style={styles.contactName}>
                    {contactName}
                </Text>
                <Image style={styles.contactImage} source={{uri: contactData.picture.large}}/>
                <View style={styles.contactInformationContainer}>
                    <View>
                        <Text style={styles.contactInformationRow}>Age:</Text>
                        <Text style={styles.contactInformationRow}>Address:</Text>
                    </View>
                    <View>
                        <Text style={{...styles.contactInformationRow, ...styles.contactInformationValue}}>{contactData.dob.age}</Text>
                        <Text style={{...styles.contactInformationRow, ...styles.contactInformationValue}}>{contactAddress}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
    },
    contactName: {
        fontSize: 50,
        fontWeight: '700',
        textTransform: 'capitalize',
    },
    contactImage: {
        width: 300,
        height: 300,
        borderRadius: 200,
    },
    contactInformationContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
    },
    contactInformationRow: {
        fontSize: 20,
        padding: 10,
    },
    contactInformationValue: {
        fontWeight: '600',
        textTransform: 'capitalize',
    },
});

export default ContactDetails;