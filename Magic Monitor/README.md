# Magic Monitor
Its extremely easy to monitor log files in Linux and we are going to use the PM2 log and Chromium log to sendkeys ctrl+F5 (Refresh ignore cache, so basically a fresh refresh :) )

So in ~/MagicMirror do a nano xdotool.sh and paste the following:-
```
if [ -z "$DISPLAY" ]; then #If not set DISPLAY is SSH remote or tty
	export DISPLAY=:0 # Set by default display
fi
xdotool search --onlyvisible --class "chromium" key ctrl+F5  -v 2>&1 | logger &
```
The '-v 2>&1 | logger &' just sends the output to syslog so you can remove that bit if you wish but for testing its good to check its being called by checking the log.
chmod a+x xdotool.sh to make it executable.
Then again in ~/MagicMirror do a nano chrome-log.sh and paste the following:-
```
#Grep is a bit confusing as \| ie OR not AND so you get the following of Or + inline there is the other string
#grep -q '8080\|ERROR' would return true if either exist (OR)
( tail -f -n0 ~/.config/chromium/chrome_debug.log & ) | grep -q '8080.*ERROR\|ERROR.*8080'
sh xdotool.sh
```
chmod a+x chrome-log.sh to make it executable.
So if a line contains '8080' & 'ERROR' we are going to fresh refresh Chromium.
You will have to do some reading on Grep as to be honest anything but simple regex confuses the hell out of me
If you have a problem module you will have to examine your logs and see if you can find a line for a match to call a fresh refresh.
You can add that to your grep search or you might just create another seperate monitor say chrome-log2.sh and just add that to the MagicMonitor.sh script with the last call without the ampersand on the end.
 
Then again in ~/MagicMirror do a nano pm2-out-log.sh and paste the following:-
```
( tail -f -n0 ~/.pm2/logs/MagicMirror-out.log & ) | grep -q 'Ready to go! Please point your browser to:'
sh xdotool.sh
```
chmod a+x pm2-out-log.sh to make it executable.
So the above doesn't just wait for PM2 to restart it waits until MagicMirror has loaded all the modules and is ready and once again does a fresh refresh.
That way we don't get any horrid lags of the white Chromium refresh page.

There are likely to be much better ways to do this but I like it because its a simple 1 line tail & text match with a single action.
What you can do is to remove the -q from grep -q and now the command will not fire but the output of hits will echo to the console.
So you can test these via sh pm2-out-log.sh with the -q missing to see if you are capturing the correct strings and if so put the -q back and make sure xdotool is doing a fresh refresh.

Again in ~/MagicMirror do a nano MagicMonitor.sh and paste the following:-
```
sh chrome-log.sh &
sh pm2-out-log.sh
```
chmod a+x pm2-out-log.sh to make it executable.
Again you can sh MagicMonitor.sh to test without -q for hit test or with -q for action for both monitors running.

Then finally nano run-start-sh and insert this line so its looks as so for Pi0/1.
```
if [ -z "$DISPLAY" ]; then #If not set DISPLAY is SSH remote or tty
	export DISPLAY=:0 # Set by default display
fi
sh MagicMonitor.sh &
node serveronly $1
```
Pi 2/3 users will have this
```
if [ -z "$DISPLAY" ]; then #If not set DISPLAY is SSH remote or tty
	export DISPLAY=:0 # Set by default display
fi
sh MagicMonitor.sh &
electron js/electron.js $1
```
I don't have a Pi2/3 currently and the presumption is electron is just chromium in a wrapper and could work.
If not you will have to find the electron class name so that xdotool search --onlyvisible --class "electron" will work
http://manpages.ubuntu.com/manpages/trusty/man1/xdotool.1.html

If you ever need to test the logs just comment out the sh MagicMonitor.sh & with #sh MagicMonitor.sh & reboot and run sh MagicMonitor.sh via ssh
