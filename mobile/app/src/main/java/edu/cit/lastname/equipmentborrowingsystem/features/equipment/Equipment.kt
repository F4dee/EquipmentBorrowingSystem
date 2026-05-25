package edu.cit.lastname.equipmentborrowingsystem.features.equipment

data class Equipment(
    val id: Long,
    val equipId: String,
    val name: String,
    val tag: String,
    val description: String?,
    val status: String
)

data class EquipmentResponse(
    val success: Boolean,
    val data: EquipmentData?
)

data class EquipmentData(
    val items: List<Equipment>
)
