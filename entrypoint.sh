#!/bin/sh

sed -i -e "s#{{HOST}}#${XMPP_HOST}#1" js/maestro-jsxc.js
sed -i -e "s#{{DOMAIN}}#${XMPP_DOMAIN}#1" js/maestro-jsxc.js

exec "$@"