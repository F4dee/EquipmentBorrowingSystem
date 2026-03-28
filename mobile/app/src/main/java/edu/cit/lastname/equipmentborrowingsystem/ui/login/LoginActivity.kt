package edu.cit.lastname.equipmentborrowingsystem.ui.login

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import edu.cit.lastname.equipmentborrowingsystem.R
import edu.cit.lastname.equipmentborrowingsystem.api.RetrofitClient
import edu.cit.lastname.equipmentborrowingsystem.api.models.AuthResponse
import edu.cit.lastname.equipmentborrowingsystem.api.models.LoginRequest
import edu.cit.lastname.equipmentborrowingsystem.databinding.ActivityLoginBinding
import edu.cit.lastname.equipmentborrowingsystem.ui.register.RegisterActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btnLogin.setOnClickListener {
            performLogin()
        }

        binding.tvNoAccount.setOnClickListener {
            startActivity(Intent(this, RegisterActivity::class.java))
        }
    }

    private fun performLogin() {
        val email = binding.etEmail.text.toString().trim()
        val password = binding.etPassword.text.toString().trim()

        if (email.isEmpty()) {
            binding.tilEmail.error = getString(R.string.error_invalid_email)
            return
        }
        binding.tilEmail.error = null

        if (password.isEmpty()) {
            binding.tilPassword.error = "Password cannot be empty"
            return
        }
        binding.tilPassword.error = null

        binding.tvError.visibility = View.GONE
        binding.progressBar.visibility = View.VISIBLE

        val request = LoginRequest(email, password)
        RetrofitClient.instance.login(request).enqueue(object : Callback<AuthResponse> {
            override fun onResponse(call: Call<AuthResponse>, response: Response<AuthResponse>) {
                binding.progressBar.visibility = View.GONE
                if (response.isSuccessful) {
                    binding.tvError.visibility = View.GONE
                    startActivity(Intent(this@LoginActivity, edu.cit.lastname.equipmentborrowingsystem.ui.dashboard.DashboardActivity::class.java))
                    finish()
                } else {
                    binding.tvError.text = getString(R.string.error_login)
                    binding.tvError.visibility = View.VISIBLE
                }
            }

            override fun onFailure(call: Call<AuthResponse>, t: Throwable) {
                binding.progressBar.visibility = View.GONE
                binding.tvError.text = t.message ?: "Network error"
                binding.tvError.visibility = View.VISIBLE
            }
        })
    }
}
