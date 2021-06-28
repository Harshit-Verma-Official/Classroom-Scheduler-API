# Getting Started
This is an API for back-end of [Classroom Scheduler](https://github.com/harshitv9984/Classroom-Scheduler) project built in NodeJs with MySQL database.

# End Points

1. GET All Teachers : https://app-51e39946-6e89-4b4d-a326-8b8d40035f4e.cleverapps.io/api/teachers
2. GET teacher by id : https://app-51e39946-6e89-4b4d-a326-8b8d40035f4e.cleverapps.io/api/teachers/:id
3. GET All Tasks : https://app-51e39946-6e89-4b4d-a326-8b8d40035f4e.cleverapps.io/api/tasks
4. GET a single Task : https://app-51e39946-6e89-4b4d-a326-8b8d40035f4e.cleverapps.io/api/tasks/:id
5. DELETE a task : https://app-51e39946-6e89-4b4d-a326-8b8d40035f4e.cleverapps.io/api/tasks/:id
6. POST a task : https://app-51e39946-6e89-4b4d-a326-8b8d40035f4e.cleverapps.io/api/tasks
  * task_id must be 0.
  * Body of request : {
                        "task_id": 0,
                        "teacher_id": 6,
                        "task_name": "Leetcode",
                        "task_date": "2021-06-27T00:00:00.000Z",
                        "start_time": "04:00:00",
                        "end_time": "05:00:00"
                      }
7. Update a task : https://app-51e39946-6e89-4b4d-a326-8b8d40035f4e.cleverapps.io/api/tasks
  * Body of request : {
                        "task_id": 8,
                        "teacher_id": 6,
                        "task_name": "Leetcode",
                        "task_date": "2021-06-27T00:00:00.000Z",
                        "start_time": "04:00:00",
                        "end_time": "05:00:00"
                      }
