package edu.cit.lastname.equipmentborrowingsystem.features.equipment

import retrofit2.Call
import retrofit2.http.GET

interface EquipmentService {
    @GET("api/v1/items")
    fun getAllEquipment(): Call<EquipmentResponse>
}
