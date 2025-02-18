package com.example.hassamapp;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.Menu;

import com.example.hassamapp.model.Usuarios;
import com.example.hassamapp.ui.SharedViewModel;
import com.example.hassamapp.ui.home.HomeFragment;
import com.example.hassamapp.ui.home.HomeViewModel;
import com.google.android.material.snackbar.Snackbar;
import com.google.android.material.navigation.NavigationView;

import androidx.lifecycle.ViewModelProvider;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.appcompat.app.AppCompatActivity;

import com.example.hassamapp.databinding.ActivityScreenHomeBinding;

public class screen_home_activity extends AppCompatActivity {

    private AppBarConfiguration mAppBarConfiguration;
    private ActivityScreenHomeBinding binding;
    ///////////////////////////////////////////////////////////////////////////////////////////
    // Inicializando os ViewModel dos fragmentos
    private SharedViewModel sharedViewModel;
    //private HomeViewModel homeViewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ///////////////////////////////////////////////////////////////////////////////////////////
        // Intent recuperando o usuário da screen_login_activity
        Intent intent = getIntent();
        Usuarios usuario = intent.getParcelableExtra("usuario", Usuarios.class);
        ///////////////////////////////////////////////////////////////////////////////////////////
        // Passando dados para a SharedViewModel dos fragmentos
        sharedViewModel = new ViewModelProvider(this).get(SharedViewModel.class);
        sharedViewModel.setUsuario(usuario);

        ///////////////////////////////////////////////////////////////////////////////////////////
        binding = ActivityScreenHomeBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        setSupportActionBar(binding.appBarScreenHome.toolbar);
        binding.appBarScreenHome.fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null)
                        .setAnchorView(R.id.fab).show();
            }
        });
        DrawerLayout drawer = binding.drawerLayout;
        NavigationView navigationView = binding.navView;
        // Passing each menu ID as a set of Ids because each
        // menu should be considered as top level destinations.
        mAppBarConfiguration = new AppBarConfiguration.Builder(
                R.id.nav_home, R.id.nav_agendamentos, R.id.nav_servicos, R.id.nav_produtos)
                .setOpenableLayout(drawer)
                .build();
        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment_content_screen_home);
        NavigationUI.setupActionBarWithNavController(this, navController, mAppBarConfiguration);
        NavigationUI.setupWithNavController(navigationView, navController);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.screen_home_activity, menu);
        return true;
    }

    @Override
    public boolean onSupportNavigateUp() {
        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment_content_screen_home);
        return NavigationUI.navigateUp(navController, mAppBarConfiguration)
                || super.onSupportNavigateUp();
    }
}