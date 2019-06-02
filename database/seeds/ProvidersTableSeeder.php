<?php

use Illuminate\Database\Seeder;
use App\Models\Provider;

class ProvidersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Provider::create([
            'name' => 'GitHub',
            'driver' => 'github'
        ]);
        Provider::create([
            'name' => 'GitLab',
            'driver' => 'gitlab'
        ]);
        Provider::create([
            'name' => 'BitBucket',
            'driver' => 'bitbucket'
        ]);
    }
}
