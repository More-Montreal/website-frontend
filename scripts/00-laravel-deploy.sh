#!/usr/bin/env bash

reset_perms() {
    chmod -R 775 $PWD
    chown -R nginx:nginx $PWD
    chown -R nginx.nginx $PWD/storage
    chown -R nginx.nginx $PWD/content
    chown -R nginx.nginx $PWD/bootstrap/cache
}

reset_perms
composer install
cp /etc/secrets/.env .env
cp /etc/secrets/construisonsmontreal@gmail.com.yaml users/construisonsmontreal@gmail.com.yaml
php artisan cache:clear
php artisan config:cache
php artisan route:cache
php artisan statamic:stache:warm
php artisan statamic:static:clear
php artisan statamic:static:warm
php artisan statamic:assets:generate-presets
reset_perms