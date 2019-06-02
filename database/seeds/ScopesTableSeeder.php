<?php

use Illuminate\Database\Seeder;
use App\Models\Scope;
use App\Models\Provider;

class ScopesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $github = Provider::where('name', 'GitHub')->first();
        $gitlab = Provider::where('name', 'Gitlab')->first();
        $bitbucket = Provider::where('name', 'BitBucket')->first();
        // GitHub Scopes
        Scope::create([
            'scope' => 'read:user',
            'provider_id' => $github->id
        ]);

        // GitLab Scopes
        Scope::create([
            'scope' => 'read_user',
            'provider_id' => $gitlab->id
        ]);

        // BitBucket Scopes
    }
}
