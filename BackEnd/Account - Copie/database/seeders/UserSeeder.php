<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use App\Models\User;

class UserSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
    {
        // Roles For User
        $client = Role::findOrCreate("client", "user");
        $artisan = Role::findOrCreate("artisan", "user");
        $supporteur = Role::findOrCreate("supporteur", "user");
        $admin = Role::findOrCreate("admin", "user");

        // Permissions For client
        $consulterArtisans = Permission::findOrCreate("consulter artisans", "user");
        $filtrerArtisans = Permission::findOrCreate("filtrer artisans", "user");
        $envoyerReclamation = Permission::findOrCreate("envoyer reclamation", "user");
        $gererSonProfil = Permission::findOrCreate("gerer profil", "user");
        $donnerAvis = Permission::findOrCreate("donner avis", "user");
        $modifierPassword = Permission::findOrCreate("modifier password", "user");

        // Permissions For supporteur
        $ListeReclamation = Permission::findOrCreate("liste reclamation", "user");
        $changerEtatReclamtion = Permission::findOrCreate("changer etat reclamation", "user");
        $supprimerReclamation = Permission::findOrCreate("supprimer reclamation", "user");
        $detailsReclamation = Permission::findOrCreate("details reclamation", "user");

        // Permissions For admin
        // Gerer client
        $listeClients = Permission::findOrCreate("liste clients", "user");
        $detailsClient = Permission::findOrCreate("details client", "user");
        $modifierClient = Permission::findOrCreate("modifier client", "user");
        $supprimerClient = Permission::findOrCreate("supprimer client", "user");

        // Gerer artisan
        $listeArtisans = Permission::findOrCreate("liste artisans", "user");
        $detailsArtisan = Permission::findOrCreate("details artisans", "user");
        $modifierArtisan = Permission::findOrCreate("modifier artisan", "user");
        $supprimerArtisan = Permission::findOrCreate("supprimer artisan", "user");

        // Gerer supporteur
        $listeSupporteurs = Permission::findOrCreate("liste supporteurs", "user");
        $detailsSupporteur = Permission::findOrCreate("details supporteur", "user");
        $ajouterSupporteur = Permission::findOrCreate("ajouter supporteur", "user");
        $modifierSupporteur = Permission::findOrCreate("modifier supporteur", "user");
        $supprimerSupporteur = Permission::findOrCreate("supprimer supporteur", "user");

        // Gerer Categorie
        $listeCategories = Permission::findOrCreate("liste categories", "user");
        $detailsCategorie = Permission::findOrCreate("details categorie", "user");
        $ajouterCategorie = Permission::findOrCreate("ajouter categorie", "user");
        $modifierCategorie = Permission::findOrCreate("modifier categorie", "user");
        $supprimerCategorie = Permission::findOrCreate("supprimer categorie", "user");

        // Gerer Contact
        $listeContact = Permission::findOrCreate("liste contacts", "user");
        $detailsContact = Permission::findOrCreate("details contact", "user");

        $client->syncPermissions([
            $consulterArtisans,
            $filtrerArtisans,
            $envoyerReclamation,
            $gererSonProfil,
            $modifierPassword,
            $donnerAvis
        ]);

        $artisan->syncPermissions([
            $consulterArtisans,
            $filtrerArtisans,
            $envoyerReclamation,
            $gererSonProfil,
            $modifierPassword
        ]);

        $supporteur->syncPermissions([
            $listeArtisans,
            $filtrerArtisans,
            $ListeReclamation,
            $changerEtatReclamtion,
            $supprimerReclamation,
            $detailsReclamation,
            $gererSonProfil,
            $modifierPassword,
        ]);

        $admin->syncPermissions([
            $gererSonProfil,
            $modifierPassword,
            $filtrerArtisans,
            $ListeReclamation,
            $changerEtatReclamtion,
            $supprimerReclamation,
            $detailsReclamation,
            $listeClients,
            $detailsClient,
            $modifierClient,
            $supprimerClient,
            $listeArtisans,
            $detailsArtisan,
            $modifierArtisan,
            $supprimerArtisan,
            $listeSupporteurs,
            $detailsSupporteur,
            $ajouterSupporteur,
            $modifierSupporteur,
            $supprimerSupporteur,
            $listeCategories,
            $detailsCategorie,
            $ajouterCategorie,
            $modifierCategorie,
            $supprimerCategorie,
            $listeContact,
            $detailsContact,
        ]);

        //Create Admin
            $adminUser = User::updateOrCreate([
                'email' => config('app.admin_email'),
            ],[
                'fname' => config('app.admin_fname'),
                'lname' => config('app.admin_lname'),
                'telephone' => config('app.admin_telephone'),
                'password' => config('app.admin_pass')
            ]);

            $adminUser->assignRole($admin);

            $admin->save();
      
      
    }
}
