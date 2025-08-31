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
        Schema::create('user_cohorts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Technical mentor
            $table->foreignId('cohort_id')->constrained('cohorts')->onDelete('cascade');
            $table->date('assigned_date');
            $table->boolean('is_lead_mentor')->default(false); // If the mentor is leading this cohort
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'cohort_id']);
            $table->index(['cohort_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_cohorts');
    }
};
