package edu.cit.lastname.equipmentborrowingsystem.features.auth

data class LoginRequest(
    val email: String,
    val password: String
)
