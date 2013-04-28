Originated from [Makezine](http://blog.makezine.com/projects/get-started-with-beaglebone/).

## Get set up via Ethernet

*   Your BeagleBone comes with a MicroSD card preloaded with a customized version of the Ångström distribution of Linux. Since development on this distribution happens rapidly, you’ll want to update to the latest version, available at beagleboard.org.

*   To access the BeagleBone to upload code, you can connect to it over the Ethernet port with SSH, or you can connect it directly to your computer’s USB port. Since we’ll be downloading a few files onto the board directly from the internet, let’s connect to the BeagleBone via Ethernet.

*   With the MicroSD card inserted, connect the BeagleBone to your router via Ethernet and plug in a 5V power supply to the BeagleBone.

## Open a terminal and ssh to beaglebone

*   On a Mac or Linux box, open a terminal window and type ssh root@beaglebone.local.

*   On a Windows PC, download PuTTY and open it. Enter beaglebone.local as the host address, making sure the SSH button is selected, and press Open. When it shows you the prompt login as:, type root and press Enter.

*   If the address beaglebone.local doesn’t work, try using the IP address of the board instead. Find your BeagleBone’s IP address by logging into your router and looking for “beaglebone” on the DHCP clients list.

## See beaglebone in your terminal or ssh client

*   The first time you connect, your SSH client may warn you that the host is unknown. It’s OK to dismiss this message.

*   There’s no password by default, so just hit Enter. You know you’re connected when you see the root@beaglebone:~# prompt.

## Output vias GPIO Pins: Light an LED

*   Before we get into writing code, let’s look at how to do basic digital pin control from the Linux command line. Once we understand how the Linux kernel uses a virtual file system to read and write pins, it makes programming the BeagleBone much easier.

*   It’s also possible to read and write specific memory registers to access the pins, but that method is more advanced.

*   Output via GPIO Pins: Light an LED — A great way to get to know a new platform is simply getting an LED to light up, so let’s wire up an LED.

*   The BeagleBone has 2 main sets of headers, each with 46 pins. One header is labeled “P8” and the other is labeled “P9.” Only the end pins are labeled, so you’ll have to count pins from the ends to determine the pin you want to access. Put a jumper wire in one of the ground pins, which are pins 1 and 2 of header P8 and P9.

*   We’ll connect our LED to pin 12 on header P8. Put another jumper in that pin, counting off even numbers from pin 2.

*   On a breadboard, connect the cathode (–) of an LED to ground and the anode (+) to pin 12 on header P8 through a current-limiting resistor (any value between 50Ω and 100Ω should do).

*   Figure out the Linux GPIO signal number for pin 12 on P8 (see Deriving the Linux GPIO Signal Number in the conclusion).

## Controlling Pins from the commandline

*   Now that we know which pin number to use within Linux and we’ve set it to GPIO mode (pin 12 defaults to GPIO mode), let’s use the command line to control the pin.

*   On the command line, change to the gpio directory: cd /sys/class/gpio

*   When you list the contents of the directory with the command ls you’ll notice there’s no folder for GPIO signal 44. That’s because first we need to export the pin to “user space” so that we can control it. To do that, write the number 44 to the export file: echo 44 > export

*   Now when you type ls you’ll see the directory gpio44. Change to that directory: cd gpio44

*   Since we’re trying to control an LED, we’ll need to set the pin as an output by writing the word out to pin 44’s direction file: echo out > direction

*   Now we’re ready to set the pin high to illuminate the LED. Write 1 to the value file: echo 1 > value

## Input via GPIO Pins: Read a Button

*   Input via GPIO Pins: Read a Button—Using the GPIO pins as an input is just as easy. Here’s how to tell the BeagleBone to read a pushbutton switch.

*   Wire up a momentary pushbutton to pin 45 on header P8 with a 10K pull-down resistor. Connect the other side of the button to 3.3V source on header P9 pins 3 or 4.

*   First, we must export the pin to the user space and change to its directory. Since pin 45 on header P8 is GPIO2_6, we’ll export pin gpio70: echo 70 > /sys/class/gpio/export cd /sys/class/gpio/gpio70

*   Set the pin direction as an input: echo in > direction

*   Now instead of writing the value file, we’ll read it: cat value

*   This should return 0 for a low pin. Now press and hold the button while you execute the cat value command again. If you have the button wired up correctly, you should now see a 1, indicating the pin is high.

*   When you’re done with the pins, be sure to unexport them from the userspace: echo 44 > /sys/class/gpio/unexport and echo 70 > /sys/class/gpio/unexport
