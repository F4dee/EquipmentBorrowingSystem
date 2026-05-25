package edu.cit.lastname.equipmentborrowingsystem.features.borrowing

import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path

interface RequestService {
    @POST("api/v1/requests")
    fun submitRequest(@Body request: CreateRequestDTO): Call<RequestResponse>

    @GET("api/v1/requests/user/{userId}")
    fun getUserRequests(@Path("userId") userId: Long): Call<RequestResponse>
}
