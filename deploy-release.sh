# Script for deploy develop apk to cloud
GREEN=`tput setaf 2`
MAGENTA=`tput setaf 5`
NC=`tput sgr0`
#GREEN='\033[0;32m'
#ORANGE='\033[0;33m'
#NC='\033[0m' # No Color

# install dependencies
yarn install

# # make assets bundle
# react-native bundle --dev false --platform android --entry-file index.js --bundle-output ./android/app/src/main/assets/index.android.bundle --assets-dest ./android/app/src/main/res

# make release bundle
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/build/intermediates/res/merged/release/ && rm -rf android/app/src/main/res/drawable-* && rm -rf android/app/src/main/res/raw/* && cd android && ./gradlew assembleRelease && cd ..

# create apk
cd android && ./gradlew bundleRelease && cd ..


# copy apk to current folder
cp ./android/app/build/outputs/apk/release/app-release.apk ./prep-app-release.apk


# TODO send request for upload apk to cloud
echo "${GREEN}APK GENERATED${NC}"

echo "${MAGENTA} Please go to: ${NC} https://cloud.intekel.com/index.php/s/n4BqgsfqkGdfpeG and upload the apk manually from the current path"
echo "${MAGENTA} password: YJLzPTfEmZP8inN ${NC}"
echo 'download with short link: https://s.intekel.com/700mxapp'

read -n 1 -s -r -p "Press any key to continue to commit asset bundle changes and delete temp apk"

# rm ./mx700.apk

# git add android/app/src/main/assets/index.android.bundle
# git add android/app/src/main/res/*
# git commit -m "asset bundle"
# git push
