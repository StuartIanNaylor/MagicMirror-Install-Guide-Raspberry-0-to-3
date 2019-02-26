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
sudo modprobe zram
sudo zramctl -f -a lz4 -s 220M
sudo mkswap /dev/zram0
swapon /dev/zram0
```
