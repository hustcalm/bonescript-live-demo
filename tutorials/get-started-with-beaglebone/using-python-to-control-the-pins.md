originated from [Makezine](blog.makezine.com/projects/get-started-with-beaglebone/).

As you can see, using pins as digital inputs and outputs is as simple as reading and writing files in the Linux Virtual File System. This means that, without any libraries, you can use any language you’re comfortable with, as long as there’s a compiler or interpreter for that language available on the BeagleBone.

The included Ångström distribution of Linux even includes a built-in web-based development environment for Node.js called Cloud9. There’s a framework called Bonescript currently under development which can be used for accessing GPIO pins within Node.js.

However, when I started my first few programs with the BeagleBone, I decided to use Python because I was more comfortable working in Python than in Node. In my first Python script, I was working with the files manually: opening them, reading or writing them, then closing them each time I wanted to read or write a pin.

This became tedious, so I wrote a Python module called mrBBIO, which packages up all those functions into an Arduino-like syntax. It also lets you refer to the pins on the BeagleBone as their physical pin locations, so you don’t need to refer to the System Reference Manual to determine the Linux signal name for the physical pin or figure out how to change its mux setting. (I was inspired by Alexander Hiam’s pyBBIO module, which instead writes to specific memory registers to control the
pins.)

As long as your BeagleBone is connected to the internet, you can download mrBBIO directly from GitHub. To do so, first change into your home directory:

    cd ~

and then download the latest version of mrBBIO:

    git clone git://github.com/

    mrichardson23/mrBBIO.git

This will create a directory called mrBBIO. Change to that directory:

    cd mrBBIO

If you review the example code (type cat example.py to see it), you’ll see that it has setup and loop functions. Just like Arduino, the setup function runs once when the code is first executed and then the loop function runs repeatedly until the program is terminated. The setup function in this example sets pin P8.12 as an output and P8.45 as an input:

    def setup():

    pinMode(“P8.12”, OUTPUT)

    pinMode(“P8.45”, INPUT)

The loop function will be checking whether the button is pressed. When it senses that it was pressed, it will turn the LED on for 1 second and then turn it off. It will also output text to the console to indicate when the button was pressed, using an Arduino-like millis() function.

To execute the code from the command line, type:

    python example.py

and watch the LED light up when you press the button! To exit the program, type Ctrl-C. The mrBBIO module will take care of unexporting the pins for you.

If you’re eager to start experimenting on your own, you can start by using the example file as a template. Make a copy of the file:

    cp example.py test.py

and edit it in Nano (or your preferred text

editor):

    nano test.py

If you’d like, you can even use your computer’s text editor and upload the code to your BeagleBone via SFTP.
