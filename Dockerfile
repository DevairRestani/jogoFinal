# Usa a imagem oficial do PHP com Apache
FROM php:8.1-apache

# Instala extensões PHP necessárias
RUN docker-php-ext-install pdo pdo_mysql mysqli

# Habilita mod_rewrite do Apache
RUN a2enmod rewrite

# Define o diretório de trabalho
WORKDIR /var/www/html

# Copia a configuração do Apache
COPY apache-config.conf /etc/apache2/sites-available/000-default.conf

# Copia os arquivos do projeto para o container
COPY . /var/www/html/

# Define permissões corretas
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Expõe a porta 80
EXPOSE 80
