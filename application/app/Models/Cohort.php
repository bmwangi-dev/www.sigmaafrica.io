<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cohort extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'duration',
        'fee',
        'mode',
        'status',
        'course_id',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function applications()
    {
        return $this->hasMany(Application::class);
    }
}
