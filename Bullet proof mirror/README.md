#Bullet proof mirror and how to enable the pi watch dog.

The pi has a watchdog timer circuit built into it that is a prety reasonable means of detecting crashes and forcing an automated reboot.

So first we need to enable it.

First enable watchdog from /boot/config.txt, adding the following line:
```
dtparam=watchdog=on

# Then install watchdog service:
sudo apt install watchdog

#Uncomment the following line from /etc/watchdog.conf

# Uncomment to enable test. Setting one of these values to '0' disables it.
# These values will hopefully never reboot your machine during normal use
# (if your machine is really hung, the loadavg will go much higher than 25)
max-load-1		= 24
max-load-5		= 18
max-load-15		= 12
#
...
watchdog-device	= /dev/watchdog
```
So basically constant loads and watchdog will kick in not sure what the time base is think its seconds but the above does the job.
Then do a reboot and we can check its running by searching the syslog in /var/log for 'watchdog'
But how do we know its working? We can test with a fork bomb and overload the Pi.
If you have done an OC (Over Clock) on your pi do not run this and for anyone this test is your own decision.
I have to say that but yeah you know.

So what we will do is turn off all the swap so the test ends quicker and it doesn't thrash your flash.
```
sudo swapoff -a

nano pythonbomb.py
#
import os

while(1):
     os.fork()
```
So we found that watchdog is running in the syslog and now to test.
python3 pythonbomb.py

Doesn't take long to swamp the system that one 
The time base has me confused as its very quick to react on a load test but pretty sure the ping test is a minute.
Its good how it is and the default values seem to work well as the highest I have ever seen my pi is just above 3
Ping test I tried this by putting in the IP of my desktop 192.168.1.16 which is local but then I just shut down.
And right enough after a minute my computer was no longer available the pi restarted.

The only thing I am worried about and I guess this is true that you could enter an IP that may never exist and turn your pi into a rotating boot.
Time to put the SD card in a reader and edit your files and remove that watchdog test on another computer I guess.
If you don't have an overzealous internal firewall that putting in your router ip 192.168.1.1 with me would make a good WiFi watchdog
Then maybe a internet IP like googles main DNS of 8.8.8.8 might but not sure if you constanty pinging that you may get filtered.
8.8.8.8 is usually what many use just never set up a perm watchdog so honestly can not say bbc.co.uk - 212.58.253.67 did actually take that service down and got bombarded by sysadmins to re-instate and its prob the UK's unofficial official ping test.


etc/watchdog.conf is a standard linux watchdog file http://www.sat.dundee.ac.uk/psc/watchdog/watchdog-configure.html
So you can read up on these.
https://manpages.debian.org/stretch/watchdog/watchdog.8.en.html

