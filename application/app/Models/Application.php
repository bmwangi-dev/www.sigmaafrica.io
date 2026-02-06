<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone_number',
        'organization',
        'cohort_id',
    ];

    public function cohort()
    {
        return $this->belongsTo(Cohort::class);
    }
}
