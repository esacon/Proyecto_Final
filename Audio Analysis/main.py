import Audio2mono as mono
import Spectrogram as sp
import Lowpass_Filter as lowpass
import Hilbert as hilbert


if __name__ == '__main__':
    audio = 'audios/copd.wav'
    # Convert to mono.
    mono.create_save_path('audios_mono/')
    audio_mono = mono.convert_to_mono(audio=audio, dst_folder='audios_mono/')
    # Plot spectogram.
    sp.create_save_path('figs/spectogram/')
    sp.plot_spectrogram(audio_mono)
    # Filter audio to 2500 Hz.
    lowpass.filter_response()
    time, amplitude = lowpass.filter_audio(audio_mono, fs=16000.0)
    # Hilbert envelope.
    hilbert.create_save_path('figs/hilbert/')
    hilbert.envelope(time, amplitude, fs=16000.0)
