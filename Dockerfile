FROM nginx

RUN apt-get update \
        && apt-get install --no-install-recommends --no-install-suggests -y \
                unzip \
		curl \
		ca-certificates

COPY ./ /usr/share/nginx/html

RUN cd /usr/share/nginx/html && curl -L -o jsxc.zip https://github.com/jsxc/jsxc/releases/download/v4.0.0-beta.1/4.0.0-beta.1.zip

RUN cd /usr/share/nginx/html && unzip jsxc.zip

COPY entrypoint.sh /bin/entrypoint.sh
RUN chmod +x /bin/entrypoint.sh

ENTRYPOINT /bin/entrypoint.sh
