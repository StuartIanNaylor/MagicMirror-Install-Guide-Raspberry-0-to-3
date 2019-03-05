# Make things Plymouth pretty
How to add your MagicMirror Boot & restart Splashes to Plymouth & LightDM

```
sudo mkdir /usr/share/plymouth/themes/MagicMirror
sudo cp ~/MagicMirror/splashscreen/splash.png /usr/share/plymouth/themes/MagicMirror/splash.png
sudo cp ~/MagicMirror/splashscreen/splash_halt.png /usr/share/plymouth/themes/MagicMirror/splash_halt.png
sudo cp ~/MagicMirror/splashscreen/MagicMirror.plymouth /usr/share/plymouth/themes/MagicMirror/MagicMirror.plymouth
sudo cp ~/MagicMirror/splashscreen/MagicMirror.script /usr/share/plymouth/themes/MagicMirror/MagicMirror.script
sudo plymouth-set-default-theme -R MagicMirror
sudo update-initramfs -u
```

I find Plymouth somes a bit hit & miss, maybe me, just being me, but that should get the boot and reboot Plymouth MagicMirror them to enable. Reboot seems to show far more often :)
But some excellent documentation in the [Ubuntu Wiki](https://wiki.ubuntu.com/Plymouth)

The last touch is to do the same for the Xwindow using feh.

feh doesn't like transparencies and you can try the splashscreens that already exist. I prob just heard an Uurgh! so download a solid loader screen or any screen that doesn't have a transparency.
```
cd ~/MagicMirror/splashscreen
wget https://raw.githubusercontent.com/StuartIanNaylor/MagicMirror-Install-Guide-Raspberry-0-to-3/master/Make%20things%20Plymouth%20pretty/splash-solid.png
```
Then change the /path/to/image.file prob the /splashscreen/ folder or where just downloaded.
```
export DISPLAY=:0
feh --bg-scale ~/MagicMirror/splashscreen/splash-solid.png
```
On a reboot you should now have a slight gap between plymouth & xwindow but a relatively solid boot screen.
You will have to change /path/to/image.file to the folder you ran the wget and are going to store the image.
Arch Linux have a good doc on feh https://wiki.archlinux.org/index.php/feh

To finalise run sudo raspi-config once more just to make sure
Choose spashscreen at boot and also console autologin and reboot.

PS if you have a black border around your screen you need to sudo raspi-config avanced options and turn off overscan.
