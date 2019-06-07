FROM nginx

RUN apt-get update \
        && apt-get install --no-install-recommends --no-install-suggests -y \
                unzip \
		curl \
		ca-certificates

COPY ./ /usr/share/nginx/html

RUN cd /usr/share/nginx/html && curl -L -o jsxc.tar.gz https://github.com/jsxc/jsxc/releases/download/v4.0.0-beta.3/jsxc-4.0.0-beta.3.tar.gz

RUN cd /usr/share/nginx/html && tar -xzf jsxc.tar.gz

COPY entrypoint.sh /bin/entrypoint.sh
RUN chmod +x /bin/entrypoint.sh

ENTRYPOINT /bin/entrypoint.sh
