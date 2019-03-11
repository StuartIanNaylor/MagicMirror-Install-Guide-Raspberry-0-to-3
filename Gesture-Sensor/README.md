# Gesture-Sensor APDS9960

Raspbian already comes ready to roll with I2C as i2cdetect -y 1 should show something like the following.

```
     0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f
00:          -- -- -- -- -- -- -- -- -- -- -- -- --
10: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
20: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
30: -- -- -- -- -- -- -- -- -- 39 -- -- -- -- -- --
40: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
50: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
60: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
```

![Rpi Pinout](https://pinout.xyz/resources/raspberry-pi-pinout.png)

The pi has 2 I2C buses I2C1 is commonly used as the above command checks I2C0 would be i2cdetect -y 1

Same with as i2cdetect python3-smbus is ready to roll and a good start is:-
https://learn.sparkfun.com/tutorials/python-programming-tutorial-getting-started-with-the-raspberry-pi/experiment-4-i2c-temperature-sensor

