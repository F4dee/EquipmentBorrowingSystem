package edu.cit.lastname.equipmentborrowingsystem.core.network
import edu.cit.lastname.equipmentborrowingsystem.features.auth.AuthService

import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object RetrofitClient {
    // For Android Emulator, 10.0.2.2 points to the host machine's localhost
    private const val BASE_URL = "http://10.0.2.2:8080/"

    private val logging = HttpLoggingInterceptor().apply {
        level = HttpLoggingInterceptor.Level.BODY
    }

    private val client = OkHttpClient.Builder()
        .addInterceptor(logging)
        .build()

    val retrofit: Retrofit by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .client(client)
            .build()
    }

    val authService: AuthService by lazy {
        retrofit.create(AuthService::class.java)
    }

    val equipmentService: edu.cit.lastname.equipmentborrowingsystem.features.equipment.EquipmentService by lazy {
        retrofit.create(edu.cit.lastname.equipmentborrowingsystem.features.equipment.EquipmentService::class.java)
    }
}
