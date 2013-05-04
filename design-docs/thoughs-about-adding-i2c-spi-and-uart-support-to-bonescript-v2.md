This is the updated version for adding I2C, SPI and UART support to Bonescript.

## Preface
This is also a draft one, need further discussions.

## I2C
### Basic Access to I2C devices
Through read/write to related files.

For example, to open BMP085, we simply do this:

	fs.writeFileSync('/sys/class/i2c-adapter/i2c-3/new_device', 'bmp085 0x77', encoding='ascii');

To read data, do this:

	fs.readFile(pfileData);

### Potential core APIs added to Bonescript
*	I2C_open_device(device_name), where device_name can be 'bmp085 0x77', here '0x77' denotes the device address
*	I2C_read(device_handle), where device_handle is the file that we will read to get data from device.
*	I2C_write(device_handle), where device_handle is the file that we will write to put data to device(EEPROM for example).
*	I2C_close_device(device_handle), where device_handle is the device that we want to close.

## SPI
### Basic Access to SPI devices
Utilize the userspace SPIDEV driver.

Follow this link [SPI on the BeagleBone using SPIDEV](http://communistcode.co.uk/blog/blogPost.php?blogPostID=1).

### Potential core APIs added to Bonescript
*	SPI_open_device(device_name);
*	SPI_read(device_handle);
*	SPI_write(device_handle);
*	SPI_close_device(device_handle);

## UART
### Basic Access to UART devices
*	setup pin MUX 
*	read/write to /dev/tty*

### Potential core APIs added to Bonescript
*	UART_setup_mux(uart_index, since there are more one UART left to user, we can choose which one to use.
*	UART_send(uart_handle, data);
*	UART_receive(uart_handle);

