FROM php:8.1

#RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN apt-get update -y && apt-get install -y openssl  zip unzip git libonig-dev

ENV COMPOSER_ALLOW_SUPERUSER 1 

COPY --from=composer:2.5.5 /usr/bin/composer usr/local/bin/composer
COPY --from=composer:2.5.5 /usr/bin/composer usr/bin/composer
RUN docker-php-ext-install pdo mbstring pdo_mysql

WORKDIR /app
COPY . /app

 
RUN composer --version && php -v

RUN composer install


EXPOSE 8181

CMD php artisan serve --host 0.0.0.0 --port 8181
# 
