# Quiz API Documentation

This project contains APIs to manage quizzes and users. All endpoints have the global prefix `/api/v1`.

# EndPoints

## Quiz Endpoints

1. **Create a New Quiz**

   - **Endpoint**: `/quiz/new`
   - **Method**: `POST`

2. **Get Quiz Details**

   - **Endpoint**: `/quiz/:id`
   - **Method**: `GET`

3. **Register User for Quiz**
   - **Endpoint**: `/quiz/register/:quiz_id/:user_id`
   - **Method**: `POST`

---

## User Endpoints

1. **Register a New User**

   - **Endpoint**: `/user/register`
   - **Method**: `POST`

2. **Submit Answer**

   - **Endpoint**: `/user/answer/:user_id`
   - **Method**: `POST`

3. **Get User Quiz Result**
   - **Endpoint**: `/user/result/:user_id/:quiz_id`
   - **Method**: `GET`

# How to use application

## Database connection

**create the database in your local system with the following configuration**

```
  type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'thequizapp',
```

### OR

**You can change the configuration in the file** : `\src\database\database.module.ts`

## Using clone method

1. **Clone the repo**
2. **Go to the project folder**
3. **Use following command to install dependencies**
   - `npm install`
   - **Run the project by using**: `npm run start:prod`

## Using docker

1. **Use following command to install dependencies**
   - `docker pull snktbrao/the-quiz-app:latest`
   - `docker run -d -p 3000:3000 snktbrao/the-quiz-app:latest`

## Notes :

**you can find all the api on the following swagger endpoint**

http://localhost:3000/swagger-ui


