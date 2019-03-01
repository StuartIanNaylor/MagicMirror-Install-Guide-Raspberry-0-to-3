# Save my Flash
Flash memory can be written to many many times but it is limited and constant thrashing by logs or swap disks isn't actually good for flash life expectancy.
So if you wish to have a more trouble free MagicMirror then employ the following

###Log2Zram
```
git clone --single-branch --branch log2zram https://github.com/StuartIanNaylor/log2ram
cd log2ram
sudo sh log2ram.sh
```
Little bit of an update to log to ram but now you can have /var/log in a zram disk
Also gives more control of zram swaps and choice if you enable or not.

etc/log2ram.conf
```
# Configuration file for Log2Ram (https://github.com/azlux/log2ram) under MIT license. This configuration file is read 
# by the log2ram service Size for the ram folder, it defines the size the log folder will reserve into the RAM. If it's 
# not enough, log2ram will not be able to use ram. Check you /var/log size folder. The default is 40M and is basically 
# enough for a lot of applications. You will need to increase it if you have a server and a lot of log for example. 
# Above is log2ram original size increased to 80M zram. Assuming 3:1 LZO compression ram usage should be reduced to 
# 26.66M. Size is in MB
SIZE=80
# This variable can be set to true if you prefer "rsync" rather than "cp". I use the command cp -u and rsync -X, so I 
# don't copy the all folder every time for optimization. You can choose which one you want. Be sure rsync is installed 
# if you use it.
USE_RSYNC=false
# If there are some errors with available RAM space, a system mail will be send Change it to false and you will have 
# only a log if there is no place on RAM anymore.
MAIL=true
# Big cores should only be counted really but this is where you can dictate zram stream count Default is 1 and settings 
# can be edited to personal taste.
# BIG_CORES=0 Disables zram
BIG_CORES=1
# Free mem factor deb is 505 I concur that 75 is better but its open. Free mem factor is just the fraction of 
# free mem used for swap drive total Drive size = Free_Mem * mem_factor / 100 / Big_Cores
# So if you want .75 of total mem make mem_factor 75 as divided by 100 to avoid float usage
MEM_FACTOR=75
# Compression algorythm either LZ0 or LZ$
COMP_ALG=lzo
# ZLTG flag means use ZRAM ramdisk for log2ram true=enable / false=disable
ZLTG=true
# SWAP_PRI sets swap_priority of zram streams set by big_cores default=75
SWAP_PRI=75
```
```
sudo mkdir /var/log/chromium
sudo mkdir /var/log/pm2
sudo chown pi:pi /var/log/chromium
sudo chown pi:pi /var/log/pm2
```
Unfortnately you have to move the user directory of chrome to move the logs but actually this is no problem as there is a lot of dynamic writes going to your flash there.
So it actually works to use a ram disk and even better a compressed zram disk that doesn't steal as much precious memory.
Pm2 you just set log locations when you pm2 start ~/MagicMirror/installers/pm2_MagicMirror.json
So just edit pm2_MagicMirror.json
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
  "name"        : "MagicMirror",
  "script"      : "/home/pi/MagicMirror/installers/mm.sh",
  "watch"       : ["/home/pi/MagicMirror/config/config.js"],
  "error_file"      : "/var/log/pm2/err.log",
  "out_file"        : "/var/log/pm2/out.log",
  "merge_logs"      : true,
  "log_date_format" : "YYYY-MM-DD HH:mm Z"
}
```
