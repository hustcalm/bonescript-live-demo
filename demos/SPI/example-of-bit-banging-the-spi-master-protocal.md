Below is an example of [bit-banging](http://en.wikipedia.org/wiki/Bit-banging) the SPI protocol as an SPI master with CPOL=0, CPHA=0, and eight bits per transfer. The example is written in the C programming language. Because this is CPOL=0 the clock must be pulled low before the chip select is activated. The chip select line must be activated, which normally means being toggled low, for the peripheral before the start of the transfer, and then deactivated afterwards. Most peripherals allow or require several transfers while the select line is low; this routine might be called several times before deselecting the chip.

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
