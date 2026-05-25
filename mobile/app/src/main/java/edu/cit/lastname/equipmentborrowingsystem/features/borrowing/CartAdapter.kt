package edu.cit.lastname.equipmentborrowingsystem.features.borrowing

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageButton
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import edu.cit.lastname.equipmentborrowingsystem.R

class CartAdapter(
    private var items: List<CartItem>,
    private val onRemoveClick: (CartItem) -> Unit
) : RecyclerView.Adapter<CartAdapter.ViewHolder>() {

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val ivEquipment: ImageView = view.findViewById(R.id.ivEquipment)
        val tvName: TextView = view.findViewById(R.id.tvName)
        val tvDates: TextView = view.findViewById(R.id.tvDates)
        val tvQuantity: TextView = view.findViewById(R.id.tvQuantity)
        val btnRemove: ImageButton = view.findViewById(R.id.btnRemove)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_cart, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val item = items[position]
        holder.tvName.text = item.equipment.name
        holder.tvDates.text = "${item.borrowDate} to ${item.returnDate}"
        holder.tvQuantity.text = "Qty: ${item.quantity}"

        holder.ivEquipment.setImageResource(getImageResourceForName(item.equipment.name))

        holder.btnRemove.setOnClickListener {
            onRemoveClick(item)
        }
    }

    override fun getItemCount() = items.size

    fun updateData(newItems: List<CartItem>) {
        items = newItems
        notifyDataSetChanged()
    }

    private fun getImageResourceForName(name: String?): Int {
        if (name == null) return R.drawable.img_dell
        val n = name.lowercase()
        return when {
            n.contains("macbook") -> R.drawable.img_macbook
            n.contains("bose") || n.contains("audio") -> R.drawable.img_bose
            n.contains("canon") || n.contains("r5") -> R.drawable.img_canon
            n.contains("hdmi") || n.contains("cable") -> R.drawable.img_hdmi
            n.contains("sony") || n.contains("a7") -> R.drawable.img_sony
            n.contains("usb") || n.contains("hub") -> R.drawable.img_usb
            n.contains("projector") || n.contains("epson") -> R.drawable.img_epson
            n.contains("dell xps") || n.contains("laptop") -> R.drawable.img_dell
            else -> R.drawable.img_dell
        }
    }
}
