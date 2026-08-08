# Repentance API docker environment

**NOTE:** this is a default basic docker environment with the minimum services needed for development. \
Many services will be configured in the future (cron, supervisor, logrotate) when we get to them during the development process.

## Contents

<!-- TOC -->
* [Repentance API docker environment](#linda-seeds-api-docker-environment)
  * [Contents](#contents)
  * [Services](#services)
  * [Usage](#usage)
  * [Advanced Usage](#advanced-usage)
    * [Reload nginx after config change (without container restarting)](#reload-nginx-after-config-change-without-container-restarting)
    * [XHProf (profiling)](#xhprof-profiling)
    * [Cron](#cron)
    * [Supervisor](#supervisor)
    * [Logrotate](#logrotate)
<!-- TOC -->

## Services

| Service       | Description                                                                                                                                                     |
|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `php-fpm`     |                                                                                                                                                                 |
| `nginx`       | Opened port `8080` for the API. Opened `8081` port for XHprof.                                                                                                  |
| `mailpit`     | Opened port `8025` for Mailpit UI. It is secured with Basic Authentication, using credentials defined by `MP_UI_USER` and `MP_UI_PASSWORD` in the `.env` file.  |
| `mysql`       | Opened port `33066`. Mysql has two databases by default - `linda_seeds` for normal environment and `linda_seeds_test` for testing.                              |


**NOTE: in your laravel configuration you should use docker container/service name as the hosts, for example:**

```dotenv
# .env laravel confgiuration

# redis service
REDIS_HOST=redis

# database service
DB_HOST=mysql

# mail service
MAIL_HOST=mailpit
```


## Usage

2. Create `.env` from `.env.example`
    ```shell
   cp .env.example .env
    ```

3. Change configuration in `.env` depending on your needs

4. Create directory `mysql/data` and change owner to `1001`.
   This directory will keep database data, see documentation to get more details: https://github.com/bitnami/containers/tree/main/bitnami/mysql#persisting-your-database
   ```shell
   mkdir mysql/data && chown -R 1001:1001 mysql/data
   ```

5. Build images
   ```shell
   make build
   ```

6. Up containers
   ```shell
   make up
   ```

## Advanced Usage

### Reload nginx after config change (without container restarting)

```shell
make nginx/reload
```

### XHProf (profiling)

XHProf is a light-weight PHP profiler.

XHProf is enabled only in _development_ containers (`docker-compose.develoment.yml`) and available on the [localhost:8081](http://localhost:8081)

Profiling results are saved in the `xhprof/output` folder.

**Xhprof configuration:**

1. Enable profiler in the `.env`:
    ```dotenv
    ENABLE_XHPROF=true
    ```

2. Rebuild and restart containers
    ```shell
    make build && make up
    ```

3. Profile your application:

   ```php
   // enable profiler
   xhprof_enable(XHPROF_FLAGS_CPU + XHPROF_FLAGS_MEMORY);
   
   /**
   * some code you want to profile 
   */
   $users = User::all();
   $users->map(...);
   
   
   // disable profiler
   $xhprof_data = xhprof_disable();
   
   // save results
   require_once '/var/xhprof/xhprof_lib/utils/xhprof_lib.php';
   require_once '/var/xhprof/xhprof_lib/utils/xhprof_runs.php';
   
   $xhprof_runs = new \XHProfRuns_Default();
   $run_id = $xhprof_runs->save_run($xhprof_data, "linda-seeds");
   ```

4. Open [localhost:8081](http://localhost:8081) and view results


### Cron

See example configuration in [php-fpm/cron/example](./php-fpm/cron/example)


### Supervisor

See example configuration in [php-fpm/supervisor/example.conf](./php-fpm/supervisor/example.conf)

### Logrotate

**NOTE:** logrotate runs only by cron, so you should have installed cron in your container. Logrotate automatically adds cron configuration.

**NOTE:** make sure that logrotate runs once per day. It's mean that you should have running docker container to perform automatically logrotate.

See example configuration in [php-fpm/logrotate/example](./php-fpm/logrotate/example)
