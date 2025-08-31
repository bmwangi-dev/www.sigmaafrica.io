<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('cohort_id')->nullable()->constrained('cohorts')->onDelete('set null');
            $table->index(['cohort_id', 'role']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['cohort_id', 'role']);
            $table->dropForeign(['cohort_id']);
            $table->dropColumn('cohort_id');
        });
    }
};
