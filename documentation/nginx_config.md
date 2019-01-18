    server {
        #listen      80;
        listen      443 ssl default_server http2;
        listen [::]:443 ssl default_server http2 ipv6only=on;

        server_name             vm-2d05.inf.h-brs.de;

        auth_basic              "HTTP authentication";
        auth_basic_user_file    /opt/.htpasswd;
        
        #access_log             /var/log/nginx/access.log main;
        #error_log              /var/log/nginx/error.log;

        ssl_certificate         /etc/letsencrypt/live/vm-2d05.inf.h-brs.de/fullchain.pem;
        ssl_certificate_key     /etc/letsencrypt/live/vm-2d05.inf.h-brs.de/privkey.pem;
        ssl_trusted_certificate /etc/letsencrypt/live/vm-2d05.inf.h-brs.de/chain.pem;

        location / {
            proxy_set_header    Host                $host;
            proxy_set_header    X-Real-IP           $remote_addr;
            proxy_set_header    X-Forwarded-For     $proxy_add_x_forwarded_for;
            proxy_set_header    X-Forwarded-Proto   $scheme;
            proxy_set_header    Upgrade             $http_upgrade;
            proxy_set_header    Connection          'upgrade';

            proxy_cache_bypass  $http_upgrade
            
            proxy_pass          http://172.22.0.30:3000;
        }

        location /geth1 {

            if ($request_method = OPTIONS) {
                return 204;
            }
            
            add_header          Access-Control-Allow-Origin  "$http_origin";
            add_header          Access-Control-Allow-Headers "Authorization, Content-Type";
            add_header          Access-Control-Allow-Methods "DELETE, GET, OPTIONS, POST, PUT, UPDATE";

            # to avoid double origin value what leads to an CORS error in the browser
            proxy_hide_header   Access-Control-Allow-Origin;

            proxy_set_header    Host                $host;
            proxy_set_header    X-Real-IP           $remote_addr;
            proxy_set_header    X-Forwarded-For     $proxy_add_x_forwarded_for;
            proxy_set_header    X-Forwarded-Proto   $scheme;

            proxy_pass          http://172.22.0.10:8545;
        }
    }
