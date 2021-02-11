export ANDROID_SDK=$HOME/Android/Sdk
export PATH=$ANDROID_SDK/emulator:$ANDROID_SDK/tools:$PATH
#emulator -list-avds | xargs bash -c 'echo $1'
echo "List emulators:"
emulator -list-avds
if [ -z $1 ]
then
    echo "Please pick emulator from 0 to n-1"
    exit 1;
fi
export line=`expr $1 + 1`
export emulatorSelected=`emulator -list-avds | head -$line | tail -1`
echo "Running emulator: $emulatorSelected"
emulator @$emulatorSelected
