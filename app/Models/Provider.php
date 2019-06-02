<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Provider extends Model
{
    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'driver';
    }

    /**
     * The users that belong to the provider.
     */
    public function users()
    {
        return $this->belongsToMany('App\Models\User')
            ->using('App\Models\ProviderUser');
    }

    /**
     * Get the scopes for the provider.
     */
    public function scopes()
    {
        return $this->hasMany('App\Models\Scope');
    }
}
