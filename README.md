# MagicMirror-Install-Guide-Raspberry-0-to-3
Rather than an install script a guide on how easy it is to install NodeJS and magic mirror works for all Pi and also includes 0 scripts which don't use the incompatible electron Armv7l package 


### Grab you image from raspberrypi.org/downloads/raspbian/

Its up to you which you use but as in the name [Raspbian Raspbian Stretch Lite Latest](https://downloads.raspberrypi.org/raspbian_lite_latest) is the lightest and likely to create the best results.
For a mirror that will generally be remote and a mirror installing a full desktop is likely pointless.

Flash the image using Etcher from [https://www.balena.io/etcher/]()
Boot and then enter your WiFi details as the presumption is you will have a WiFi mirror.

So our flash is complete and we are going to boot our pi zero and create some settings. All we need is the SSID of your WiFi router (The name it lists up as when you connect) My ssid="TALKTALKF20CC3" My psk="VE3JAX5F" (MyWifi password)

- [x] So we are going to login: login: = pi password = raspberry

- [x] then type: sudo raspi-config and press enter

- [x] Choose 2: Network Choose N2: WiFi Select your country. Enter your ssid. Enter your wifi password.

- [x] Choose 5: Interfaces Choose P2: SSH Yes to enable.

- [x] Tab to finish and Yes to reboot

We need a SSH client such as [Putty](https://www.putty.org/) or [Bitvise](https://www.bitvise.com/ssh-client).
Also [Notepad++](https://notepad-plus-plus.org/) is a great little editor that supports Unix & Windows LF/EOF formats.
If your unsure the sugestions is Bitvise & Notepad++

When the Pi reboots in the boot console log on screen you should now see a line My IP address is ... copy that into the Server Host address and the pi/raspberry login details and login.

### Update your system and install the base packages for MagicMirror

```
sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt-get dist-upgrade -y
```
Pi0/1 owners yeap the first boot update/upgrade to get the latest will be a :sleeping: experience with Pi 2/3 owners being slightly less :sleeping:.
So now we have a completely updated and upgraded Pi and now to install Mirror specific packages.
```
sudo apt-get install -y chromium-browser unclutter lightdm git rpd-plym-splash plymouth-x11 xdotool
```
NodeJS for Pi 0/1 Armv6l is supported but not pakaged due to problems with Chromium compile for electron, this is no problem as the [NodeJS NVM NodeVersionManager](https://github.com/creationix/nvm) is excellent and probably should be used for all Pi versions.
If you have a Pi 2/3 armv7l processor then you can install NodeJS via raspbian packages sudo-apt-get instal... but the NVM gives far better control.
Read the [GitHub ReadMe](https://github.com/creationix/nvm/blob/master/README.md) for a run down of how to use NVM and what it is capable of.
To install
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
```
As it will tell you close the current SSH console or reboot. So do so and install Node with...

```
nvm install --lts
```
As we will use the latest Long Term Support Version.

##Cloning & Installing MagicMirror
From the [MagicMirror site](https://magicmirror.builders/) click on repository and copy the url or click the green clone button and copy from there.
```
git clone https://github.com/MichMich/MagicMirror.git
```
Then we will enter the MagicMirror folder and start the install
```
cd ~/MagicMirror && npm install
```
More :sleeping: time.
So that MagicMirror will autostart and restart on failure we are going to install the [NodeJS Process Manager PM2](http://pm2.keymetrics.io/) and if you need further infomation the [documentation](http://pm2.keymetrics.io/docs/usage/quick-start/) is great.
So to install
```
npm install pm2@latest -g
```
Then we are going to ask PM2 for the correct startup command and paste that into the console.

```
pm2 startup
```
Which for me returns, but trust PM2 and not me.
```[PM2] Init System found: systemd
[PM2] To setup the Startup Script, copy/paste the following command:
sudo env PATH=$PATH:/home/pi/.nvm/versions/node/v10.15.1/bin /home/pi/.nvm/versions/node/v10.15.1/lib/node_modules/pm2/bin/pm2 startup systemd -u pi --hp /home/pi
```
So do as said and copy & paste what PM2 tells you.
This is where us Pi0/1 and 2/3 owners depart as the need of use of Chromium rather Electron dicates some small changes.
For Pi 0/1 owners.
For Pi 2/3 owners the last thing is.
```
pm2 start ~/MagicMirror/installers/pm2_MagicMirror.json
```
Save that for autoboot
```
pm2 save
```
Copy the sample config.js to the config folder
```
wget https://raw.githubusercontent.com/StuartIanNaylor/MagicMirror-Install-Guide-Raspberry-0-to-3/master/config.js -O ~/MagicMirror/config/config.js
```
 And we are ready to go with
```
DISPLAY=:0 npm start
```
Thats it unless you wish to read Make things Plymouth pretty and Save my Flash in the above to folders on instructions how to have a MagicMirror splash screen and how to use zram and tools to limit flash writes to a minimium. Apart the last bit about raspi-config and desktop autologin.

So back to Pi0/1 users.
The quickest and easiest way is to create a ~/.Xsession file and here is a sample config.
```
nano ~/.Xsession
```
Paste the following
```
xset s off
xset -dpms
xset s noblank
sleep 20
chromium-browser --noerrdialogs --kiosk http://localhost:8080 --incognito --disable-translate --window-size=1920,1080 --window-position=0,0
```
Then edit run-start.sh
```
sed -i 's/electron js\/electron.js /node serveronly /g' ~/MagicMirror/run-start.sh
```
So it looks like
```
if [ -z "$DISPLAY" ]; then #If not set DISPLAY is SSH remote or tty
	export DISPLAY=:0 # Set by default display
fi
node serveronly $1
```
So for Desktop Autologin
```
sudo raspi-config
```
- [x] 3 Boot options
- [x] B1 Desktop/CLI
- [x] B4 Desktop Autologin
Then like the P2/3 owners add and save to PM2
```
pm2 start ~/MagicMirror/installers/pm2_MagicMirror.json
```
Save that for autoboot
```
pm2 save
```
Then reboot
