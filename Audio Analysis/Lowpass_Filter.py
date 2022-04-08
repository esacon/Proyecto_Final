from scipy.signal import freqz, butter, lfilter
import numpy as np
import matplotlib.pyplot as plt
import scipy.io
import scipy.io.wavfile
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


def _butter_lowpass(cut_freq, fs, order=9):
    """
    Apply the Butterworth low-pass filter to certain data.

    Parameters
    -------------

    data : array_like
            Data to be filtered.
    fs : int
            Sample frequency of the signal.
    order : int, optional
            Filter's order to be applied.

    Return
    -------------
    Butterworth response.

    """
    return butter(order, cut_freq, fs=fs, btype='low')


def _butter_lowpass_filter(data, cut_freq, fs, order=9):
    """
    Apply the Butterworth low-pass filter to certain data.

    Parameters
    -------------

    data : array_like
            Data to be filtered.
    fs : int
            Sample frequency of the signal.
    order : int, optional
            Filter's order to be applied.
    """
    b, a = _butter_lowpass(cut_freq, fs, order)
    return lfilter(b, a, data)


def filter_response():
    """
    Test the low-pass filter with different orders using Butterworth configuration.
    """
    fs = 16000.0
    cut_freq = 2250.0

    # Plot the frequency response for a few different orders.
    plt.figure(1)
    plt.clf()
    for order in [3, 6, 9, 12]:
        b, a = _butter_lowpass(cut_freq, fs, order=order)
        w, h = freqz(b, a, fs=fs, worN=2000)
        plt.plot(w, abs(h), label="order = %d" % order)

    plt.title('Low-pass filter response')
    plt.xlabel('Frequency [Hz]')
    plt.ylabel('Gain')
    plt.grid(True)
    plt.legend(loc='best')
    create_save_path(dst_folder='figs/filter/')
    plt.savefig('figs/filter/lowpass_response.png')


def filter_audio(audio, fs):
    """
    Apply a low-pass filter setted in 2250 Hz.

    Parameters
    ------------
    audio : string
            Signal to be filtered.
    fs : int
            Sample frequency of the signal.

    Return
    -----------
    time : array_like
            Vector with the duration time of the audio.
    y : array_like
            Filtered amplitude.
    """
    # Open audio file and extract fs and amplitude.
    fs, audioBuffer = scipy.io.wavfile.read(audio)
    duration = len(audioBuffer)/fs
    time = np.arange(0, duration, 1/fs)

    # Low-pass filter applied to .wav audio.
    y = _butter_lowpass_filter(audioBuffer, 2250.0, fs, order=9)

    # Plot original and filtered audio.
    fig, ax = plt.subplots(2, figsize=(10, 7))
    fig.suptitle('Audio signal')
    ax[0].plot(time, audioBuffer, 'k', label='Signal')
    ax[1].plot(time, y, 'g', label='Filtered signal')

    for ax in fig.get_axes():
        ax.set_xlabel('Time [s]')
        ax.set_ylabel('Amplitude [mV]')
        ax.grid(True)
        ax.axis('tight')
        ax.legend(loc='upper left')

    # Save plot of the filtered audio.
    create_save_path(dst_folder='figs/filter/')
    fig_name = audio.split('/')[1].replace('_output.wav', '_filtered.png')
    plt.savefig(f'figs/filter/{fig_name}')       
    return time, y

if __name__ == "__main__":
    # filter_response()
    filter_audio(audio='new_audio/audio1_output.wav', fs=16000.0)