package edu.cit.lastname.equipmentborrowingsystem.features.equipment

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ProgressBar
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import edu.cit.lastname.equipmentborrowingsystem.R
import edu.cit.lastname.equipmentborrowingsystem.core.network.RetrofitClient
import edu.cit.lastname.equipmentborrowingsystem.features.borrowing.CartManager
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class CatalogFragment : Fragment() {
    private lateinit var recyclerView: RecyclerView
    private lateinit var progressBar: ProgressBar
    private lateinit var adapter: EquipmentAdapter

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_catalog, container, false)
        
        recyclerView = view.findViewById(R.id.recyclerView)
        progressBar = view.findViewById(R.id.progressBar)
        
        // Match React GridLayout
        recyclerView.layoutManager = GridLayoutManager(context, 2)
        
        adapter = EquipmentAdapter(emptyList()) { equipment ->
            // Add to cart with mock dates (like React default 1 week)
            val fromDate = "2026-05-16"
            val toDate = "2026-05-23"
            CartManager.addItem(equipment, fromDate, toDate)
            Toast.makeText(context, "${equipment.name} added to cart!", Toast.LENGTH_SHORT).show()
        }
        recyclerView.adapter = adapter
        
        fetchEquipment()
        
        return view
    }

    private fun fetchEquipment() {
        progressBar.visibility = View.VISIBLE
        RetrofitClient.equipmentService.getAllEquipment().enqueue(object : Callback<EquipmentResponse> {
            override fun onResponse(call: Call<EquipmentResponse>, response: Response<EquipmentResponse>) {
                progressBar.visibility = View.GONE
                if (response.isSuccessful && response.body() != null) {
                    adapter.updateData(response.body()!!.items)
                } else {
                    Toast.makeText(context, "Failed to load catalog", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<EquipmentResponse>, t: Throwable) {
                progressBar.visibility = View.GONE
                Toast.makeText(context, "Error: ${t.message}", Toast.LENGTH_SHORT).show()
            }
        })
    }
}
