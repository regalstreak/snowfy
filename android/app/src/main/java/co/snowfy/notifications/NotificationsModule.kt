package co.snowfy.notifications

import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.os.Build
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import co.snowfy.R
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class NotificationsModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val PERSISTENT_NOTIFICATION_CHANNEL_ID = "persistent"
    private val notificationId = 0

    override fun getName(): String {
        return "Notifications"
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val name = reactApplicationContext.getString(R.string.notification_channel_name)
            val descriptionText = reactApplicationContext.getString(R.string.notification_channel_description)
            val importance = NotificationManager.IMPORTANCE_HIGH
            val channel = NotificationChannel(PERSISTENT_NOTIFICATION_CHANNEL_ID, name, importance).apply {
                description = descriptionText
            }
            val notificationManager: NotificationManager =
                    reactApplicationContext.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            notificationManager.createNotificationChannel(channel)
        }
    }


    @ReactMethod
    fun testMethod() {
        createNotificationChannel()
        var builder = NotificationCompat.Builder(reactApplicationContext, PERSISTENT_NOTIFICATION_CHANNEL_ID)
                .setSmallIcon(androidx.core.R.drawable.notification_icon_background)
                .setContentTitle("testing title")
                .setContentText("testing content text")
                .setPriority(NotificationCompat.PRIORITY_DEFAULT)

        with(NotificationManagerCompat.from(reactApplicationContext)) {
            notify(notificationId, builder.build())
        }

    }
}