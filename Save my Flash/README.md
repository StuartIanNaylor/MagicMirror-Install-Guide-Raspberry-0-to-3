# Save my Flash
Flash memory can be written to many many times but it is limited and constant thrashing by logs or swap disks isn't actually good for flash life expectancy.
So if you wish to have a more trouble free MagicMirror then employ the following

###Log2ram
```
git clone https://github.com/StuartIanNaylor/log2ram
cd log2ram
chmod +x install.sh && sudo ./install.sh
```
Little bit of an update to log2ram but now you can have /var/log in a zram disk
Also gives more control of zram swaps and choice if you enable or not.

etc/log2ram.conf
```
# Configuration file for Log2Ram (https://github.com/azlux/log2ram) under MIT license.
# This configuration file is read by the log2ram service

# Size for the ram folder, it defines the size the log folder will reserve into the RAM.
# If it's not enough, log2ram will not be able to use ram. Check you /var/log size folder.
# The default is 40M and is basically enough for a lot of applications.
# You will need to increase it if you have a server and a lot of log for example.
SIZE=40M

# This variable can be set to true if you prefer "rsync" rather than "cp".
# I use the command cp -u and rsync -X, so I don't copy the all folder every time for optimization.
# You can choose which one you want. Be sure rsync is installed if you use it.
USE_RSYNC=false

# If there are some errors with available RAM space, a system mail will be send
# Change it to false and you will have only a log if there is no place on RAM anymore.
MAIL=true

# Compression algorythm either lzo or lz4 on a Zero lzo provides lower process load if you have CPU power to spare then maybe
# lz4 will provide better results but if you check the spreadsheet in the tests folder lzo on a pi zero at least was superior in
# performance lz4 may give better compression.
# all /proc/crypto algs are supported but s/w vs h/w obviously much slower.
# but check if exist also shortened list via cat /sys/block/zramX/comp_algorithm
COMP_ALG_LOG=deflate
COMP_ALG_SWAP=lz4
# ZL2R flag means use ZRAM ramdisk for log2ram true=enable / false=disable
ZL2R=false
# Big cores should only be counted really but this is where you can dictate zram swap dev count Default is 0 and settings
# can be edited to personal taste.
# BIG_CORES=0 Disables zram swaps
BIG_CORES=0
# Free mem factor deb is 50 I concur that 75 is better but its open. Free mem factor is just the fraction of
# free mem used for swap drive total Drive size = Free_Mem * mem_factor / 100 / Big_Cores
# So if you want .75 of total mem make mem_factor 75 as divided by 100 to avoid float usage
MEM_FACTOR=75
SWAP_PRI=75
# edit /etc/sysctl.conf add vm.swappiness = 75 or higher to the end of that file and save
```
sudo nano /etc/log2ram.conf
change ZL2R to =true, up the SIZE to =80M and BIG_CORES =1
```
sudo mkdir /var/log/chromium
sudo mkdir /var/log/pm2
sudo chown pi:pi /var/log/chromium
sudo chown pi:pi /var/log/pm2
```
Unfortnately you have to move the user directory of chrome to move the logs but actually this is no problem as there is a lot of dynamic writes going to your flash there.
So it actually works to use a ram disk and even better a compressed zram disk that doesn't steal as much precious memory and increase Chromium performance.
Pm2 you just set log locations when you pm2 start ~/MagicMirror/installers/pm2_MagicMirror.json
So just nano ~/MagicMirror/installers/pm2_MagicMirror.json
```
{
  "apps" : [{
    "name"        : "MagicMirror",
    "script"      : "/home/pi/MagicMirror/installers/mm.sh",
    "watch"       : ["/home/pi/MagicMirror/config/config.js"]
  }]
}
```
to something like this but just check the pm2 docs at http://pm2.keymetrics.io/docs/usage/log-management/
```
{
  "apps" : [{
    "name"        : "MagicMirror",
    "script"      : "/home/pi/MagicMirror/installers/mm.sh",
    "watch"       : ["/home/pi/MagicMirror/config/config.js"],
    "error_file"      : "/var/log/pm2/err.log",
    "out_file"        : "/var/log/pm2/out.log",
    "merge_logs"      : true,
    "log_date_format" : "YYYY-MM-DD HH:mm Z"
}]
}

```
cd ~/MagicMirror and pm2 stop MagicMirror
pm2 start ~/MagicMirror/installers/pm2_MagicMirror.json
pm2 save
```
sudo nano /etc/sysctl.conf
```
Add vm.swappiness = 75 to the end of that file and save
