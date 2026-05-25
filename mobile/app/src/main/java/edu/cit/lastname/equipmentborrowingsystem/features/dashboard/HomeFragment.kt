package edu.cit.lastname.equipmentborrowingsystem.features.dashboard

import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import edu.cit.lastname.equipmentborrowingsystem.R
import edu.cit.lastname.equipmentborrowingsystem.core.network.RetrofitClient
import edu.cit.lastname.equipmentborrowingsystem.features.borrowing.RequestResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class HomeFragment : Fragment() {

    private lateinit var tvWelcome: TextView
    private lateinit var tvStatActiveRequests: TextView
    private lateinit var tvStatCompleted: TextView
    private lateinit var tvStatOpenTickets: TextView
    private lateinit var rvRecentRequests: RecyclerView
    private lateinit var adapter: RecentRequestAdapter

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_home, container, false)
        
        tvWelcome = view.findViewById(R.id.tvWelcome)
        tvStatActiveRequests = view.findViewById(R.id.tvStatActiveRequests)
        tvStatCompleted = view.findViewById(R.id.tvStatCompleted)
        tvStatOpenTickets = view.findViewById(R.id.tvStatOpenTickets)
        rvRecentRequests = view.findViewById(R.id.rvRecentRequests)

        val sharedPref = requireActivity().getSharedPreferences("AppPrefs", Context.MODE_PRIVATE)
        val userName = sharedPref.getString("userName", "User")
        val userId = sharedPref.getLong("userId", -1L)
        
        tvWelcome.text = "Good afternoon, $userName"

        adapter = RecentRequestAdapter(emptyList())
        rvRecentRequests.layoutManager = LinearLayoutManager(context)
        rvRecentRequests.adapter = adapter

        if (userId != -1L) {
            fetchUserRequests(userId)
        }

        return view
    }

    private fun fetchUserRequests(userId: Long) {
        RetrofitClient.requestService.getUserRequests(userId).enqueue(object : Callback<RequestResponse> {
            override fun onResponse(call: Call<RequestResponse>, response: Response<RequestResponse>) {
                if (response.isSuccessful && response.body() != null) {
                    val requests = response.body()?.data?.requests ?: emptyList()
                    
                    val activeCount = requests.count { it.status == "PENDING" || it.status == "BORROWED" || it.status == "APPROVED" }
                    val completedCount = requests.count { it.status == "RETURNED" }
                    
                    tvStatActiveRequests.text = activeCount.toString()
                    tvStatCompleted.text = completedCount.toString()
                    tvStatOpenTickets.text = "0" // Placeholder for tickets

                    val recent = requests.sortedByDescending { it.id }.take(3)
                    adapter.updateData(recent)
                }
            }

            override fun onFailure(call: Call<RequestResponse>, t: Throwable) {
                // Ignore for now, keep 0s
            }
        })
    }
}
