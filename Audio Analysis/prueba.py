from cProfile import label
import Audio2mono as mono
import Butterworth as bfilter
import Hilbert as hilbert
import numpy as np
from matplotlib import pyplot as plt
from scipy import signal
from scipy.signal import find_peaks


th=0.5

audio = 'audios_mono/prueba_mono.wav'
# Filter audio to [250-2500] Hz (Band-pass filter).
time, amplitude = bfilter.filter_audio(audio=audio, cut_freq=[250, 2500], fs=16000, ftype='band', plot=False)
# Zero holder re-sampling
sampled_signal = signal.resample(amplitude, 700)
sampled_time = np.linspace(min(time), max(time), 700, endpoint=False)
# Hilbert envelope.
time, amp = hilbert.envelope(time, amplitude, fs=2500, plot=False)
# Lowpass filter
time, amp = bfilter.filter_audio(time=time, amp=amp, cut_freq=300, fs=2500, plot=False)