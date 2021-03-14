#!/bin/bash
PROXY=('9050' '9052' '9053' '9054' '9055' '9056' '9057' '9058' '9059' '9060')
if [ -f '/etc/tor/torrc' ]; then
    for port in "${PROXY[@]}"
    do
        sudo echo "SocksPort $port" >> /etc/tor/torrc
    done
    sudo tail /etc/tor/torrc
    sudo /etc/init.d/tor restart
else
    echo "File not exists"
fi
