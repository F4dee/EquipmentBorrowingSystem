package edu.cit.lastname.equipmentborrowingsystem.api

import edu.cit.lastname.equipmentborrowingsystem.api.models.AuthResponse
import edu.cit.lastname.equipmentborrowingsystem.api.models.LoginRequest
import edu.cit.lastname.equipmentborrowingsystem.api.models.RegisterRequest
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

interface AuthService {
    @POST("api/v1/auth/register")
    fun register(@Body request: RegisterRequest): Call<AuthResponse>

    @POST("api/v1/auth/login")
    fun login(@Body request: LoginRequest): Call<AuthResponse>
}
