<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; 

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;
    use HasFactory, Notifiable;
    protected $table = 'user';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'email',
        'password',
    ];

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'user_roles');
    }

    public function assignRole($role){
        if(is_string($role)){
            $role = Role:: whereName($role)->firstOrFail();
        }

        $this->roles()->syncWithoutDetaching($role);
    }
    
}

