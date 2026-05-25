package edu.cit.lastname.equipmentborrowingsystem.features.auth

import edu.cit.lastname.equipmentborrowingsystem.features.auth.AuthResponse
import edu.cit.lastname.equipmentborrowingsystem.features.auth.LoginRequest
import edu.cit.lastname.equipmentborrowingsystem.features.auth.RegisterRequest
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

interface AuthService {
    @POST("api/v1/auth/register")
    fun register(@Body request: RegisterRequest): Call<AuthResponse>

    @POST("api/v1/auth/login")
    fun login(@Body request: LoginRequest): Call<AuthResponse>
}
