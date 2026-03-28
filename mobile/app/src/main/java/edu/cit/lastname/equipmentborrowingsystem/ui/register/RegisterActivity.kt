package edu.cit.lastname.equipmentborrowingsystem.ui.register

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import edu.cit.lastname.equipmentborrowingsystem.R
import edu.cit.lastname.equipmentborrowingsystem.api.RetrofitClient
import edu.cit.lastname.equipmentborrowingsystem.api.models.AuthResponse
import edu.cit.lastname.equipmentborrowingsystem.api.models.RegisterRequest
import edu.cit.lastname.equipmentborrowingsystem.databinding.ActivityRegisterBinding
import edu.cit.lastname.equipmentborrowingsystem.ui.login.LoginActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class RegisterActivity : AppCompatActivity() {

    private lateinit var binding: ActivityRegisterBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btnRegister.setOnClickListener {
            performRegistration()
        }

        binding.tvHaveAccount.setOnClickListener {
            startActivity(Intent(this, LoginActivity::class.java))
            finish()
        }
    }

    private fun performRegistration() {
        val name = binding.etName.text.toString().trim()
        val email = binding.etEmail.text.toString().trim()
        val password = binding.etPassword.text.toString().trim()

        if (name.isEmpty()) {
            binding.tilName.error = getString(R.string.error_invalid_name)
            return
        }
        binding.tilName.error = null

        if (email.isEmpty() || !android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            binding.tilEmail.error = getString(R.string.error_invalid_email)
            return
        }
        binding.tilEmail.error = null

        if (password.length < 8 || !password.any { it.isLetter() } || !password.any { it.isDigit() }) {
            binding.tilPassword.error = getString(R.string.error_invalid_password)
            return
        }
        binding.tilPassword.error = null

        binding.progressBar.visibility = View.VISIBLE
        
        val request = RegisterRequest(name, email, password)
        RetrofitClient.instance.register(request).enqueue(object : Callback<AuthResponse> {
            override fun onResponse(call: Call<AuthResponse>, response: Response<AuthResponse>) {
                binding.progressBar.visibility = View.GONE
                if (response.isSuccessful) {
                    Toast.makeText(this@RegisterActivity, R.string.success_registration, Toast.LENGTH_LONG).show()
                    startActivity(Intent(this@RegisterActivity, LoginActivity::class.java))
                    finish()
                } else {
                    val errorMsg = response.errorBody()?.string() ?: getString(R.string.error_registration)
                    Toast.makeText(this@RegisterActivity, errorMsg, Toast.LENGTH_LONG).show()
                }
            }

            override fun onFailure(call: Call<AuthResponse>, t: Throwable) {
                binding.progressBar.visibility = View.GONE
                Toast.makeText(this@RegisterActivity, t.message ?: "Network error", Toast.LENGTH_LONG).show()
            }
        })
    }
}
