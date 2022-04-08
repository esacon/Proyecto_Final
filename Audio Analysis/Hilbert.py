import numpy as np
import matplotlib.pyplot as plt
import scipy.io
import scipy.io.wavfile
import os
from scipy.signal import hilbert


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


def _save_fig(time, amplitude1, amplitude2):
    """
    Save the Hilbert transform figure.

    Parameters
    ------------
    time : array_like
            Time to be plotted.
    amplitud1 : array_like
            Amplitud of the original signal.
    amplitud2 : array_like
            Amplitud of the envelope.
    """
    plt.figure(figsize=(10, 7))
    plt.plot(time, amplitude1, 'k', label='Signal')
    plt.plot(time, amplitude2, 'r', label='Envelope')
    plt.title('Hilbert Transform')
    plt.xlabel('Time [s]')
    plt.ylabel('Amplitude [mV]')
    plt.grid(True)
    plt.axis('tight')
    plt.legend(loc='upper left')

    create_save_path(dst_folder='figs/hilbert/')
    plt.savefig('figs/hilbert/envelope.png') 


def envelope(time, amplitude, fs=16000):
    """
    Extract the envelope using the Hilbert's transform and save it into a figure.


    Parameters
    ------------
    time : array_like
            Time to be plotted.
    amplitud : array_like
            Amplitud of the original signal.
    fs : int
            Sample frequency of the signal.
    """
    z = hilbert(amplitude)
    amplitude_envelope = np.abs(z)
    inst_phase = np.unwrap(np.angle(z))
    inst_freq = np.diff(inst_phase)/(2*np.pi)*fs

    # Plot envelope
    _save_fig(time, amplitude, amplitude_envelope)


def main():
    """
    Main method to test the functions described above.
    """
    audio = 'mono_audio/audio1_output.wav'
    fs, audioBuffer = scipy.io.wavfile.read(audio)
    duration = len(audioBuffer)/fs
    time = np.arange(0, duration, 1/fs)

    envelope(time, audioBuffer, fs)

if __name__ == '__main__':
    main()