## Laravel, Reactjs, Inertia fileupload app

#### Must have applications on your PC

  1. PHP 8.1.11
  2. MySQL 8.0.26
  3. [Git](https://git-scm.com/downloads)
     

### Built With

 1. [Laravel](https://laravel.com/)
 2. [MySQL](https://www.mysql.com/)

### Libraries
 1. Axios 
 2. React-bootstrap
 3. React-dropzone
 4. React 18.3.1
 5. inertiajs/inertia-react
 6. laravel-vite-plugin

#### Installation
  

  ```sh
  git clone https://github.com/KadylBakyt/laravel-react-bootstrap-fileupload-app.git
  ```

  ```sh
  cd laravel-react-bootstrap-fileupload-app
  ```

  ```sh
  composer install
  ```

  ```sh
  npm install
  ```
  
 ```sh
  cp .env.example .env
  ```

## edit `.env` file: 
> `DB_CONNECTION=mysql`

> `DB_HOST=localhost`

> `DB_PORT=3306`

> `DB_DATABASE=file_upload_test`

> `DB_USERNAME=kadyl`

> `DB_PASSWORD=QWERTY!23456`


  ```sh
  php artisan migrate
  ```

  ```sh
  php artisan storage:link
  ```
 
  ```sh
  php artisan cache:clear
  ```

  ```sh
  php artisan config:clear
  ```

  ```sh
  npm run dev
  ```

  ```sh
  php artisan serve
  ```


#### Laravel main page

> Open the link: [http://localhost:8000](http://localhost:8000)


## Screens 
![image](https://github.com/user-attachments/assets/8ef7557f-8097-4906-b62d-16841d9d1f16)

### add & upload new file page
![image](https://github.com/user-attachments/assets/a39e4939-d00e-46d1-9d08-1ee852e77e0b)

### after added & uploaded new file redirected to main list
![image](https://github.com/user-attachments/assets/c4ad15c7-c8ee-4d76-b9f3-62f7643f9fc6)

### delete file
![image](https://github.com/user-attachments/assets/ff4a8786-913a-4bb8-bfe9-c1a0cc4881c2)

### after delete file redirected to main list
![image](https://github.com/user-attachments/assets/97a51fab-a91b-4e73-a667-87a0a8c692b3)








