# Make things Plymouth pretty
How to add your MagicMirror Boot & restart Splashes to Plymouth & LightDM

```
sudo mkdir /usr/share/plymouth/themes/MagicMirror
sudo cp ~/MagicMirror/splashscreen/splash.png /usr/share/plymouth/themes/MagicMirror/splash.png
sudo cp ~/MagicMirror/splashscreen/splash_halt.png /usr/share/plymouth/themes/MagicMirror/splash_halt.png
sudo cp ~/MagicMirror/splashscreen/MagicMirror.plymouth /usr/share/plymouth/themes/MagicMirror/MagicMirror.plymouth
sudo cp ~/MagicMirror/splashscreen/MagicMirror.script /usr/share/plymouth/themes/MagicMirror/MagicMirror.script
sudo plymouth-set-default-theme -R MagicMirror
```

I find Plymouth somes a bit hit & miss, maybe me, just being me, but that should get the boot and reboot Plymouth MagicMirror them to enable. Reboot seems to show far more often :)
But some excellent documentation in the [Ubuntu Wiki](https://wiki.ubuntu.com/Plymouth)


To finalise run raspi-config once more just to make sure
```
sudo raspi-config
```
- [x] 3 Boot options
- [x] B3 Splash
- [x] Yes to enable
```
sudo reboot
```
Now also we will change the LightDM Greeter background
```
sudo nano /etc/lightdm/lightdm-gtk-greeter.conf
```
Uncomment the background section so we have
```
[greeter]
background=~/MagicMirror/splashscreen/splash_halt.png
#user-background=
#theme-name=
```
