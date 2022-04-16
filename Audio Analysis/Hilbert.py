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


def _save_fig(time, amplitude, fig_name):
    """
    Save the Hilbert transform figure.

    Parameters
    ------------
    time : array_like
            Time to be plotted.
    amplitude : array_like
            Amplitud of the envelope.
    fig_name : string
            Name of figure.
    """
    plt.figure(figsize=(10, 7))
    plt.plot(time, amplitude, 'g', label='Envelope')
    plt.title('Hilbert Transform')
    plt.xlabel('Time [s]')
    plt.ylabel('Amplitude [mV]')
    plt.grid(True)
    plt.axis('tight')
    plt.legend(loc='upper right')

    create_save_path(dst_folder='figs/hilbert/')
    plt.savefig(f'figs/hilbert/{fig_name}') 


def envelope(time, signal, fs=16000, fig_name='envelope.png', plot=True):
    """
    Extract the envelope using the Hilbert's transform and save it into a figure.


    Parameters
    ------------
    time : array_like
            Time to be plotted.
    signal : array_like
            Amplitud of the original signal.
    fs : int
            Sample frequency of the signal.
    fig_name : string, optional
            Name of figure.
    plot : boolean, optional
            True for saving the plot.
            
    Return
    -----------
    time : array_like
            Vector with the duration time of the audio.
    amplitude_envelope : array_like
            Normalized [0 1]-envelope amplitude.
    """
    analytic_signal = hilbert(signal)
    amplitude_envelope = np.abs(analytic_signal)
    amp_min, amp_max = np.min(amplitude_envelope), np.max(amplitude_envelope)
    amp_norm = list(map(lambda x: (x - amp_min) / (amp_max - amp_min), amplitude_envelope))
    inst_phase = np.unwrap(np.angle(amp_norm))
    inst_freq = np.diff(inst_phase)/(2*np.pi)*fs

    # Plot envelope
    if plot:
        _save_fig(time, amp_norm, fig_name)
    return time, amp_norm


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