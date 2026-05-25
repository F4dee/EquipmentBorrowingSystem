package edu.cit.lastname.equipmentborrowingsystem.features.auth

data class RegisterRequest(
    val name: String,
    val email: String,
    val password: String,
    val role: String = "USER"
)
