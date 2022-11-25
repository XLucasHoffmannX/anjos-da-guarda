<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Control extends Model
{
    use HasFactory;

    protected $fillable = ['user_created', 'patient_id', 'medicamento',
        'medicamento_id', 'description', 'inventory_qtd'];
}
