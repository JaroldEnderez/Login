<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use DB;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('user')->insert([
            'username'=> 'Jame Charles',
            'email' => 'jame@gmail.com',
            'password' => 'jamesCharles123',
        ]);
    }
}
