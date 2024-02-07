import React, { useEffect } from 'react';
import { FxBox, FxButton, FxPressableOpacity, FxText } from '@functionland/component-library';
import { Image, ImageBackground, StyleSheet, Linking } from 'react-native';
// import { isEmulatorSync } from 'react-native-device-info';
import { useInitialSetupNavigation } from '../../hooks/useTypedNavigation';
import { useSettingsStore } from '../../stores';
import { Routes } from '../../navigation/navigationConfig';
import { useLogger } from '../../hooks';
import Version from '../../components/Version';

export const WelcomeScreen = () => {
  const navigation = useInitialSetupNavigation();

  const { toggleDebugMode } = useLogger()
  // const isConnectedToBox = useIsConnectedToBox();
  const { colorScheme } = useSettingsStore((store) => ({
    colorScheme: store.colorScheme,
  }));


  const handleToggleDebugMode = () => {
    toggleDebugMode()
  }

  const onConnectToBox = () => {
    // if (isEmulatorSync()) {
    //   alert('Emulators cannot connect to the Box');
    //   return;
    // }
    // if (isConnectedToBox) {
    //   navigation.navigate(Routes.ConnectToWifi);
    // } else {
    //   navigation.navigate(Routes.ConnectToBlox);
    // }
    // if (walletConnect.connected) {
    //   navigation.navigate(Routes.FulaPassword);
    // } else {
    //   navigation.navigate(Routes.ConnectToWallet);
    // }
    navigation.navigate(Routes.LinkPassword);
  };

  const renderContent = () => {
    return (
      <FxBox paddingHorizontal="20" paddingVertical="40" alignItems="center">
        <FxText
          letterSpacing={2}
          variant="bodyXXSRegular"
          marginBottom="16"
          color={colorScheme === 'light' ? 'backgroundPrimary' : 'content1'}
        >
          Hello Functionlander!
        </FxText>

        <FxText
          fontFamily="Montserrat-Semibold"
          fontSize={36}
          lineHeight={48}
          textAlign="center"
          marginBottom="4"
          color={colorScheme === 'light' ? 'backgroundPrimary' : 'content1'}
        >
          Blox App
        </FxText>
        <Version marginBottom='16'/>

        <FxText
          variant="bodySmallRegular"
          textAlign="center"
          marginBottom="16"
          color={colorScheme === 'light' ? 'backgroundPrimary' : 'content1'}
        >
          By using this product you agree to the terms and conditions at fx.land/terms, 
          and would not hold Functionland liable for data loss.
        </FxText>
        <FxButton
          marginBottom="8"
          testID="app-name"
          size="large"
          width="100%"
          onPress={() => Linking.openURL('https://fx.land/terms')}
        >
          Terms & Conditions
        </FxButton>
        <FxButton
          marginBottom="8"
          testID="app-name"
          size="large"
          width="100%"
          onPress={onConnectToBox}
        >
          Agree & Setup my Blox
        </FxButton>
      </FxBox>
    );
  };

  return (
    <FxBox flex={1} justifyContent="flex-end" >
      <FxPressableOpacity
        delayLongPress={3000}
        onLongPress={handleToggleDebugMode}
        flex={1}
        style={{
          opacity: 1
        }}
      >
        {colorScheme === 'light' ? (
          <ImageBackground
            source={require('../../../assets/images/welcome_bg_light.png')}
            style={styles.backgroundBlox}

          >
            {renderContent()}
          </ImageBackground>
        ) : (
          <>
            <FxBox flex={1} justifyContent="center" paddingTop="20">
              <Image
                source={require('../../../assets/images/blox_dark.png')}
                style={styles.blox}
                resizeMode="contain"
              />
            </FxBox>
            {renderContent()}
          </>
        )}
      </FxPressableOpacity>
    </FxBox>
  );
};

const styles = StyleSheet.create({
  blox: {
    width: '100%',
  },
  backgroundBlox: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
});
