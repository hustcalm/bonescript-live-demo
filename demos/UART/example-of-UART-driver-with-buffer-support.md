Below are example routines of the UART driver.

    // Hardware-specific support functions that MUST be customized:
    #define BAUDRATE 19200
    void UART_init(void);
    void UART_set_baudrate(unsigned int baudrate);
    void UART_init_buffers(void);
    void UART_send_byte(unsigned char byte);
    unsigned char UART_receive_byte();
