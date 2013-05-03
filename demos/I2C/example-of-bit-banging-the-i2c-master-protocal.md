Blow is an example of [bit-banging](http://en.wikipedia.org/wiki/Bit_banging) the I2C protocal as an I2C master. The example is written in pseudo C. It illustrates all of the I2C features described before(clock stretching, arbitration, start/stop bit, ack/nack).

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
