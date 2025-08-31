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
        Schema::create('cohorts', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Skills Spark, etc.
            $table->string('cohort_number')->unique(); // Skills Spark01, Skills Spark02, etc.
            $table->integer('duration_weeks'); // Duration in weeks
            $table->integer('max_students')->default(0); // Maximum number of students
            $table->integer('current_students')->default(0); // Current enrolled students
            $table->foreignId('department_id')->constrained('departments')->onDelete('cascade');
            $table->foreignId('course_id')->constrained('courses')->onDelete('cascade');
            $table->date('start_date');
            $table->date('end_date');
            $table->enum('status', ['upcoming', 'active', 'completed', 'cancelled'])->default('upcoming');
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['department_id', 'course_id', 'status']);
            $table->index(['start_date', 'end_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cohorts');
    }
};
