package edu.cit.lastname.equipmentborrowingsystem.features.user

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.fragment.app.Fragment
import edu.cit.lastname.equipmentborrowingsystem.R
import edu.cit.lastname.equipmentborrowingsystem.features.auth.LoginActivity
import edu.cit.lastname.equipmentborrowingsystem.features.borrowing.CartManager

class ProfileFragment : Fragment() {
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_profile, container, false)
        
        val tvName: TextView = view.findViewById(R.id.tvName)
        val tvEmail: TextView = view.findViewById(R.id.tvEmail)
        val tvRole: TextView = view.findViewById(R.id.tvRole)
        val btnLogout: Button = view.findViewById(R.id.btnLogout)

        val sharedPref = requireActivity().getSharedPreferences("AppPrefs", Context.MODE_PRIVATE)
        tvName.text = sharedPref.getString("userName", "Unknown User")
        tvEmail.text = sharedPref.getString("userEmail", "Unknown Email")
        tvRole.text = sharedPref.getString("userRole", "Unknown Role")

        btnLogout.setOnClickListener {
            // Clear SharedPreferences
            with(sharedPref.edit()) {
                clear()
                apply()
            }
            
            // Clear Cart
            CartManager.clearCart()
            
            // Redirect to Login
            val intent = Intent(requireActivity(), LoginActivity::class.java)
            intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
            startActivity(intent)
        }

        return view
    }
}
