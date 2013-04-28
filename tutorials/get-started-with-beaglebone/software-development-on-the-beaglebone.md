Originated from [elinux](http://elinux.org/BeagleBone).

Software development on the BeagleBone is normally no different to any other Linux platform, and typically varies with language and with the IDE used, if any. This section deals only with development issues that are specific to BeagleBone, or mostly so. 

## Cloud9 IDE and Bonescript
*   [Source repository](https://github.com/jadonk/bonescript)
*   [Language documentation](http://nodejs.org/)

## Getting started with JTAG and CSS
JTAG is a powerful tool to debug low level software. Your beaglebone is equipped with a built-in JTAG emulator providing connectivity over the same USB cable that powers the board, eliminating the need to buy expensive JTAG debugging hardware.

Code Composer Studio is a popular debugger based on eclipse that provides you with a complete IDE experience. These are simple instructions to get Code Composer Studio v5.1 up and running with your beaglebone.

*   [Config and begin debugging](http://beagleboard.org/static/beaglebone/a3/Docs/ccs-jtag-simple.htm)

## Using Netbeans to remotely compile and debug C/C++
When developing c/c++ on a linux desktop, a toolchain is available for cross-compiling the code for arm. However no such toolchain is readily available for windows. Netbeans can be used to write the code on your desktop, save it in a location accessible to the beagle, and then automatically compile it on the beagle itself using ssh and the built in compiler on the beaglebone's OS.

Netbeans can also use GDB for remote debugging over ssh.

Requirements: 
*   Set up a samba / smb network share through which code can be shared between both desktop and beagle
*   Give netbeans the SSh login details of the beagle
*   Give netbeans the path mapping so it can translate between the desktop code folder and beagle code folder
*   Setup only takes a few minutes. 

Useful links:
*   [Download Netbeans](http://www.netbeans.org/)
*   [Example tutorial on setting this up](http://www.netbeans.org/)

