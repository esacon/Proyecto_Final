package com.example.lunghealth

import android.content.Context
import android.content.pm.PackageManager
import android.media.MediaRecorder
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.VibrationEffect
import android.os.Vibrator
import android.os.VibratorManager
import android.view.View
import android.widget.Toast
import androidx.core.app.ActivityCompat
import kotlinx.android.synthetic.main.activity_main.*
import java.io.File
import java.io.IOException
import java.text.SimpleDateFormat
import java.util.*

const val REQUEST_CODE = 200

class MainActivity : AppCompatActivity(), Timer.OnTimerTickListener {

    private lateinit var amplitudes: ArrayList<Float>
    private var permissions = arrayOf(android.Manifest.permission.RECORD_AUDIO)
    private var permissionGranted = false

    private lateinit var recorder: MediaRecorder
    private var dirPath = ""
    private var filename = ""
    private var isRecording = false
    private var isStopped = false

    private lateinit var vibrator: Vibrator

    private lateinit var timer: Timer



    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        permissionGranted = ActivityCompat.checkSelfPermission(this, permissions[0]) == PackageManager.PERMISSION_GRANTED

        if(!permissionGranted)
            ActivityCompat.requestPermissions(this, permissions, REQUEST_CODE)

        timer = Timer(this)
        vibrator = getSystemService(Context.VIBRATOR_SERVICE) as Vibrator

        btnRecord.setOnClickListener{
            when{
                isStopped -> uploadRecorder()
                isRecording -> stopRecorder()
                else -> startRecorder()
            }

            vibrator.vibrate(VibrationEffect.createOneShot(50, VibrationEffect.DEFAULT_AMPLITUDE))
        }

        btnDelete.setOnClickListener {
            cancelRecorder()
        }

        btnMenu.setOnClickListener {
            dropMenu()
        }
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)

        if(requestCode == REQUEST_CODE)
            permissionGranted = grantResults[0] == PackageManager.PERMISSION_GRANTED
    }

    private fun startRecorder() {

        //Check Permissions.

        if(!permissionGranted){
            ActivityCompat.requestPermissions(this, permissions, REQUEST_CODE)
            return
        }

        //Start Recording.
        recorder = MediaRecorder()
        dirPath = "${externalCacheDir?.absolutePath}/"

        var simpleDateFormat = SimpleDateFormat("yyyy.MM.DD_hh.mm.ss")
        var date = simpleDateFormat.format(Date())
        filename = "audio_record_$date"

        recorder.apply {
            setAudioSource(MediaRecorder.AudioSource.MIC)
            setOutputFormat(MediaRecorder.OutputFormat.MPEG_4)
            setAudioEncoder(MediaRecorder.AudioEncoder.AAC)
            setOutputFile("$dirPath$filename.mp3")

            try {
                prepare()
            }catch (e: IOException){}

            start()
        }

        //Graphic Variables.

        isRecording = true
        isStopped = false
        audioTimer.setTextColor(getColor(R.color.mainBlue))
        btnRecord.setImageResource(R.drawable.ic_stop)
        btnDelete.visibility = View.VISIBLE
        btnDelete.isClickable = true
        timer.start()
    }

    private fun stopRecorder() {

        //Stop recording.
        recorder.apply {
            stop()
            release()
        }

        //Graphic Variables.

        isRecording = false
        isStopped = true
        audioTimer.setTextColor(getColor(R.color.colorText))
        btnRecord.setImageResource(R.drawable.ic_upload)
        btnDelete.setImageResource(R.drawable.ic_loop)
        timer.stop()
    }

    private fun uploadRecorder() {

        //Upload the saved audio to Webpage.
        UploadUtility(this).uploadFile("$dirPath$filename.mp3") // Either Uri, File or String file path


        //Graphic Variables.

        timer.stop()

        /*
        Toast.makeText(this, "Record successfully uploaded.", Toast.LENGTH_SHORT).show()
         */

        isStopped = false
        isRecording = false
        btnRecord.setImageResource(R.drawable.ic_mic)
        amplitudes = waveformView.clear()
        audioTimer.text = "00:00.00"
        btnDelete.isClickable = false
        btnDelete.setImageResource(R.drawable.ic_delete)
        btnDelete.visibility = View.INVISIBLE
    }

    private fun cancelRecorder() {

        //Cancel the recording and delete file (if it was being recorded).

        if (isRecording)
            recorder.apply {
                stop()
                release()
            }

        File("$dirPath$filename.mp3").delete()

        //Graphic Variables.

        isStopped = false
        isRecording = false
        timer.stop()
        btnRecord.setImageResource(R.drawable.ic_mic)
        audioTimer.setTextColor(getColor(R.color.colorText))
        amplitudes = waveformView.clear()
        audioTimer.text = "00:00.00"
        Toast.makeText(this, "Recording cancelled.", Toast.LENGTH_SHORT).show()
        btnDelete.isClickable = false
        btnDelete.setImageResource(R.drawable.ic_delete)
        btnDelete.visibility = View.INVISIBLE
    }

    private fun dropMenu() {
        Toast.makeText(this, "Menu will be available soon...", Toast.LENGTH_SHORT).show()
        btnMenu.isClickable = false
    }

    override fun onTimerTick(duration: String) {
        waveformView.addAmplitude(recorder.maxAmplitude.toFloat())
        audioTimer.text = duration
    }

}
