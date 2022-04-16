import os
import Audio2mono as mono
import Spectrogram as sp
import Butterworth as bfilter
import Hilbert as hilbert
import numpy as np
from scipy import signal
from scipy.signal import find_peaks
from matplotlib import pyplot as plt

THRESHOLD = 0.5
CUT_FREQ = [250, 2500] # From 250 to 2500 Hz.


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

def save_results(time, amp, fig_name):
    audio_length = round(max(time))
    peaks, _ = find_peaks(amp, height=THRESHOLD, distance=len(time)/audio_length)
    n_peaks = len(amp[peaks])
    bps = n_peaks/audio_length
    bpm = bps*60
    print(audio_length, n_peaks, bps, bpm)
    plt.figure(figsize=(10,7))
    plt.plot(time, amp, 'g-', label='Signal envelope')
    plt.plot(time, [THRESHOLD]*len(amp), 'm--', label=f'Threshold={THRESHOLD}')
    plt.plot(time[peaks], amp[peaks], "rh", linewidth=2, label=f'{n_peaks} Peaks')
    plt.title(f'Breaths per minute = {bpm}')
    plt.xlabel('Time [s]')
    plt.ylabel('Normalized Amplitud')
    plt.legend(loc='upper right')
    plt.grid()
    create_save_path(dst_folder='figs/results/')
    plt.savefig(f'figs/results/{fig_name}')  


if __name__ == '__main__':
    audio = 'audios/133_2p3_Tc_mc_AKGC417L.wav'
    # Convert to mono @16kHz.
    mono.create_save_path('audios_mono/')
    audio_mono, fs = mono.convert_to_mono(audio=audio, freq=16000, dst_folder='audios_mono/')
    # Plot spectogram.
    sp.create_save_path('figs/spectogram/')
    sp.plot_spectrogram(audio_mono)
    # Filter audio to [250-2500] Hz (Band-pass filter).
    bfilter.filter_response(fs=fs, cut_freq=CUT_FREQ, ftype='band')
    time, amplitude = bfilter.filter_audio(audio=audio_mono, cut_freq=CUT_FREQ, fs=16000, ftype='band')
    # Zero holder re-sampling
    sampled_signal = signal.resample(amplitude, 700)
    sampled_time = np.linspace(min(time), max(time), 700, endpoint=False)
    # Hilbert envelope.
    fig_name = audio.replace('audios/', '').replace('.wav', '_envelope.png')
    time, amp = hilbert.envelope(time, amplitude, fs=CUT_FREQ[1], fig_name=fig_name)
    # Lowpass filter
    time, amp = bfilter.filter_audio(time=time, amp=amp, cut_freq=CUT_FREQ[0], fs=CUT_FREQ[1], plot=False)
    # Save results
    fig_name = fig_name.replace('envelope', 'results')
    save_results(time, amp, fig_name=fig_name)

