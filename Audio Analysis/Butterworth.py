from scipy.signal import freqz, butter, lfilter
import numpy as np
import matplotlib.pyplot as plt
import scipy.io
import scipy.io.wavfile
import os

CUT_FREQ = 2250.0

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


def butterworth_filter(data, cut_freq, fs, order=9, ftype='low'):
    """
    Apply the Butterworth low-pass filter to certain data.

    Parameters
    -------------
    data : array_like
            Data to be filtered.
    cut_freq : array_like
            The critical frequency or frequencies. For lowpass and highpass 
            filters, Wn is a scalar; for bandpass and bandstop filters, 
            Wn is a length-2 sequence.
    fs : int
            Sample frequency of the signal.
    order : int, optional
            Filter's order to be applied.
    ftype : string, optional
            Filter's type. Default 'lowpass'.

    Return
    -------------
    lfilter : array_like
            The output of the digital filter.
    """
    b, a = butter(order, cut_freq, fs=fs, btype=ftype)
    return lfilter(b, a, data)


def filter_response(fs=16000.0, cut_freq=CUT_FREQ, ftype='low'):
    """
    Test the low-pass filter with different orders using Butterworth configuration.

    Parameters
    -------------
    fs : int
            Sample frequency of the signal.
    cut_freq : array_like
            The critical frequency or frequencies. For lowpass and highpass 
            filters, Wn is a scalar; for bandpass and bandstop filters, 
            Wn is a length-2 sequence.
    ftype : string, optional
            Filter's type. Default 'lowpass'.
    """
    # Plot the frequency response for a few different orders.
    plt.figure(1)
    plt.clf()
    for order in [3, 6, 9]:
        b, a = butter(order, cut_freq, fs=fs, btype=ftype)
        w, h = freqz(b, a, fs=fs, worN=2000)
        plt.plot(w, abs(h), label="order = %d" % order)

    plt.title(f'{ftype}-pass filter response')
    plt.xlabel('Frequency [Hz]')
    plt.ylabel('Gain')
    plt.grid(True)
    plt.legend(loc='best')
    create_save_path(dst_folder='figs/filter/')
    plt.savefig(f'figs/filter/{ftype}pass_response.png')


def filter_audio(fs, audio="", time=[], amp=[], cut_freq=CUT_FREQ, ftype='low', plot=True):
    """
    Apply a low-pass filter setted in 2250 Hz.

    Parameters
    ------------
    fs : int
            Sample frequency of the signal.
    audio : string, optional
            Signal to be filtered.
    time : array_like, optional
            Time array of the signal.
    amp : array_like, optional
            Amplitud of the signal.
    cut_freq : array_like, optional
            The critical frequency or frequencies. For lowpass and highpass 
            filters, Wn is a scalar; for bandpass and bandstop filters, 
            Wn is a length-2 sequence.
    ftype : string, optional, optional
            Filter's type. Default 'lowpass'.
    plot : boolean, optional
            True for saving the plot.

    Return
    -----------
    time : array_like
            Vector with the duration time of the audio.
    y : array_like
            Filtered amplitude.
    """
    if audio != "":
        # Open audio file and extract fs and amplitude.
        fs, amp = scipy.io.wavfile.read(audio)
        duration = len(amp)/fs
        time = np.arange(0, duration, 1/fs)
        fig_name = audio.split('/')[1].replace('_output.wav', '_filtered.png')
    elif amp != []:
        fig_name = 'filtered_envelope.png'
    else:
        return

    # Filter applied to .wav audio.
    y = butterworth_filter(amp, cut_freq, fs, order=9, ftype=ftype)

    if plot:
        # Plot original and filtered audio.
        fig, ax = plt.subplots(2, figsize=(10, 7))
        fig.suptitle('Audio signal')
        ax[0].plot(time, amp, 'k', label='Signal')
        ax[1].plot(time, y, 'g', label='Filtered signal')

        for ax in fig.get_axes():
                ax.set_xlabel('Time [s]')
                ax.set_ylabel('Amplitude [mV]')
                ax.grid(True)
                ax.axis('tight')
                ax.legend(loc='upper right')

        # Save plot of the filtered audio.
        create_save_path(dst_folder='figs/filter/')
        plt.savefig(f'figs/filter/{fig_name}')       
    return time, y

if __name__ == "__main__":
    # filter_response()
    filter_audio(audio='new_audio/audio1_output.wav', fs=16000.0)