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
