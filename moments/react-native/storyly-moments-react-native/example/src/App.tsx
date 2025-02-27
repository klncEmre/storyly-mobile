import * as React from 'react';

import { StyleSheet, View, Button, SafeAreaView } from 'react-native';
import StorylyMoments from 'storyly-moments-react-native';

export default function App() {
  const [userPayload, setUserPayload] = React.useState<string | undefined>();

  const momentsUserPayload: StorylyMomentsUserPayload = {
    id: "",
    username: "",
    avatarUrl: "",
    followings: [""],
    creatorTags: null,
    consumerTags: null,
    expirationTime: -1,
  }

  React.useEffect(() => {
    StorylyMoments.encryptUserPayload(
      momentsUserPayload,
      [MOMENTS_SECRET_KEY],
      [MOMENTS_INITIALIZATION_VECTOR]      
    ).then(setUserPayload);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Button 
          onPress={() => 
            StorylyMoments.initialize(
              [MOMENTS_TOKEN], 
              userPayload
            )
          }
          title="Initialize Moments"
          color="#242450"
        />
      </View>
      <View style={styles.box}>
        <Button 
          onPress={() => StorylyMoments.openUserStories() }
          title="Show User Stories"
          color="#00E0E4"
        />
      </View>
      <View style={styles.box}>
        <Button 
          onPress={() => StorylyMoments.openStoryCreator() }
          title="Create Story"
          color="#7A4BFF"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 180,
    height: 60,
  },
});
