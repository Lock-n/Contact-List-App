import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {ContactsList, ContactDetails} from './screens';

const AppNavigator = createStackNavigator(
    {
        Home: ContactsList,
        ContactDetails: ContactDetails,
    },
    {
      initialRouteName: 'Home',
    },
);
  
export default createAppContainer(AppNavigator);