package edu.cit.lastname.equipmentborrowingsystem.features.borrowing

import edu.cit.lastname.equipmentborrowingsystem.features.equipment.Equipment
import edu.cit.lastname.equipmentborrowingsystem.features.user.User

data class CreateRequestDTO(
    val userId: Long,
    val equipmentId: Long,
    val borrowDate: String,
    val returnDate: String
)

data class BorrowingRequest(
    val id: Long,
    val user: User?,
    val equipment: Equipment,
    val borrowDate: String,
    val returnDate: String,
    val status: String
)

data class RequestResponse(
    val success: Boolean,
    val data: RequestData?,
    val error: Any?
)

data class RequestData(
    val request: BorrowingRequest?,
    val requests: List<BorrowingRequest>?
)
