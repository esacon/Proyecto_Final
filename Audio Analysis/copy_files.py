import os
import shutil

PATH = r'C:\Users\Enrique Niebles\Downloads\ICBHI_final_database'
DST_PATH = r'C:\Users\Enrique Niebles\Documents\Proyecto Final\Despliegue\Audio Analysis\audios'

files = [file for file in os.listdir(PATH) if file.endswith('_Tc_mc_AKGC417L.wav')]

for file in files:
    act_file = f'{PATH}\{file}'
    new_file = f'{DST_PATH}\{file}'
    shutil.copy2(act_file, new_file)
    