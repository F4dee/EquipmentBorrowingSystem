package edu.cit.lastname.equipmentborrowingsystem.features.equipment

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import edu.cit.lastname.equipmentborrowingsystem.R

class EquipmentAdapter(
    private var items: List<Equipment>,
    private val onAddClick: (Equipment) -> Unit
) : RecyclerView.Adapter<EquipmentAdapter.ViewHolder>() {

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val ivEquipment: ImageView = view.findViewById(R.id.ivEquipment)
        val tvTag: TextView = view.findViewById(R.id.tvTag)
        val tvName: TextView = view.findViewById(R.id.tvName)
        val tvStatus: TextView = view.findViewById(R.id.tvStatus)
        val tvEquipId: TextView = view.findViewById(R.id.tvEquipId)
        val btnAdd: Button = view.findViewById(R.id.btnAdd)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_equipment, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val equipment = items[position]
        holder.tvTag.text = equipment.tag
        holder.tvName.text = equipment.name
        holder.tvStatus.text = equipment.status
        holder.tvEquipId.text = "ID: ${equipment.equipId}"

        holder.ivEquipment.setImageResource(getImageResourceForName(equipment.name))

        if (equipment.status == "AVAILABLE") {
            holder.btnAdd.isEnabled = true
            holder.btnAdd.alpha = 1.0f
        } else {
            holder.btnAdd.isEnabled = false
            holder.btnAdd.alpha = 0.5f
        }

        holder.btnAdd.setOnClickListener {
            onAddClick(equipment)
        }
    }

    override fun getItemCount() = items.size

    fun updateData(newItems: List<Equipment>) {
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
