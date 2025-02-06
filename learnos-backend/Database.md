# Student Learning Web Application Database Schema

## Description
This database schema is designed for a web application that allows students to learn about various topics through multiple modules. Each module contains multiple-choice questions with images instead of text-based questions. Students' responses are recorded and linked to their unique user accounts.

## Database Tables

### 1. Users
Stores user information, ensuring only University of Florida (@ufl.edu) emails can register.

- **email** (VARCHAR, Primary Key) – Unique email for each user, restricted to @ufl.edu.
- **user_id** (INT, AUTO_INCREMENT, UNIQUE) – Numeric identifier for quick lookups.

### 2. Modules
Holds details about different learning modules.

- **module_id** (INT, AUTO_INCREMENT, Primary Key) – Unique identifier for each module.
- **title** (VARCHAR) – Name of the module.
- **description** (TEXT) – Detailed information about the module.

### 3. Questions
Stores questions as image files, linked to modules.

- **question_id** (INT, AUTO_INCREMENT, Primary Key) – Unique identifier for each question.
- **module_id** (INT, Foreign Key) – References `modules.module_id`.
- **image** (LONGBLOB) – Stores the actual image file for the question.

### 4. Answers
Contains multiple-choice answer options for each question.

- **answer_id** (INT, AUTO_INCREMENT, Primary Key) – Unique identifier for each answer.
- **question_id** (INT, Foreign Key) – References `questions.question_id`.
- **answer_text** (TEXT) – Text of the answer choice.
- **is_correct** (BOOLEAN) – Indicates if the answer is correct.

### 5. Responses
Tracks student answers to questions.

- **response_id** (INT, AUTO_INCREMENT, Primary Key) – Unique identifier for each response.
- **user_id** (INT, Foreign Key) – References `users.user_id`.
- **question_id** (INT, Foreign Key) – References `questions.question_id`.
- **selected_answer_id** (INT, Foreign Key) – References `answers.answer_id`.

## Notes
- The `is_correct` field in `responses` is not generated automatically; correctness must be determined via queries.
- Images are stored as `MEDIUMBLOB` which is up to 16 MB of data.
- Foreign keys are set to `CASCADE` to maintain referential integrity when deleting records.

This database structure ensures efficient querying, data integrity, and a smooth student learning experience.
