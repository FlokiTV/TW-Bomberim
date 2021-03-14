#!/bin/bash
sudo apt install curl
curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
sudo apt update -y && sudo apt upgrade -y
sudo apt install -y tor
sudo apt -y install screen nodejs unzip
#sudo apt -y install chromium-browser chromium-chromedriver
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt install -y -f ./google-chrome-stable_current_amd64.deb
npm i puppeteer-core cheerio
