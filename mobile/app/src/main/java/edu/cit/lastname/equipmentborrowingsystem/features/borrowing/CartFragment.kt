package edu.cit.lastname.equipmentborrowingsystem.features.borrowing

import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import edu.cit.lastname.equipmentborrowingsystem.R
import edu.cit.lastname.equipmentborrowingsystem.core.network.RetrofitClient
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class CartFragment : Fragment() {

    private lateinit var adapter: CartAdapter
    private lateinit var recyclerView: RecyclerView
    private lateinit var btnCheckout: Button

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_cart, container, false)
        
        recyclerView = view.findViewById(R.id.recyclerViewCart)
        btnCheckout = view.findViewById(R.id.btnCheckout)

        recyclerView.layoutManager = LinearLayoutManager(context)
        adapter = CartAdapter(CartManager.items) { item ->
            CartManager.removeItem(item.equipment.id)
            adapter.updateData(CartManager.items)
            Toast.makeText(context, "${item.equipment.name} removed", Toast.LENGTH_SHORT).show()
        }
        recyclerView.adapter = adapter

        btnCheckout.setOnClickListener {
            performCheckout()
        }

        return view
    }

    private fun performCheckout() {
        if (CartManager.items.isEmpty()) {
            Toast.makeText(context, "Your cart is empty", Toast.LENGTH_SHORT).show()
            return
        }

        val sharedPref = requireActivity().getSharedPreferences("AppPrefs", Context.MODE_PRIVATE)
        val userId = sharedPref.getLong("userId", -1L)

        if (userId == -1L) {
            Toast.makeText(context, "User not logged in properly", Toast.LENGTH_SHORT).show()
            return
        }

        btnCheckout.isEnabled = false
        var completedCalls = 0
        val totalCalls = CartManager.items.size
        var hasError = false

        for (item in CartManager.items) {
            val requestDto = CreateRequestDTO(
                userId = userId,
                equipmentId = item.equipment.id,
                borrowDate = item.borrowDate,
                returnDate = item.returnDate
            )

            RetrofitClient.requestService.submitRequest(requestDto).enqueue(object : Callback<RequestResponse> {
                override fun onResponse(call: Call<RequestResponse>, response: Response<RequestResponse>) {
                    completedCalls++
                    if (!response.isSuccessful) {
                        hasError = true
                    }
                    checkCompletion(completedCalls, totalCalls, hasError)
                }

                override fun onFailure(call: Call<RequestResponse>, t: Throwable) {
                    completedCalls++
                    hasError = true
                    checkCompletion(completedCalls, totalCalls, hasError)
                }
            })
        }
    }

    private fun checkCompletion(completed: Int, total: Int, hasError: Boolean) {
        if (completed == total) {
            btnCheckout.isEnabled = true
            if (hasError) {
                Toast.makeText(context, "Some requests failed to submit", Toast.LENGTH_LONG).show()
            } else {
                Toast.makeText(context, "Checkout successful!", Toast.LENGTH_LONG).show()
                CartManager.clearCart()
                adapter.updateData(CartManager.items)
            }
        }
    }
}
