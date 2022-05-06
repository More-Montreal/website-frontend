# Construisons MTL/More MTL Website

This is the source code for the construisonsmtl.ca / moremtl.ca website.

Run the project with Docker by running the following command locally:
```sh
cat .env.example > .env
# Will install the composer dependencies
sh ./install.sh
# Runs docker-compose and a webserver on localhost:80
./vendor/bin/sail up
# Generate the application key
./vendor/bin/sail artisan key:generate

# For more documentation on Laravel and Laravel Sail visit: https://laravel.com/docs/9.x/sail
```

You can also run the project without Docker with a LAMP setup (the vhost needs to point to the public folder):
```sh
cat .env.example > .env
composer install
php artisan key:generate
```