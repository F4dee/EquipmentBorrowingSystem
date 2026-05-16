package edu.cit.lastname.equipmentborrowingsystem.features.borrowing

import edu.cit.lastname.equipmentborrowingsystem.features.equipment.Equipment

data class CartItem(
    val equipment: Equipment,
    var quantity: Int,
    var borrowDate: String,
    var returnDate: String
)

object CartManager {
    private val _items = mutableListOf<CartItem>()
    val items: List<CartItem> get() = _items

    fun addItem(equipment: Equipment, from: String, to: String) {
        val existing = _items.find { it.equipment.id == equipment.id }
        if (existing != null) {
            existing.quantity++
        } else {
            _items.add(CartItem(equipment, 1, from, to))
        }
    }

    fun removeItem(equipmentId: Long) {
        _items.removeAll { it.equipment.id == equipmentId }
    }

    fun updateQuantity(equipmentId: Long, quantity: Int) {
        val item = _items.find { it.equipment.id == equipmentId }
        if (item != null) {
            if (quantity <= 0) {
                removeItem(equipmentId)
            } else {
                item.quantity = quantity
            }
        }
    }

    fun clearCart() {
        _items.clear()
    }
}
