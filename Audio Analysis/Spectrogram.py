import librosa
import librosa.display
import numpy as np
from matplotlib import pyplot as plt
import os


def create_save_path(dst_folder='figs/'):
    """
    Create a folder to save all audios converted to mono and resampled to 16000 Hz.

    Parameters
    ------------
    dst_folder : string, optional
            Destination folder where files will be saved.
    """
    if not os.path.exists(os.path.dirname(dst_folder)):
        os.makedirs(os.path.dirname(dst_folder))


def plot_spectrogram(audio):
    """
    Plot a spectogram of certain audio.
    
    Parameters
    ------------
    audio : string
            Location where spectogram is located.

    """
    y, sr = librosa.load(audio, sr=16000)
    d = librosa.stft(y)
    s_db = librosa.amplitude_to_db(abs(d), ref=np.max)
    plt.figure(figsize=(10, 6))
    librosa.display.specshow(s_db, sr = sr, x_axis = 'time', y_axis = 'log')
    plt.colorbar()   
    fig_name = audio.split('/')[1].replace('_output.wav', '_spectrogram.png')
    create_save_path(dst_folder='figs/spectogram/')
    plt.savefig(f'figs/spectogram/{fig_name}')


def convert_all_audios(path=f'{os.getcwd()}\\audios_mono'):
    """
    When desired, plot a spectogram of each the .wav audio file available in certain folder.
    
    Parameters
    ------------
    path : string, optional
            Path where all audios are located.
    """
    # List the files ending in .wav.
    audio_files = [file for file in os.listdir(path) if file.endswith('.wav')]

    for audio in audio_files:
        plot_spectrogram(audio)


if __name__ == '__main__':
    convert_all_audios()
