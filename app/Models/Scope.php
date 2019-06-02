<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Scope extends Model
{
    /**
     * Get the provider that owns the scope.
     */
    public function provider()
    {
        return $this->belongsTo('App\Models\Provider');
    }
}
