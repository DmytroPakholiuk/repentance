FROM node:24-bookworm AS node
FROM php:8.5-fpm-bookworm

RUN apt update --fix-missing && \
    apt install -y git zip unzip libzip-dev nano htop

#
# Install nodejs
#
COPY --from=node /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=node /usr/local/bin/node /usr/local/bin/node
RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm
RUN mkdir /var/www/.npm /var/www/.cache && chmod -R 777 /var/www/.npm /var/www/.cache

# Install PHP extensions
ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN chmod +x /usr/local/bin/install-php-extensions

RUN install-php-extensions simplexml

ARG PHP_EXT_PDO_MYSQL=false
ARG PHP_EXT_REDIS=false
ARG PHP_EXT_MBSTRING=false
ARG PHP_EXT_JSON=false
ARG PHP_EXT_CURL=false
ARG PHP_EXT_ZIP=false
ARG PHP_EXT_INTL=false
ARG PHP_EXT_XML=false
ARG PHP_EXT_BCMATH=false
ARG PHP_EXT_GD=false
ARG PHP_EXT_OPCACHE=false
ARG PHP_EXT_XDEBUG=false
ARG PHP_EXT_SOAP=true
ARG ENABLE_XHPROF=false;

RUN if [ ${PHP_EXT_PDO_MYSQL} = true ]; then \
    install-php-extensions pdo_mysql \
;fi

RUN if [ ${PHP_EXT_REDIS} = true ]; then \
    install-php-extensions redis \
;fi

RUN if [ ${PHP_EXT_MBSTRING} = true ]; then \
    install-php-extensions mbstring \
;fi

RUN if [ ${PHP_EXT_JSON} = true ]; then \
    install-php-extensions json \
;fi

RUN if [ ${PHP_EXT_CURL} = true ]; then \
    install-php-extensions curl \
;fi

RUN if [ ${PHP_EXT_ZIP} = true ]; then \
    install-php-extensions zip \
;fi

RUN if [ ${PHP_EXT_INTL} = true ]; then \
    install-php-extensions intl \
;fi

RUN if [ ${PHP_EXT_XML} = true ]; then \
    install-php-extensions xml \
;fi

RUN if [ ${PHP_EXT_BCMATH} = true ]; then \
    install-php-extensions bcmath \
;fi

RUN if [ ${PHP_EXT_GD} = true ]; then \
    install-php-extensions gd \
;fi

RUN if [ ${PHP_EXT_OPCACHE} = true ]; then \
    install-php-extensions opcache \
;fi

RUN if [ ${PHP_EXT_XDEBUG} = true ]; then \
    install-php-extensions xdebug \
;fi

RUN if [ ${PHP_EXT_SOAP} = true ]; then \
    install-php-extensions soap \
;fi

RUN if [ ${ENABLE_XHPROF} = true ]; then \
    install-php-extensions xhprof ; \
    apt update && apt install -y graphviz \
;fi

COPY php.ini /usr/local/etc/php/conf.d
COPY ./opcache.ini /usr/local/etc/php/conf.d
COPY ./xdebug.ini /usr/local/etc/php/conf.d
COPY xhprof.ini /usr/local/etc/php/conf.d

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install nano editor, make
RUN apt update && apt install -y nano make


# Install cron
RUN apt update && apt install -y cron
### copy temp cron config
COPY cron/example /tmp/cron_example
### apply system cron job
RUN cat /tmp/cron_example >> /etc/crontab
RUN rm /tmp/cron_example


# Install supervisor
RUN apt update && apt install -y supervisor
COPY supervisor/example.conf /etc/supervisor/conf.d/


# Install logrotate
RUN apt update && apt install -y logrotate
COPY logrotate/example /etc/logrotate.d/
### change permissions
RUN chmod 644 /etc/logrotate.d/example

# Map local user to docker
ARG UID
ARG GID
RUN usermod -u ${UID} www-data && \
    groupmod -g ${GID} www-data

COPY ./docker-entrypoint /usr/local/bin/docker-entrypoint
ENTRYPOINT ["/usr/local/bin/docker-entrypoint"]

WORKDIR /usr/src/app
