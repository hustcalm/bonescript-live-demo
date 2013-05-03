In this doc, I will focus on talking about adding I2C, SPI and UART support to Bonescript.

## Preface
[Bonescript](https://github.com/jadonk/bonescript) has come with a bunch of APIs but limited to low level I/O operation, to provide higher-order services that utilize the standard peripherals for their intended use, we try to implement I2C, SPI and UART here and we will make use the very basic infrastructure already armed with Bonesrcipt,especially the GPIO APIs.

**Below I will take an overview of these protocals, provide some implementaion references and give the core routines to be implemented in Bonescript.**

## I2C
### Learning I2C Protocal
* [wikipedia](http://en.wikipedia.org/wiki/I%C2%B2C)
* [Using the I2C Bus](http://www.robot-electronics.co.uk/acatalog/I2C_Tutorial.html)

### Protocal Implementation Specification
* [Software Implementation of I2C Master](https://www.engr.usask.ca/classes/EE/331/AN554.pdf)
* [How to Implement I2C Serial Comunication Using Intel MCS-51 Microcontrollers](http://electro8051.free.fr/I2C/27231901.pdf)

### Beaglebone Interface
* Has dedicated I/O for I2C on expansion connectors.

### Core routines to be implemented in Bonescript

    // Hardware-specific support functions that MUST be customized:
    #define I2CSPEED 100
    void I2C_delay() { volatile int v; int i; for (i=0; i < I2CSPEED/2; i++) v; }
    bool read_SCL(void); // Set SCL as input and return current level of line, 0 or 1
    bool read_SDA(void); // Set SDA as input and return current level of line, 0 or 1
    void clear_SCL(void); // Actively drive SCL signal low
    void clear_SDA(void); // Actively drive SDA signal low
    void arbitration_lost(void);
   
    bool started = false; // global data
    void i2c_start_cond(void) {
      if (started) { // if started, do a restart cond
        // set SDA to 1
        read_SDA();
        I2C_delay();
        while (read_SCL() == 0) {  // Clock stretching
          // You should add timeout to this loop
        }
        // Repeated start setup time, minimum 4.7us
        I2C_delay();
      }
      if (read_SDA() == 0) {
        arbitration_lost();
      }
      // SCL is high, set SDA from 1 to 0.
      clear_SDA();
      I2C_delay();
      clear_SCL();
      started = true;
    }
   
    void i2c_stop_cond(void){
      // set SDA to 0
      clear_SDA();
      I2C_delay();
      // Clock stretching
      while (read_SCL() == 0) {
        // add timeout to this loop.
      }
      // Stop bit setup time, minimum 4us
      I2C_delay();
      // SCL is high, set SDA from 0 to 1
      if (read_SDA() == 0) {
        arbitration_lost();
      }
      I2C_delay();
      started = false;
    }
   
    // Write a bit to I2C bus
    void i2c_write_bit(bool bit) {
      if (bit) {
        read_SDA();
      } else {
        clear_SDA();
      }
      I2C_delay();
      while (read_SCL() == 0) { // Clock stretching
        // You should add timeout to this loop
      }
      // SCL is high, now data is valid
      // If SDA is high, check that nobody else is driving SDA
      if (bit && read_SDA() == 0) {
        arbitration_lost();
      }
      I2C_delay();
      clear_SCL();
    }
   
    // Read a bit from I2C bus
    bool i2c_read_bit(void) {
      bool bit;
      // Let the slave drive data
      read_SDA();
      I2C_delay();
      while (read_SCL() == 0) { // Clock stretching
        // You should add timeout to this loop
      }
      // SCL is high, now data is valid
      bit = read_SDA();
      I2C_delay();
      clear_SCL();
      return bit;
    }
   
    // Write a byte to I2C bus. Return 0 if ack by the slave.
    bool i2c_write_byte(bool send_start,
            bool send_stop,
            unsigned char byte) {
      unsigned bit;
      bool nack;
      if (send_start) {
        i2c_start_cond();
      }
      for (bit = 0; bit < 8; bit++) {
        i2c_write_bit((byte & 0x80) != 0);
        byte <<= 1;
      }
      nack = i2c_read_bit();
      if (send_stop) {
        i2c_stop_cond();
      }
      return nack;
    }
   
    // Read a byte from I2C bus
    unsigned char i2c_read_byte(bool nack, bool send_stop) {
      unsigned char byte = 0;
      unsigned bit;
      for (bit = 0; bit < 8; bit++) {
        byte = (byte << 1) | i2c_read_bit();
      }
      i2c_write_bit(nack);
      if (send_stop) {
        i2c_stop_cond();
      }
      return byte;
    }


## SPI
### Learning SPI Protocal
* [wikipedia](http://en.wikipedia.org/wiki/Serial_Peripheral_Interface_Bus)
* [Introduction to I2C and SPI protocols](http://www.byteparadigm.com/applications/introduction-to-i2c-and-spi-protocols/)

### Application Notes on Implementing SPI Protocal
* [Implementing SPI Master and Slave Functionality Using the Z8 Encore! F083A](www.zilog.com/docs/z8encore/appnotes/AN0267.pdf)
* [Software SPI Master Implementation From ATMEL](www.atmel.com/Images/DOC1155.PDF)
* [C-Code Software Routines for Using the SPI Interface on the MAX7456 On-Screen Display](http://www.maximintegrated.com/app-notes/index.mvp/id/4184)

### SPI Routines Reference
* [SPI Driver Routines from RL-ARM's User's Guide](http://www.keil.com/support/man/docs/rlarm/rlarm_fs_func_spi.htm)

### Beaglebone Interface
* Has dedicated I/O for SPI on expansion connectors.

### Core routines to be implemented in Bonescript

    // Hardware-specific support functions that MUST be customized:
    #define SPISPEED 100
    void SPI_init(void);
    void SPI_delay() {volatile int v; int i; for (i = 0; i < SPISPEED/2; i++) v; }
    void set_GPHA(unsigned char value);
    void set_GPOL(unsigned char value);
    void set_CLK(void);
    void clr_CLK(void);
    void set_MOSI(void);
    void clr_MOSI(void);

    /* return: 0 is OK, */
    unsigned char SPI_write_byte(unsigned char byte)
    {       
      unsigned char bit;
   
      /* Negative clock polarity */
      set_GPHA(0); 
      /* Data are propagated on a falling edge (high->low clock transition). */
      set_GPOL(0);
   
      for (bit = 0; bit < 8; bit++) {
          /* delay between raise of clock */
          SPI_dealy(SPISPEED/2);
   
          set_CLK();
   
          /* delay between fall of clock */
          /* gives the h/w time to setup MISO line */
          SPI_delay(SPISPEED - (SPISPEED/2));
   
          clr_CLK();
   
          /* write MOSI on falling edge of previous clock */
          if (byte & 0x80)
              set_MOSI();
          else
              clr_MOSI();
          byte <<= 1;   
      }
   
      return byte;
    }

    unsigned char SPI_read_byte()
    {
      unsigned char bit;

      /* Negative clock polarity */
      set_GPHA(0);
      /* Data are propagted on a falling edge (high->low clock transition). */
      set_GPOL(0);

    for (bit = 0; bit < 8; bit++) {
      /* delay between raise of clock */
      SPI_delay(SPISPEED/2);
      
      set_CLK();

      /* delay between fall of clock */
      /* gives the h/w time to setup MISO line */
      SPI_delay(SPISPEED - (SPISPEED/2));

      clr_CLK();

      tdata = tdata << 1;
      if(MISO == 1)
        tdata = tdata | 0x01;
      else
        tdata = tdata & 0xfe;
      }
    return tdata;
    }

## UART
### Learning UART Protocal
* [widipedia](http://en.wikipedia.org/wiki/Universal_asynchronous_receiver/transmitter)

### Application Notes on Utilizing UART Protocal
* [Using the Universal Asynchronous Receiver Transmitter(UART) eTPU Function](www.freescale.com/files/32bit/doc/app_note/AN2853.pdf)
* [Application Note - Standardized UART Protocal (with OSRAM extensions)](www.osram.com/.../standardized-uart-protocol,-version-3.3,-13.06.2008.pdf)

### UART Rountines Reference
* [UART driver with buffer support from Stanford](https://ccrma.stanford.edu/courses/250a-fall-2002/docs/avrlib/uart_8c-source.html)
* [Software UART](http://code.google.com/p/uniboard/wiki/Software_UART)

### Beaglebone Interface
* Has decicated I/O for UART on expansion connectors.

### Core routines to be implemented in Bonescript

    // Hardware-specific support functions that MUST be customized:
    #define BAUDRATE 19200
    void UART_init(void);
    void UART_set_baudrate(unsigned int baudrate);
    void UART_init_buffers(void);
    void UART_send_byte(unsigned char byte);
    unsigned char UART_receive_byte();

