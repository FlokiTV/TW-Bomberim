#@title SETUP
import os
from pathlib import Path
from google.colab import drive
from IPython.display import clear_output
!apt install screen unzip
# !wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
# !dpkg --install google-chrome-stable_current_amd64.deb
# !apt install --assume-yes --fix-broken
!apt install chromium-chromedriver
!apt install tor
clear_output()

# drive.mount('/content/drive')
!apt install chromium-chromedriver
!npm i puppeteer-core cheerio
clear_output()

print("""

████████╗██╗    ██╗    ██████╗  ██████╗ ███╗   ███╗██████╗ ███████╗██████╗ ██╗███╗   ███╗
╚══██╔══╝██║    ██║    ██╔══██╗██╔═══██╗████╗ ████║██╔══██╗██╔════╝██╔══██╗██║████╗ ████║
   ██║   ██║ █╗ ██║    ██████╔╝██║   ██║██╔████╔██║██████╔╝█████╗  ██████╔╝██║██╔████╔██║
   ██║   ██║███╗██║    ██╔══██╗██║   ██║██║╚██╔╝██║██╔══██╗██╔══╝  ██╔══██╗██║██║╚██╔╝██║
   ██║   ╚███╔███╔╝    ██████╔╝╚██████╔╝██║ ╚═╝ ██║██████╔╝███████╗██║  ██║██║██║ ╚═╝ ██║
   ╚═╝    ╚══╝╚══╝     ╚═════╝  ╚═════╝ ╚═╝     ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝╚═╝     ╚═╝                                                                                 
    __     __ _                                               __      ___      
   / /__  / /( )_____   ____ _____     _________  ____ ___  _/_/ ____/ (_)___ _
  / / _ \/ __/// ___/  / __ `/ __ \   / ___/ __ \/ __ `__ \/ _ \/ __  / / __ `/
 / /  __/ /_  (__  )  / /_/ / /_/ /  / /__/ /_/ / / / / / /  __/ /_/ / / /_/ / 
/_/\___/\__/ /____/   \__, /\____/   \___/\____/_/ /_/ /_/\___/\__,_/_/\__,_/  
                     /____/                                                    
""")
