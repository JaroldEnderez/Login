<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class LoginTest extends TestCase
{
    use WithoutMiddleware;

    public function a_user_can_login_with_valid_credentials()
    {
       $user = User::factory()->make([
        'email' =>'testuser@example.com',
        'password' =>bcrypt('password123')
       ]);

       Auth::shouldReceive('attempt')
        ->with([
            'email' => 'testuser@example.com',
            'password' => 'password'
        ])
        ->andReturn(true);

        Auth::shouldReceive('user')->shouldReturn($user)

        $response = $this-> post('/login');
        $this->assertAuthenticatedAs($user);
    }
}
