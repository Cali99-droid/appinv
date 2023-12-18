<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hardware extends Model
{
    use HasFactory;
    public function area()
    {
        return $this->belongsTo(Area::class);
    }
    public function mantenimientos()
    {
        return $this->hasMany(Mantenimiento::class);
    }
}
