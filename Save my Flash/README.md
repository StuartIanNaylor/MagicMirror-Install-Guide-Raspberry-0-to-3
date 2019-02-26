# Save my Flash
Flash memory can be written to many many times but it is limited and constant thrashing by logs or swap disks isn't actually good for flash life expectancy.
So if you wish to have a more trouble free MagicMirror then employ the following

###Log2Ram
Its in the name but instead of flash it will use a small amount of memory and just rotate logs quicker to achieve this.

https://github.com/azlux/log2ram
```
curl -Lo log2ram.tar.gz https://github.com/azlux/log2ram/archive/master.tar.gz
tar xf log2ram.tar.gz
cd log2ram-master
chmod +x install.sh && sudo ./install.sh
cd ..
rm -r log2ram-master
```
Reboot and check if working

Is it working?
You can now check the mount folder in ram with (You will see lines with log2ram if working)
```
df -h
```
log2ram          40M  532K   40M   2% /var/log
```
mount
```
log2ram on /var/log type tmpfs (rw,nosuid,nodev,noexec,relatime,size=40960k,mode=755)


###Zram
Now this one is debable as the zero is a little light on horse power and even if the increase via Zram is minimal its still 50/50 for me.
I think actually its prob better without apart from creating a Ram disk for Log2Ram and changing the fstab for log2ram.
I am going to go through Zram and you can try it out yourself and just see how it runs and if memory is a problem with flash swap turned off.

Zram is part of the kernel and zramctl is alerady installed.
```
free -h
```
or
```
top
```
Will give you details of current memory and swap usuage.
```
FILE=$(mktemp)
wget https://mirrors.kernel.org/ubuntu/pool/universe/z/zram-config/zram-config_0.5_all.deb -qO $FILE && sudo dpkg -i $FILE
sudo reboot
```
Also zramctl will now show we have a permenant zram swap drive.
Now we get to take the default swap off the flash disk as if you do a swapon command it will show you the disks with the Zram having a higher prority and to be used before the default swap disk.
Also because Zram is much faster than a flash based swap we are going to up the system preference for swap slightly.
```
sudo echo 'vm.swappiness=75' >> /etc/sysctl.conf
```





