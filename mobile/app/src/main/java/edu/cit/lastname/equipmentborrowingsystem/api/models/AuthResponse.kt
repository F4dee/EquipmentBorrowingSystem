package edu.cit.lastname.equipmentborrowingsystem.api.models

data class AuthResponse(
    val status: String,
    val message: String?,
    val data: Map<String, Any>?,
    val error: ApiError?
)

data class ApiError(
    val code: String,
    val message: String,
    val details: String?
)
