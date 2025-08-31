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
            $table->enum('role', ['student', 'technical_mentor', 'admin', 'super_admin'])->default('student');
            $table->foreignId('department_id')->nullable()->constrained('departments')->onDelete('set null');
            $table->string('student_number')->nullable()->unique(); // For students
            $table->string('phone_number')->nullable();
            $table->string('profile_image')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->text('bio')->nullable();
            $table->enum('status', ['active', 'inactive', 'suspended'])->default('active');
            $table->timestamp('last_login')->nullable();
            
            $table->index(['role', 'department_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['role', 'department_id', 'status']);
            $table->dropForeign(['department_id']);
            $table->dropColumn([
                'role',
                'department_id',
                'student_number',
                'phone_number',
                'profile_image',
                'date_of_birth',
                'bio',
                'status',
                'last_login'
            ]);
        });
    }
};
