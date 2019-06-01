<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use App\Models \ {
User, Provider, ProviderUser
};
use Exception;
use Socialite;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    /**
     * Redirect the user to the GitHub authentication page.
     *
     * @return \Illuminate\Http\Response
     */
    public function getProviderRedirect(Provider $provider)
    {
        return Socialite::driver($provider->driver)->stateless()->redirect();
    }

    /**
     * Obtain the user information from GitHub.
     *
     * @return \Illuminate\Http\Response
     */
    public function getProviderCallback(Provider $provider)
    {
        try {


            $socialUser = Socialite::driver($provider->driver)->stateless()->user();
            $user = User::where('email', $socialUser->email)->first();

            if (!$user) {
                $user = User::create([
                    'avatar' => $socialUser->getAvatar(),
                    'email' => $socialUser->getEmail(),
                    'name' => $socialUser->getName(),
                    'nickname' => $socialUser->getNickname()
                ]);

                $user->save();
            }

            $existingProvider = ProviderUser::where([
                'provider_id' => $provider->id,
                'user_id' => $user->id
            ])->first();

            if (!$existingProvider) {
                $user->providers()->attach($provider);
            }

            $token = auth()->login($user);

            return view('auth.callback', [
                'user' => $socialUser,
                'auth' => [
                    'access_token' => $token,
                    'token_type' => 'bearer',
                    'expires_in' => auth()->factory()->getTTL() * 60
                ]
            ]);
        } catch (\Exception $err) {
            dd($socialUser, $user, $provider);
         }
    }
}
