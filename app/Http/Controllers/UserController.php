<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function create(Request $request){
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255|unique:user',
            'email' => 'required|string|email|max:255|unique:user',
            'password' => 'required|string|min:8',
            'role' => 'required|string|exists:roles,name'
        ]);

        if($validator->fails()){
            return response()->json([
                'success' => false,
                'errors' =>$validator-> errors(),
            ], 422);
        }

        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $role = Role::where('name' , $request->role)->first();
        if($role){
            \Log::info('Admin role found, attaching to user.');
            $user->roles()->attach($role);
            \Log::info('Role attached to user.');
        }

        return response()->json([
            'success' => true,
            'user' => $user,
        ], 201);
    }

    public function index(){
        $users = User::all();

        return response()->json([
            'success'=>true,
            'users'=>$users
        ]);
    }

    public function delete($id)
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();
            
            return response()->json([
                'success' => true,
                'message' => 'User deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'User not found or could not be deleted'
            ], 404);
        }
    }

    // Method to update a user
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'password' => 'nullable|string|min:8',
            'role' => 'required|string' // Adjust as needed
        ]);

        try {
            $user = User::findOrFail($id);
            $user->username = $validated['username'];
            $user->email = $validated['email'];
            
            if ($request->filled('password')) {
                $user->password = bcrypt($validated['password']);
            }
            
            $user->save();

            return response()->json([
                'success' => true,
                'message' => 'User updated successfully',
                'user' => $user
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'User not found or could not be updated'
            ], 404);
        }
    }
}
