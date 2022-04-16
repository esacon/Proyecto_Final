from pydub import AudioSegment as am
import os


def convert_to_mono(audio, freq=16000, dst_folder='new_audio/'):
    """
    Using AudioSegment class from Pydub library, open a .wav file and resample it to 16000Hz. 
    The output is a one-channel audio (mono).

    Parameters
    ----------
    audio : string
            Path (including extension) where the audio is located.
    freq : int
            Desired frequency.
    dst_folder :  string, optional
            Destination path where the audio will be saved.

    Return
    ----------
    new_audio : string
            New file name of the converted audio.
    fs : int
            Audio sample frequency.
    """
    # Open .wav file.
    sound = am.from_file(audio, format='wav')
    print(f'Original Sample rate: {sound.frame_rate}\tNo. Channels: {sound.channels}')
    # Resample to 16000Hz and set channels to one.
    sound = sound.set_frame_rate(freq).set_channels(1)        
    print(f'New Sample rate: {sound.frame_rate}\tNo. Channels: {sound.channels}\n')
    # Path where the audio will be saved.
    new_audio = '{dst}{name}_output.wav'.format(dst=dst_folder, name=audio.replace('audios/', '').replace('.wav', ''))
    # Export output and save it.
    sound.export(new_audio, format='wav')
    return new_audio, sound.frame_rate


def create_save_path(dst_folder='new_audio/'):
    """
    Create a folder to save all audios converted to mono and resampled to 16000 Hz.

    Parameters
    ------------
    dst_folder : string, optional
            Destination folder where files will be saved.
    """
    if not os.path.exists(os.path.dirname(dst_folder)):
        os.makedirs(os.path.dirname(dst_folder))


def convert_all_audios():
    """
    When desired, convert to mono all the .wav audio files available in certain folder.
    """
    # List the files ending in .wav.
    audio_files = [file for file in os.listdir(os.getcwd()) if file.endswith('.wav')]

    for audio in audio_files:
        convert_to_mono(audio)


if __name__ == '__main__':
    create_save_path()
    convert_all_audios()
