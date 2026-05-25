package edu.cit.lastname.equipmentborrowingsystem.features.dashboard

import android.graphics.Color
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import edu.cit.lastname.equipmentborrowingsystem.R
import edu.cit.lastname.equipmentborrowingsystem.features.borrowing.BorrowingRequest

class RecentRequestAdapter(private var requests: List<BorrowingRequest>) : RecyclerView.Adapter<RecentRequestAdapter.ViewHolder>() {

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val tvRequestId: TextView = view.findViewById(R.id.tvRequestId)
        val tvRequestDetails: TextView = view.findViewById(R.id.tvRequestDetails)
        val tvStatus: TextView = view.findViewById(R.id.tvStatus)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_recent_request, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val req = requests[position]
        holder.tvRequestId.text = "REQ-${String.format("%03d", req.id)}"
        holder.tvRequestDetails.text = "${req.user?.name ?: "Unknown"} • ${req.equipment.name}"
        holder.tvStatus.text = req.status

        when (req.status) {
            "PENDING" -> {
                holder.tvStatus.setTextColor(Color.parseColor("#D97706"))
                holder.tvStatus.setBackgroundColor(Color.parseColor("#FEF3C7"))
            }
            "APPROVED" -> {
                holder.tvStatus.setTextColor(Color.parseColor("#059669"))
                holder.tvStatus.setBackgroundColor(Color.parseColor("#D1FAE5"))
            }
            "RETURNED" -> {
                holder.tvStatus.setTextColor(Color.parseColor("#2563EB"))
                holder.tvStatus.setBackgroundColor(Color.parseColor("#DBEAFE"))
            }
            "DENIED" -> {
                holder.tvStatus.setTextColor(Color.parseColor("#DC2626"))
                holder.tvStatus.setBackgroundColor(Color.parseColor("#FEE2E2"))
            }
            "BORROWED" -> {
                holder.tvStatus.setTextColor(Color.parseColor("#4F46E5"))
                holder.tvStatus.setBackgroundColor(Color.parseColor("#E0E7FF"))
            }
            else -> {
                holder.tvStatus.setTextColor(Color.parseColor("#4B5563"))
                holder.tvStatus.setBackgroundColor(Color.parseColor("#F3F4F6"))
            }
        }
    }

    override fun getItemCount() = requests.size

    fun updateData(newRequests: List<BorrowingRequest>) {
        requests = newRequests
        notifyDataSetChanged()
    }
}
